<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentPerformance;
class ParentController extends Controller
{
    public function getStudentsPerformanceByParentId(Request $request)
    {
        $parent = $request->user();

        if ($parent->role !== "4") {
            return response()->json(['error' => 'Parent not found'], 404);
        }
        $studentIds=$parent->children->pluck('id');
        die($studentsPerformance = StudentPerformance::find($studentIds));
       
    }
}

