<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeacherPerformanceTable extends Migration
{
    public function up()
    {
        Schema::create('teacher_performance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedInteger('student_count');
            $table->float('average_grade');
            $table->float('completion_rate');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
        });
    }

    public function down()
    {
        Schema::dropIfExists('teacher_performance');
    }
}