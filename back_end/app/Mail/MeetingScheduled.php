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
    public $user; // Add this line

    public function __construct($meeting, $recipientType, $teacher, $user) // Add $user parameter here
    {
        $this->meeting = $meeting;
        $this->recipientType = $recipientType;
        $this->teacher = $teacher;
        $this->user = $user; // Assign the $user parameter to the property
    }

    public function build()
    {
        return $this->view('emails.meeting_scheduled.' . $this->recipientType)
            ->with([
                'meeting' => $this->meeting,
                'teacher' => $this->teacher,
                'user' => $this->user, // Pass the user variable to the view
            ]);
    }
}