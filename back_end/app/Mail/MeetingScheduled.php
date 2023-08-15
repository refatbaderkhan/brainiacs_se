<?php

namespace App\Mail;

use App\Models\ScheduledMeeting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class MeetingScheduled extends Mailable
{
    use Queueable, SerializesModels;

    public $meeting;
    public $recipientType;
    public $user;

    public function __construct($meeting, $recipientType, $teacher, $user)
    {
        $this->meeting = $meeting;
        $this->recipientType = $recipientType;
        $this->teacher = $teacher;
        $this->user = $user;
    }

    public function build()
    {
        return $this->view('emails.meeting_scheduled.' . $this->recipientType)
            ->with([
                'meeting' => $this->meeting,
                'teacher' => $this->teacher,
                'user' => $this->user,
            ]);
    }
}