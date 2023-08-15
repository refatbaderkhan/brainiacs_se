<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AdminController extends Controller
{

  public function createUser(Request $request)
  {
      $request->validate([
          'name' => 'required',
          'email' => 'required|email|unique:users,email',
          'password' => 'required|min:6',
          'role' => 'required|in:teacher,student,parent', // Only accept these roles
      ]);
  
      $roleMapping = [
          'teacher' => 2,
          'student' => 3,
          'parent' => 4,
      ];
  
      $user = new User();
      $user->role = $roleMapping[$request->role]; // Set the role using the mapping
  
      $user->name = $request->name;
      $user->email = $request->email;
      $user->password = Hash::make($request->password); // Hash the password
  
      $user->save();
  
      return response()->json([
          'message' => "User created with role: " . $request->role,
          'user' => $user,
      ]);
  }

  
  public function getUsers()
  {
      $rolesToRetrieve = [2, 3, 4]; // Roles 2, 3, and 4
      $roleMapping = [
          1 => 'admin',
          2 => 'teacher',
          3 => 'student',
          4 => 'parent',
      ];

      $users = User::whereIn('role', $rolesToRetrieve)->get();

      $formattedUsers = $users->map(function ($user) use ($roleMapping) {
          $role = $roleMapping[$user->role];
          return [
              'id' => $user->id,
              'name' => $user->name,
              'email' => $user->email,
              'role' => $role,
          ];
      });

      return response()->json([
          'users' => $formattedUsers,
      ]);
  }

  public function updateUser(Request $request, $id)
  {
      $request->validate([
          'name' => 'required',
          'email' => 'required|email|unique:users,email,' . $id,
          'role' => 'required',
      ]);

      $roleMapping = [
          1 => 'admin',
          2 => 'teacher',
          3 => 'student',
          4 => 'parent',
      ];

      $user = User::find($id);
      if (!$user) {
          return response()->json([
              'message' => 'User not found',
          ], 404);
      }

      $user->name = $request->name;
      $user->email = $request->email;
      $user->role = $request->role;
      $user->save();

      $role = $roleMapping[$request->role];

      return response()->json([
          'message' => "User updated: $role",
          'user' => $user,
      ]);
  }

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
