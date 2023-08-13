<?php

use App\Http\Controllers\AdminAssessmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminCourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ParentController;


//Authenticated APIS
Route::group(["middleware" => "auth:api"], function () {
    $user = Auth::user();
    Route::get("/getAllUsers", [AuthController::class, "getAllUsers"]);

    Route::group(["middleware" => "auth.admin"], function () {
        Route::get("trust_issues", [AuthController::class, "issues"]);

        Route::post('/users/manage', [AdminController::class, 'manageUser']);
        Route::delete('/users/{id}', [AdminController::class, 'destroyUser']);

        Route::post('/courses/create', [AdminCourseController::class, 'createCourse']);
        Route::post('/courses/{id}/manage', [AdminCourseController::class, 'editCourse']);
        Route::delete('/courses/{id}', [AdminCourseController::class, 'destroyCourse']);

        Route::get('/reports/student-progress/{id}', [AdminAssessmentController::class, 'getStudentPerformance']);
        Route::get('/reports/teacher-performance/{id}', [AdminAssessmentController::class, 'getTeacherPerformance']);
    });

    Route::group(["prefix" => "user"], function () {
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("messages", [ChatController::class, "message"]);
        Route::post("roomMessage", [ChatController::class, "roomMessage"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });





});

//Unauthenticated APIS
Route::group(["prefix" => "guest"], function () {
    //catch api for unauthorized users
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);

});

Route::group(["middleware" => "auth:api"], function () {
    Route::group(["prefix" => "parent"], function () {
        Route::get('children', [ParentController::class, 'getParentChildren']);
        Route::get('child/{childId}', [ParentController::class, 'getChildInformation']);
        Route::get('student-attendance/{childId}', [ParentController::class, 'getStudentAttendance']);
        Route::get('teachers/{teacherId}', [ParentController::class, 'getTeacherInformation']);
        Route::post('message/{teacherId}', [ParentController::class, 'message_parent']);
    });
});