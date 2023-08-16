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

    public function getTeacherPerformance()
    {

        $teacherPerformance = TeacherPerformance::all();

        return response()->json([
            "performance"=>$teacherPerformance
        ]);
    }


    public function getStudentPerformance()
    {

        $studentPerformance = StudentPerformance::all();

        return response()->json([
            "performance"=>$studentPerformance
        ]);

    }
}
