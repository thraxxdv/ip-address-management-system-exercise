<?php

namespace App\Http\Controllers;

use App\Exceptions\Authentication\InvalidCredentialsException;
use App\Http\Requests\Authentication\AuthenticationRequest;
use App\Http\Resources\Authentication\TokenResource;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function authenticate(AuthenticationRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            $token = Auth::user()->createToken("authentication_token");
            return new TokenResource($token);
        } else {
            throw new InvalidCredentialsException();
        }
    }
}