<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Validation\ValidationException;


class LoginController extends Controller
{
    //

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (! Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return response()->json(['error' => 'wrong credentials'], Response::HTTP_UNAUTHORIZED);
        }
        
        $user = $request->user();
        $expiration = Carbon::now()->addHours(12);

        $user->expiration = $expiration;
        return $user;
        
    }

    public function logout(){
        
        return Auth::logout();
    }
}
