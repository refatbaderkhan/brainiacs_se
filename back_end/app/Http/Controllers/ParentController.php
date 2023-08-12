<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentPerformance;
use App\Models\StudentCourseGrade;
use App\Models\Attendance;
use App\Models\Message;
use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\Grade;
class ParentController extends Controller
{
    
    public function getStudentsList(Request $request)
    {
        $parent = $request->user();
        
        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }
    
        $studentList = $parent->children->pluck('name', 'id')->toArray();
        
        return response()->json(['data' => $studentList]);
    }

    public function getStudentPerformance(Request $request, $studentId)
    {
        $parent = $request->user();
        
        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }
    
        $enrollments = StudentEnrollment::where('user_id', $studentId)->get();
        $courseIds = $enrollments->pluck('course_id');
        $coursesProgress = [];
        foreach ($courseIds as $courseId) {
            $course = Course::with(['assignments', 'quizzes'])->find($courseId);
           
            $grades = Grade::whereIn('assignment_id', $course->assignments->pluck('id'))->where('user_id', $studentId)->get();
            $coursesProgress[] = [
                'course' => $course,
                'grades' => $grades,
            ];
        }
        
        $courseGrades = StudentCourseGrade::where('student_id', $studentId)->pluck('final_grade');
        $enrolledCourseCount = $enrollments->count();
        $completedCourseCount = StudentCourseGrade::where('student_id', $studentId)->count();
        $averageGrade = $courseGrades->avg();
    
        $studentPerformance = [
            'enrolled_courses' => $enrolledCourseCount,
            'completed_courses' => $completedCourseCount,
            'average_grade' => $averageGrade,
        ];
        
        return response()->json(['data' => $coursesProgress, 'performance' => $studentPerformance]);
    }
    

        public function getStudentAttendance(Request $request)
        {
            $parent = $request->user();

            if ($parent->role !== "4") {
                return response()->json(['error' => 'Parent not found']);
            }
            $studentIds=$parent->children->pluck('id');
            foreach($studentIds as $studentId){
                $student=User::where('id',$studentId)->pluck('name');
                $studentAttendance = Attendance::where('user_id', $studentId)->get();
                
                $studentAttendanceInfo[$studentId]=[
                    'name'=>$student,
                    'attendance'=>$studentAttendance,
                ];
            }
            return response()->json(['data'=>$studentAttendanceInfo]);
        }

        public function sendTeacherMessage(Request $request)
        {
            $parent=$request->user();
            if ($parent->role !== "4") {
                return response()->json(['error' => 'Parent not found']);
            }

            $request->validate([
                'receiver_id'=>'required|exists:users,id',
                'message_content'=>'required|string',
            ]);
            $teacherId=$request->input('receiver_id');
            $messageContent=$request->input('message_content');

            $message = new Message();
            $message->sender_id = $parent->id;
            $message->receiver_id = $teacherId;
            $message->message_content = $messageContent;
            $message->save();
            return response()->json(['message'=>'message sent successfully']);
        }

    }


