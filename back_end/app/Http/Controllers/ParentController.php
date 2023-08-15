<?php
namespace App\Http\Controllers;

use App\Events\Message_parent;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentPerformance;
use App\Models\StudentCourseGrade;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\Grade;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;
use App\Models\ScheduledMeeting;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Mail\MeetingScheduled;
use Illuminate\Support\Facades\Mail;

class ParentController extends Controller
{

    public function getParentChildren(Request $request)
    {
        $parent = $request->user();

        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }

        $children = $parent->children->pluck('name', 'id');

        return response()->json([
            'success' => true,
            'data' => $children,
        ]);
    }





    public function getChildInformation(Request $request, $childId)
    {
        $parent = $request->user();

        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }

        $child = $parent->children->where('id', $childId)->first();

        if (!$child) {
            return response()->json(['error' => 'Child not found'], 404);
        }

        // Filter enrollments, grades, and other data related to the child
        $enrollments = StudentEnrollment::where('user_id', $childId)->get();
        $courseIds = $enrollments->pluck('course_id');

        $coursesProgress = [];
        foreach ($courseIds as $courseId) {
            $course = Course::with(['assignments', 'quizzes'])->find($courseId);

            $grades = Grade::whereIn('assignment_id', $course->assignments->pluck('id'))
                ->where('user_id', $childId)
                ->get();

            $coursesProgress[] = [
                'course' => $course,
                'grades' => $grades,
            ];
        }

        // Calculate performance for the child
        $enrolledCourseCount = $enrollments->count();
        $completedCourseCount = StudentCourseGrade::where('student_id', $childId)->count();

        $courseGrades = StudentCourseGrade::where('student_id', $childId)->pluck('final_grade');
        $averageGrade = $courseGrades->avg();

        $studentPerformance = [
            'enrolled_courses' => $enrolledCourseCount,
            'completed_courses' => $completedCourseCount,
            'average_grade' => $averageGrade,
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'student' => $child,
                'courses_progress' => $coursesProgress,
                'student_performance' => $studentPerformance,
            ],
        ]);
    }


    public function getStudentAttendance(Request $request, $childId)
    {
        $parent = $request->user();

        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }

        $student = User::find($childId);

        if (!$student || $student->role !== "3") {
            return response()->json(['error' => 'Student not found'], 404);
        }

        $attendanceInfo = [];


        $enrollments = StudentEnrollment::where('user_id', $childId)->pluck('course_id');

        foreach ($enrollments as $courseId) {
            $course = Course::find($courseId);

            $attendance = Attendance::where([
                'user_id' => $childId,
                'course_id' => $courseId,
            ])->first();

            if ($attendance) {
                $attendanceInfo[] = [
                    'course' => $course->title,
                    'attendance' => $attendance->status,
                    'date' => $attendance->date,
                ];
            }
        }

        return response()->json([
            'data' => $attendanceInfo,
        ]);
    }



    public function getTeacherInformation(Request $request, $teacherId)
    {

        $parent = $request->user();
        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }


        $teacher = User::find($teacherId);

        if (!$teacher || $teacher->role !== "2") {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $teacher,
        ]);
    }





    public function message_parent(Request $request, $teacherId)
    {

        $parent = $request->user();


        $messageContent = $request->input('message');

        // Create and broadcast the message event
        event(new Message_parent($parent->name, $teacherId, $messageContent));


        $message = new Message();
        $message->sender_id = $parent->id;
        $message->receiver_id = $teacherId;
        $message->message_content = $messageContent;
        $message->save();

        return response()->json(['message' => 'Message sent and saved successfully']);
    }



    public function get_messages(Request $request, $teacherId)
    {
        $parent = $request->user();

        $sentMessages = $parent->messagesSent()->where('receiver_id', $teacherId)->get();
        $receivedMessages = $parent->messagesReceived()->where('sender_id', $teacherId)->get();

        $messages = $sentMessages->concat($receivedMessages)->sortBy('created_at');

        $formattedMessages = $messages->map(function ($message) use ($parent) {
            $senderName = $message->sender_id === $parent->id ? $parent->name : User::find($message->sender_id)->name;
            $receiverName = $message->receiver_id === $parent->id ? $parent->name : User::find($message->receiver_id)->name;

            return [
                'id' => $message->id,
                'sender_name' => $senderName,
                'receiver_name' => $receiverName,
                'message_content' => $message->message_content,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
            ];
        });

        return response()->json(['data' => $formattedMessages]);
    }


    public function scheduleMeeting(Request $request, $teacherId)
    {

        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        $existingMeeting = ScheduledMeeting::where('teacher_id', $teacherId)
            ->where('selected_date', $request->date)
            ->where('selected_time', $request->time)
            ->first();

        if ($existingMeeting) {
            return response()->json(['message' => 'Meeting slot is already booked'], 400);
        }

        $meeting = new ScheduledMeeting();
        $meeting->parent_id = Auth::id();
        $meeting->teacher_id = $teacherId;
        $meeting->selected_date = $request->date;
        $meeting->selected_time = $request->time;
        $meeting->save();

        $parentEmail = Auth::user()->email;
        $teacher = User::findOrFail($teacherId);
        $teacherEmail = $teacher->email;

        $user = Auth::user(); // Fetch the authenticated user
        Mail::to($parentEmail)->send(new MeetingScheduled($meeting, 'parent', $teacher, $user));
        Mail::to($teacherEmail)->send(new MeetingScheduled($meeting, 'teacher', $teacher, $user));


        return response()->json([
            'message' => 'Meeting scheduled successfully',
            'meeting' => $meeting
        ], 201);
    }



    public function getUpcomingItems()
    {
        // Get assignments, quizzes, and events due within the next 24 hours
        $now = now();
        $upcomingItems = [];

        $assignments = Assignment::where('due_date', '<=', $now->addDay())
            ->get();

        $quizzes = Quiz::where('due_date', '<=', $now->addDay())
            ->get();

        $upcomingItems = array_merge($assignments, $quizzes);

        return response()->json(['upcoming_items' => $upcomingItems], 200);
    }



}