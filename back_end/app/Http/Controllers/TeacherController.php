<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseMaterial;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\Grade;



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

  public function createGrade(Request $request)
  {
      $request->validate([
          'course_id' => 'required|exists:courses,id',
          'user_id' => 'required|exists:users,id',
          'assignment_id' => 'required|exists:assignments,id',
          'grade' => 'required|numeric|min:0|max:100',
          'feedback' => 'nullable|string',
      ]);

      $Grade = new Grade([
          'user_id' => $request->user_id,
          'course_id' => $request->course_id,
          'assignment_id' => $request->assignment_id,
          'grade' => $request->grade,
          'feedback' => $request->feedback,
      ]);

      $Grade->save();

      return response()->json([
          'status' => 'Success',
          'message' => 'Grade created successfully',
          'data' => $Grade,
      ]);
  }
}
