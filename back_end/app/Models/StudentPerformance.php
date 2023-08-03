<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPerformance extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'average_grade', 'completed_courses', 'enrolled_courses'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}