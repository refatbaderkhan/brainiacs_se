<?php 

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller{

    /*public function __construct(){
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }*/

    public function unauthorized(Request $request){
        return response()->json([
            'status' => 'Error',
            'message' => 'Unauthorized',
        ], 200);
    }

    public function issues(Request $request){
        return response()->json([
            'status' => 'Success',
            'message' => 'AKAL',
        ], 200);
    }

    public function profile(Request $request){
        return response()->json([
            'status' => 'Success',
            'data' => Auth::user(),
        ], 200);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
 
        if (!$token) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;
        // $user->role = $user->user_type_id == 1 ? "admin" : "user";
        
        return response()->json([
                'status' => 'Success',
                'data' => $user
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $roleMapping = [
            1 => 'admin',
            2 => 'teacher',
            3 => 'student',
            4 => 'parent',
        ];

        $user = new User; 
        $user->role =  $request->role; 
       
        $user->name = $request->name;
     
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        $token = Auth::login($user);
        $user->token = $token;
        $user->role = $roleMapping[+$request->role];
        error_log($user->role);
        return response()->json([
            'status' => 'Success',
            'data' => $user
        ]);
    }

    public function logout(){
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh() {
        $user = Auth::user();
        $user->token = Auth::refresh();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

}