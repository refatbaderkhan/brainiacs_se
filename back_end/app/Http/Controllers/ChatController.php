<?php

namespace App\Http\Controllers;

use App\Events\UserMessaging;
use App\Events\RoomsMessaging;
use Illuminate\Http\Request;
use Pusher\Pusher;
class ChatController extends Controller
{
    public function message(Request $request)
{
        error_log($request->input('receiverId'));
        event(new UserMessaging($request->input('message'), $request->input('username'),$request->input('receiverId') ,$request->input('senderId')));
        return [];
    }
    public function roomMessage(Request $request)
    {
        error_log($request->input('roomId'));
        event(new RoomsMessaging($request->input('message'), $request->input('username'),$request->input('roomId') ));
        return [];
    }

}
