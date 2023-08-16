<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\StudentEnrollment;
use App\Models\CourseMaterial;
use Illuminate\Http\Request;
use App\Models\Assignment;
use App\Models\Grade;
use App\Models\Quiz;
use App\Models\Question;

class StudentController extends Controller
{


    //part a

    public function browseAvailableCourses()
    {
        $studentId = auth()->user()->id;

        $enrolledCourseIds = StudentEnrollment::where('user_id', $studentId)
            ->pluck('course_id');

        $availableCourses = Course::whereNotIn('id', $enrolledCourseIds)
            ->get();

        return response()->json(['available_courses' => $availableCourses]);
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

        // access the course materials directly from the $course object
        $materials = $course->materials;

        if ($materials->isEmpty()) {
            return response()->json(['message' => 'No course materials found for this course.']);
        }

        return response()->json(['course_materials' => $materials]);
    }
    public function browseEnrolledCourses()
    {
        $studentId = auth()->user()->id;

        $enrolledCourses = StudentEnrollment::where('user_id', $studentId)
            ->with('course') // Load the associated course details
            ->get();

        return response()->json(['enrolled_courses' => $enrolledCourses]);
    }


    //part b student work 


    public function getCompletedAssignments($courseId)
    {
        $studentId = auth()->user()->id;

        // Fetch completed assignments for the specific course
        $completedAssignments = Grade::where('user_id', $studentId)
            ->whereHas('assignment', function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            })
            ->whereNotNull('grade')
            ->with('assignment')
            ->get();

        return response()->json(['completed_assignments' => $completedAssignments]);
    }


    public function getUpcomingAssignments($courseId)
    {
        $studentId = auth()->user()->id;


        $upcomingAssignments = Assignment::where('course_id', $courseId)
            ->whereDoesntHave('grades', function ($query) use ($studentId) {

                $query->where('user_id', $studentId);
            })
            ->get();

        return response()->json(['upcoming_assignments' => $upcomingAssignments]);
    }



    public function getGrades($courseId)
    {
        $studentId = auth()->user()->id;

        // Fetch grades for the specific course
        $grades = Grade::where('user_id', $studentId)
            ->whereHas('assignment', function ($query) use ($courseId) {
                $query->where('course_id', $courseId);
            })
            ->get();

        return response()->json(['grades' => $grades]);
    }

    public function getOverallProgress()
    {
        $studentId = auth()->user()->id;
        $totalAssignments = Assignment::whereIn('course_id', function ($query) use ($studentId) {
            $query->select('course_id')
                ->from('student_enrollments')
                ->where('user_id', $studentId);
        })->count();

        if ($totalAssignments === 0) {
            // Handle the case when there are no assignments
            return response()->json(['overall_progress' => '0%']);
        }

        $completedAssignments = Grade::where('user_id', $studentId)->count();

        $progressPercentage = ($completedAssignments / $totalAssignments) * 100;

        return response()->json(['overall_progress' => $progressPercentage . '%']);
    }

    //Ppart c

    //need to pass course id
    public function getQuizzesForCourse($courseId)
    {
        $quizzes = Quiz::where('course_id', $courseId)->get();

        return response()->json(['quizzes' => $quizzes]);
    }


    //need to pass quiz id
    public function getQuizDetails($quizId)
    {
        $quiz = Quiz::with('questions')->findOrFail($quizId);

        return response()->json(['quiz' => $quiz]);
    }



    public function submitQuizAnswers(Request $request, $quizId)
    {
        $quiz = Quiz::findOrFail($quizId);

        $user = auth()->user();
        $studentId = $user->id;

        $answers = $request->input('answers');

        // Validate if all questions are attempted
        if (count($answers) !== $quiz->questions->count()) {
            return response()->json(['message' => 'Please attempt all questions.'], 400);
        }

        // Calculate quiz score
        $score = 0;
        foreach ($quiz->questions as $question) {
            $userAnswer = $answers[$question->id];
            if ($userAnswer === $question->correct_option) {
                $score++;
            }
        }


        return response()->json(['score' => $score]);
    }




}