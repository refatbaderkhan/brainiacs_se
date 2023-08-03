<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\CourseMaterial;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function browseCourses()
    {
        $courses = Course::all();
        return response()->json(['courses' => $courses]);
    }
    public function enrollInCourse($courseId)
    {

        if (auth()->user()->role != "3") {
            return response()->json(['message' => 'You are not authorized to perform this action.'], 403);
        }

        $course = Course::findOrFail($courseId);


        $studentEnrollment = StudentEnrollment::create([
            'user_id' => auth()->user()->id,
            'course_id' => $course->id,
            'enrolled_at' => now(),
        ]);

        // response indicating successful enrollment
        return response()->json(['message' => 'Successfully enrolled in the course: ' . $course->title]);
    }




    public function viewCourseMaterials($courseId)
    {
        $course = Course::findOrFail($courseId);

        $enrollment = StudentEnrollment::where('user_id', auth()->user()->id)->where('course_id', $course->id)->first();

        if (!$enrollment) {
            return response()->json(['message' => 'You are not enrolled in this course.']);
        }


        $materials = Course::findOrFail($course->id)->courseMaterials;

        if ($materials->isEmpty()) {
            return response()->json(['message' => 'No course materials found for this course.']);
        }

        // Send a JSON response containing the course materials data
        return response()->json(['course_materials' => $materials]);
    }



}