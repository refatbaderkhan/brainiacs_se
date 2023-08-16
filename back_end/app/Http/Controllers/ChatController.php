<?php

namespace App\Http\Controllers;

use App\Events\RoomsAttendance;
use App\Events\UserMessaging;
use App\Events\RoomsMessaging;
use Illuminate\Http\Request;
use Pusher\Pusher;
use App\Models\Attendance;
use App\Models\Message;
class ChatController extends Controller
{
    public function message(Request $request)
    {
        $message = new Message();
        $message->sender_id = $request->input('senderId');
        $message->receiver_id = $request->input('receiverId');
        $message->message_content = $request->input('message');
        $message->save();
        event(new UserMessaging($request->input('message'), $request->input('username'), $request->input('receiverId'), $request->input('senderId')));
        return [];
    }
    public function roomMessage(Request $request)
    {
        error_log($request->input('roomId'));
        event(new RoomsMessaging($request->input('message'), $request->input('username'), $request->input('roomId')));
        return [];
    }
    public function roomAttendance(Request $request)
    {
       
        $request->validate([
            'user_id' => 'required|integer',
            'attendanceCount' => 'required|integer', 
            'username' => 'required|string',
            'roomId' => 'required|exists:courses,id', 
        ]);
    
  
        Attendance::create([
            'user_id' => $request->input('user_id'), 
            'course_id' => $request->input('roomId'),
            'date' => now(), 
            'status' => 'present', 
        ]);
    
        event(new RoomsAttendance($request->input('attendanceCount'), $request->input('username'), $request->input('roomId') , $request->input('user_id')));
        
        return [];
    }

}