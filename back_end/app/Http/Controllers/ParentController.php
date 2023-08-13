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

        $studentAttendanceInfo = [];

        $student = User::find($childId);

        if (!$student || $student->role !== "3") {
            return response()->json(['error' => 'Child not found'], 404);
        }

        $enrollments = StudentEnrollment::where('user_id', $childId)->get();
        $courseIds = $enrollments->pluck('course_id');

        foreach ($courseIds as $courseId) {
            $course = Course::find($courseId);
            $courseName = $course->title;

            $attendanceStatus = Attendance::where('user_id', $childId)
                ->where('course_id', $courseId)
                ->value('status');

            $studentAttendanceInfo[] = [
                'course' => $courseName,
                'attendance' => $attendanceStatus,
            ];
        }

        return response()->json(['data' => $studentAttendanceInfo]);
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

}