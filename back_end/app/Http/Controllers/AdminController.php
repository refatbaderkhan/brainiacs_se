<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{

  
    // Display the user management page
    public function manageUser(Request $request)
    {

        $request->validate([
            'user_id' => 'required',
            'role' => 'required',
        ]);   

        $roleMapping = [
            1 => 'admin',
            2 => 'teacher',
            3 => 'student',
            4 => 'parent',
        ];
        


        $id = $request->user_id;

        $user = User::find($id);

        $user->role = $request->role;

        $user->save();
        $newrole = $roleMapping[$request->role];
        $role = $roleMapping[$request->role];
        return response()->json([
            "user"=>$user,
            'message' => "$role "."role changed to "."$newrole"
        ]);
    }

    public function destroyUser($id)
    {
        $user = User::find($id);

        $user->delete();

        $roleMapping = [
            1 => 'admin',
            2 => 'teacher',
            3 => 'student',
            4 => 'parent',
        ];

        error_log($user->role);

        $role = $roleMapping[$user->role];

        return response()->json([
            'message' => "$role "."deleted"
        ]);
    }
    
}
