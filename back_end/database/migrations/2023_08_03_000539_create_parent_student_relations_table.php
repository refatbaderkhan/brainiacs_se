<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParentStudentRelationsTable extends Migration
{
    public function up()
    {
        Schema::create('parent_student_relations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('users');
            $table->foreign('student_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('parent_student_relations');
    }
}
