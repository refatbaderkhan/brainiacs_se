<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseMaterial;
use App\Models\Assignment;
use App\Models\Quiz;
use App\Models\Grade;
use App\Models\User;
use App\Models\StudentEnrollment;
use App\Models\Course;
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

}
