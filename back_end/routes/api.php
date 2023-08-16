<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminCourseController;
use App\Http\Controllers\AdminAssessmentController;


Route::group(["middleware" => "auth:api"], function () {
    $user = Auth::user();
    Route::get("/getAllUsers", [AuthController::class, "getAllUsers"]);
    Route::group(["middleware" => "auth.admin"], function () {
        Route::get("trust_issues", [AuthController::class, "issues"]);

        Route::post('/create', [AdminController::class, 'createUser']);
        Route::get('/users/get', [AdminController::class, 'getUsers']);
        Route::post('/users/{id}', [AdminController::class, 'updateUser']);
        Route::post('/users/manage', [AdminController::class, 'manageUser']);
        Route::delete('/users/{id}', [AdminController::class, 'destroyUser']);

        Route::get('/courses/get', [AdminCourseController::class, 'getCourses']);
        Route::post('/courses/create', [AdminCourseController::class, 'createCourse']);
        Route::post('/courses/{id}/manage', [AdminCourseController::class, 'editCourse']);
        Route::delete('/courses/{id}', [AdminCourseController::class, 'destroyCourse']);
        Route::post('/courses/{id}', [AdminCourseController::class, 'updateCourse']);


        Route::get('/reports/student-progress/', [AdminAssessmentController::class, 'getStudentPerformance']);
        Route::get('/reports/teacher-performance/', [AdminAssessmentController::class, 'getTeacherPerformance']);
    });


    Route::group(["middleware" => "auth.teacher"], function () {
        Route::group(["prefix" => "teacher"], function () {
            Route::get("trust_issues", [AuthController::class, "issues"]);
            Route::get("messages/{senderId}", [TeacherController::class, "getMessagesBySender"]);
            Route::get("/attendance/course/{courseId}", [TeacherController::class, "getAttendanceByCourse"]);
            Route::get("/courses/{courseId}/announcements", [TeacherController::class, "getAnnouncements"]);
            Route::post("create_material", [TeacherController::class, "createMaterial"]);
            Route::post("create_assignment", [TeacherController::class, "createAssignment"]);
            Route::post("create_quiz", [TeacherController::class, "createQuiz"]);
            Route::post("create_grade", [TeacherController::class, "updateGrade"]);
            Route::get("get_courses/{id}", [TeacherController::class, "getCourses"]);
            Route::get("get_assignmentsbyStudent/{courseid}/{student}", [TeacherController::class, "getAssignmentsbyStudnet"]);
            Route::get("get_students/{id}", [TeacherController::class, "getStudents"]);
            Route::get("get_students_reports/{id}", [TeacherController::class, "getStudentsWithReportCard"]);
            Route::get("get_assignments/{id}", [TeacherController::class, "getAssignments"]);
            Route::get("get_student_performance/{id}", [TeacherController::class, "getStudentPerformance"]);
            Route::get('get_quizzes/{courseId}', [TeacherController::class, 'getQuizzes']);
            Route::get('/courses/{courseId}/students-with-assignments', [TeacherController::class, 'getAllStudentsWithAssignmentsInfoByCourse']);
        });
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
        Route::get('messages/{teacherId}', [ParentController::class, 'get_messages']);
        Route::post('schedule-meeting/{teacherId}', [ParentController::class, 'scheduleMeeting']);
        Route::get('upcoming-items/{childId}', [ParentController::class, 'getUpcomingItems']);

    });
});

//student work
Route::group(["middleware" => "auth:api"], function () {


    //to fetch student courses 
    Route::get("courses", [StudentController::class, "browseCourses"]);

    // enroll in a course
    Route::post('enroll/{courseId}', [StudentController::class, 'enrollInCourse']);

    // view course materials
    Route::get('course-materials/{courseId}', [StudentController::class, 'viewCourseMaterials']);


    //student progress
    Route::get("completed-assignments", [StudentController::class, "getCompletedAssignments"]);
    Route::get("upcoming-assignments", [StudentController::class, "getUpcomingAssignments"]);
    Route::get("grades", [StudentController::class, "getGrades"]);
    Route::get("overall-progress", [StudentController::class, "getOverallProgress"]);


    // get all quizzes for a specific course
    Route::get("courses/{courseId}/quizzes", [StudentController::class, "getQuizzesForCourse"]);

    // get details of a specific quiz, including its questions
    Route::get("quizzes/{quizId}", [StudentController::class, "getQuizDetails"]);

    // submit answers for a quiz and get the quiz results
    Route::post("quizzes/{quizId}/submit", [StudentController::class, "submitQuizAnswers"]);
});