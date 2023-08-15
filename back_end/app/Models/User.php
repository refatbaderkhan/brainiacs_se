<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    
    public function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class, 'user_id', 'id');
    }
    
    public function performance()
    {
        return $this->hasOne(StudentPerformance::class, 'user_id', 'id');
    }
    
    public function children()
    {
        return $this->belongsToMany(User::class, 'parent_student_relations', 'parent_id', 'student_id');
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }


    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function grades()
    {
        return $this->hasMany(Grade::class, 'user_id');
    }
    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }
}
