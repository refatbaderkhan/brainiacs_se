<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\Grade;
use App\Models\StudentPerformance;
use App\Models\TeacherPerformance;

class AdminAssessmentController extends Controller
{

    public function getTeacherPerformance($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found, not a teacher']);
        }

        $teacherPerformance = TeacherPerformance::where('user_id', $userId)->first();

        return response()->json([
            "user"=>$user,
            "performance"=>$teacherPerformance
        ]);
    }


    public function getStudentPerformance($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found, not a student']);
        }

        $studentPerformance = StudentPerformance::where('user_id', $userId)->first();

        return response()->json([
            "user"=>$user,
            "performance"=>$studentPerformance
        ]);

    }
}
