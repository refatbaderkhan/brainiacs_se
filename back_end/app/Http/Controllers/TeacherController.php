<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseMaterial;
use App\Models\Assignment;


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
}
