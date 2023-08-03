<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Auth;

//Authenticated APIS
Route::group(["middleware" => "auth:api"], function(){
    $user = Auth::user(); 
    
    Route::group(["middleware" => "auth.admin"], function(){
        Route::get("trust_issues", [AuthController::class, "issues"]);
    });

    Route::group(["prefix" => "user"], function(){
        Route::get("profile", [AuthController::class, "profile"]);
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("messages" , [ChatController::class , "message"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });



});

//Unauthenticated APIS
Route::group(["prefix" => "guest"], function(){
    //catch api for unauthorized users
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    //login & signup 
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});


