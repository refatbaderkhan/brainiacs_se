<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentPerformance;
use App\Models\StudentCourseGrade;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\Grade;
class ParentController extends Controller
{
    public function getStudentPerformance(Request $request)
    {
        $parent = $request->user();
    
        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }
    
        $studentIds = $parent->children->pluck('id');
        $enrollments = StudentEnrollment::whereIn('user_id', $studentIds)->get();
        $courseIds = $enrollments->pluck('course_id');
    
        $coursesProgress = [];
        foreach ($courseIds as $courseId) {
            $course = Course::with(['assignments', 'quizzes'])->find($courseId);
    
            $grades = Grade::whereIn('assignment_id', $course->assignments->pluck('id'))
                ->whereIn('user_id', $studentIds)
                ->get();
    
            $studentsWithGradesAndCourses = $grades->pluck('user_id');
            $studentsInformations = User::whereIn('id', $studentsWithGradesAndCourses)
                ->pluck('name','id')
                ->toArray();
    
            $coursesProgress[] = [
                'student' => $studentsInformations,
                'course' => $course,
                'grades' => $grades,
            ];
        }
        $studentPerformance = [];
        foreach ($parent->children as $child) {
            $enrolledCourseCount = $enrollments->where('user_id', $child->id)->count();
            $completedCourseCount = StudentCourseGrade::where('student_id', $child->id)->count();
            
            $courseGrades = StudentCourseGrade::where('student_id', $child->id)->pluck('final_grade');
            $averageGrade = $courseGrades->avg();
            
            $studentPerformance[$child->id] = [
                'enrolled_courses' => $enrolledCourseCount,
                'completed_courses' => $completedCourseCount,
                'average_grade' => $averageGrade,
            ];
        }    
    
        return response()->json(['data' => $coursesProgress,$studentPerformance]);
    }
    

        public function getStudentAttendance(Request $request)
        {
            $parent = $request->user();

            if ($parent->role !== "4") {
                return response()->json(['error' => 'Parent not found'], 404);
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

    }


