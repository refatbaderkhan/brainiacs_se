<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = ['user_id', 'course_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public static function getAnnouncementsForCourse($courseId)
    {
        return self::where('course_id', $courseId)->get();
    }
}
