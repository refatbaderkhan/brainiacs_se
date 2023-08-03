<?php

namespace App\Http\Controllers;

use App\Events\UserMessaging;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request)
    {
        event(new UserMessaging($request->input('message'), $request->input('username') ));
        return [];
    }
}
