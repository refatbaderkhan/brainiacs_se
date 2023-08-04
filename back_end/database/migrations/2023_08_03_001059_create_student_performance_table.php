<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentPerformanceTable extends Migration
{
    public function up()
    {
        Schema::create('student_performance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->float('average_grade');
            $table->unsignedInteger('completed_courses');
            $table->unsignedInteger('enrolled_courses');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_performance');
    }
}