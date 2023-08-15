<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignmentUser extends Model
{
    protected $table = 'assignment_user';

    protected $fillable = [
        'student_id', 'assignment_id', 'content_url',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class, 'assignment_id');
    }
}
