<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminCourseController extends Controller
{
    public function createCourse(Request $request)
    {
     
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'enrollment_limit' => 'required|integer|min:0',
            'teacher_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('role', 2);
                }),
            ],
        ]);

        $course =new Course();

        $course->title = $request->title;
        $course->description = $request->description;
        $course->enrollment_limit = $request->enrollment_limit;
        $course->teacher_id = $request->teacher_id;

        $course->save();

        return response()->json([
            "message"=>"course created successfully",
            "updatedCourseInfo"=>$course
        ]);

    }

    public function editCourse(Request $request, $id)
    {
        $course = Course::find($id);

        $course->update($request->all());

        return response()->json([
            "message"=>"course updated successfully",
            "updatedCourseInfo"=>$course
        ]);
    }

    public function destroyCourse($id)
    {
        $course = Course::find($id);

        $course->delete();

        return response()->json([
            'message' => "Course Deleted"
        ]);
    }
    
}
