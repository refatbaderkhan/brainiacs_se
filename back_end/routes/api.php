<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\StudentController;

//Authenticated APIS
Route::group(["middleware" => "auth:api"], function () {
    $user = Auth::user();

    Route::group(["middleware" => "auth.admin"], function () {
        Route::get("trust_issues", [AuthController::class, "issues"]);
    });

    Route::group(["prefix" => "user"], function () {
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });

    //to fetch student courses 
    Route::get("courses", [StudentController::class, "browseCourses"]);

    // enroll in a course
    Route::post('enroll/{courseId}', [StudentController::class, 'enrollInCourse']);

    // view course materials
    Route::get('course-materials/{courseId}', [StudentController::class, 'viewCourseMaterials']);


    //student progress
    Route::group(["middleware" => "auth:api"], function () {


        Route::get("completed-assignments", [StudentController::class, "getCompletedAssignments"]);
        Route::get("upcoming-assignments", [StudentController::class, "getUpcomingAssignments"]);
        Route::get("grades", [StudentController::class, "getGrades"]);
        Route::get("overall-progress", [StudentController::class, "getOverallProgress"]);
    });
});

//Unauthenticated APIS
Route::group(["prefix" => "guest"], function () {
    //catch api for unauthorized users
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    //login & signup 
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});