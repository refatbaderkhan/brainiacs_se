<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherPerformance extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'course_id', 'student_count', 'average_grade', 'completion_rate'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    
}