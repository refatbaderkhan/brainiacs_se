<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseMaterial;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\Grade;
use App\Models\User;
use App\Models\Message;
use App\Models\StudentEnrollment;
use App\Models\Course;
use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\StudentPerformance;


class TeacherController extends Controller
{
    public function createMaterial(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content_url' => 'required|string',
        ]);

        $CourseMaterial = new CourseMaterial([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'content_url' => $request->content_url,
        ]);

        $CourseMaterial->save();

        return response()->json([
            'status' => 'Success',
            'message' => 'Course Material created successfully',
            'data' => $CourseMaterial,
        ]);
    }

    public function createAssignment(Request $request)
    {
        error_log($request->course_id);
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content_url' => 'required|string',
            'due_date' => 'nullable|date_format:Y-m-d H:i:s',
        ]);

        $Assignment = new Assignment([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'content_url' => $request->content_url,
            'due_date' => $request->due_date,
        ]);

        $Assignment->save();

        return response()->json([
            'status' => 'Success',
            'message' => 'Assignment created successfully',
            'data' => $Assignment,
        ]);
    }

    public function createQuiz(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content_url' => 'required|string',
        ]);

        $Quiz = new Quiz([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'content_url' => $request->content_url,
        ]);

        $Quiz->save();

        return response()->json([
            'status' => 'Success',
            'message' => 'Quiz created successfully',
            'data' => $Quiz,
        ]);
    }

    public function updateGrade(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|exists:users,id',
            'assignment_id' => 'required|exists:assignments,id',
        ]);

        $grade = Grade::where([
            'course_id' => $request->course_id,
            'user_id' => $request->user_id,
            'assignment_id' => $request->assignment_id,
        ])->first();
        if (!$grade) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Grade not found',
            ], 404);
        }

        if ($request->has('grade')) {
            $grade->grade = $request->grade;
        }

        if ($request->has('feedback')) {
            $grade->feedback = $request->feedback;
        }

        $grade->save();

        return response()->json([
            'status' => 'Success',
            'message' => 'Grade updated successfully',
            'data' => $grade,
        ]);
    }
    public function getCourses($Id)
    {
        $user = User::find($Id);

        if (!$user || $user->role != 2) {
            return response()->json(['error' => 'Teacher not found']);
        }

        $courses = $user->courses;

        return response()->json([
            'status' => 'Success',
            'message' => 'Courses retrieved successfully',
            'data' => $courses,
        ]);
    }

    public function getAssignmentsbyStudent($courseId, $studentId)
    {
        $enrollment = StudentEnrollment::where([
            'user_id' => $studentId,
            'course_id' => $courseId,
        ])->first();

        if (!$enrollment) {
            return response()->json(['error' => 'Student is not enrolled']);
        }

        $assignments = Assignment::where('course_id', $courseId)->get();

        return response()->json([
            'status' => 'Success',
            'message' => 'Assignments retrieved successfully',
            'data' => $assignments,
        ]);
    }

    public function getStudents($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found']);
        }

        $students = $course->students;

        return response()->json([
            'status' => 'Success',
            'message' => 'Students retrieved successfully',
            'data' => $students,
        ]);
    }

    public function getAssignments($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found']);
        }

        $assignments = $course->assignments;

        return response()->json([
            'status' => 'Success',
            'message' => 'Assignments retrieved successfully',
            'data' => $assignments,
        ]);
    }

    public function getStudentPerformance($id)
    {
        $student = User::find($id);

        if (!$student) {
            return response()->json(['error' => 'Student not found']);
        }

        $performance = StudentPerformance::where('user_id', $id)->first();

        if (!$performance) {
            return response()->json(['error' => 'Performance data not found for the student']);
        }

        return response()->json([
            'status' => 'Success',
            'message' => 'Student performance retrieved successfully',
            'data' => $performance,
        ]);
    }

    public function getQuizzes($courseId)
    {
        $course = Course::find($courseId);

        if (!$course) {
            return response()->json(['error' => 'Course not found']);
        }

        $quizzes = $course->quizzes;

        return response()->json([
            'status' => 'Success',
            'message' => 'Quizzes retrieved successfully',
            'data' => $quizzes,
        ]);
    }
    public function getAllStudentsWithAssignmentsInfoByCourse($courseId)
    {
        $studentsWithAssignments = Grade::with(['assignment', 'user'])
            ->whereHas('user', function ($query) use ($courseId) {
                $query->where('role', 3)
                    ->whereHas('enrollments', function ($subQuery) use ($courseId) {
                        $subQuery->where('course_id', $courseId);
                    });
            })
            ->whereHas('assignment', function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            })
            ->get();

        $studentsData = [];
        foreach ($studentsWithAssignments as $grade) {
            $user = $grade->user;
            $assignment = $grade->assignment;

            // Check if the student's data is already present in the array
            if (!isset($studentsData[$user->id])) {
                $studentsData[$user->id] = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'assignments' => [],
                ];
            }

            $submittedAt = $grade->created_at ? $grade->created_at->format('m/d/Y') : null;

            $studentsData[$user->id]['assignments'][] = [
                'assignment_id' => $assignment->id,
                'assignment_doc' => "../" . $user->name . "/assignment/" . $assignment->id,
                'submitted_at' => $submittedAt,
                'assignment_name' => $assignment->title,
                'feedback' => $grade->feedback,
                'grade' => $grade->grade,
            ];
        }

        return response()->json([
            'status' => 'Success',
            'message' => 'Students and their assignments info retrieved successfully',
            'data' => array_values($studentsData), // Convert associative array to indexed array
        ]);
    }


    public function getStudentsWithReportCard($id)
    {
        $course = Course::with('enrollments.student')->find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found']);
        }

        $studentsWithPerformance = [];
        foreach ($course->enrollments as $enrollment) {
            $student = $enrollment->student;
            $performance = StudentPerformance::where('user_id', $student->id)->first();

            if (!$performance) {
                $performance = null;
            }

            $studentsWithPerformance[] = [
                'student' => $student,
                'performance' => $performance,
            ];
        }

        return response()->json([
            'status' => 'Success',
            'message' => 'Students and their performance retrieved successfully',
            'data' => $studentsWithPerformance,
        ]);

    }

    public function getMessagesBySender($senderId)
    {
        $messages = Message::where('sender_id', $senderId)
            ->orWhere('receiver_id', $senderId)
            ->get();

        return response()->json($messages);
    }

    public function getAttendanceByCourse($courseId)
    {
        $attendanceData = Attendance::where('course_id', $courseId)
            ->where('status', 'present')
            ->with('user:id,name')
            ->get();

        $result = [];

        foreach ($attendanceData as $attendance) {
            if (!isset($result[$attendance->user->name])) {
                $result[$attendance->user->name] = [
                    'student_name' => $attendance->user->name,
                    'attendance_times' => 0,
                ];
            }

            $result[$attendance->user->name]['attendance_times']++;
        }

        return response()->json(array_values($result));
    }

    public function getAnnouncements($courseId)
    {
        $announcements = Announcement::where('course_id', $courseId)->get();

        $formattedAnnouncements = $announcements->map(function ($announcement) {
            return [
                'course_id' => $announcement->course_id,
                'title' => $announcement->title,
                'announcement' => $announcement->content,
            ];
        });

        return response()->json($formattedAnnouncements);
    }



}