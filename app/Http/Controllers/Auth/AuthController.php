<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Store a new user
     * @param  StoreUser  $request
     * @return \Illuminate\Http\Response
     */
    public function register(StoreUser $request)
    {
        $user =  User::create($request->all());
        return response()->json(['user'=> $user], 200);
    }

    /**
    * Authenticate current user
    * @param Request $request
    * @return \Illuminate\Http\Response
    **/
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = Auth::attempt($credentials)) {
            return response()->json(['status' => 'success'], 200)->header('Authorization', $token);
        }

        return response()->json(['error' => 'login_error'], 422);
    }

    /**
     * Retrieve current user from database
     * @return \Illuminate\Http\Response
     */
    public function user()
    {
        $user = Auth::user();
        return response()->json(['user' => $user], 200);
    }

    /**
     * refresh token when requested
     * @return \Illuminate\Http\Response
     */
    public function refresh()
    {
        if ($token = Auth::refresh()) {
            return response()
                ->json(['status' => 'successs'], 200)
                ->header('Authorization', $token);
        }
        return response()->json(['error' => 'refresh_token_error'], 401);
    }

    /**
     * Logout current user
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        Auth::logout();
        return response()->json(['status' => 'success'], 200);
    }
}
