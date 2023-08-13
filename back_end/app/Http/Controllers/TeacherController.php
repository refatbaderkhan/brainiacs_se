<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseMaterial;


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
          'message' => 'Course material created successfully',
          'data' => $CourseMaterial,
      ]);
  }
}
