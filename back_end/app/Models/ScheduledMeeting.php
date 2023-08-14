<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduledMeeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'teacher_id',
        'selected_date',
        'selected_time',

    ];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}