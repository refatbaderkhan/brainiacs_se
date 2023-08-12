<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentPerformance;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\Grade;
class ParentController extends Controller
{
    // public function getStudentsPerformanceByParentId(Request $request)
    // {
    //     $parent = $request->user();

    //     if ($parent->role !== "4") {
    //         return response()->json(['error' => 'Parent not found'], 404);
    //     }
    //     $studentIds=$parent->children->pluck('id');
    //     die($studentsPerformance = StudentPerformance::find($studentIds));
       
    // }

    


    public function getChildCourseProgress(Request $request)
    {
        $parent = $request->user();

        if ($parent->role !== "parent") {
            return response()->json(['error' => 'Parent not found'], 404);
        }

        $studentIds = $parent->children->pluck('id');

        // Get all courses enrolled by children
        $enrollments = StudentEnrollment::whereIn('user_id', $studentIds)->get();
        $courseIds = $enrollments->pluck('course_id');

        // Retrieve course information and grades for each course
        $coursesProgress = [];
        foreach ($courseIds as $courseId) {
            $course = Course::with(['assignments', 'quizzes'])->find($courseId);

            $grades = Grade::whereIn('assignment_id', $course->assignments->pluck('id'))
                ->whereIn('user_id', $studentIds)
                ->get();

            $quizzesTaken = $parent->children->flatMap(function ($child) use ($courseId) {
                return $child->quizzesTaken()->where('course_id', $courseId)->get();
            });

            $coursesProgress[] = [
                'course' => $course,
                'grades' => $grades,
                'quizzes_taken' => $quizzesTaken,
            ];
        }

        return response()->json(['data' => $coursesProgress]);
    }


        public function getStudentsAttendenceByParentId(Request $request)
        {
            $parent = $request->user();

            if ($parent->role !== "4") {
                return response()->json(['error' => 'Parent not found'], 404);
            }
            $studentIds=$parent->children->pluck('id');
            die($studentsAttendance = Attendance::find($studentIds));
        
        }

    }


