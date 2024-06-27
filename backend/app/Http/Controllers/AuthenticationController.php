<?php

namespace App\Http\Controllers;

use App\Exceptions\Authentication\InvalidCredentialsException;
use App\Http\Requests\Authentication\AuthenticationRequest;
use App\Http\Resources\Authentication\AuthenticatedResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function authenticate(AuthenticationRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            return response()->json(Auth::user());
        } else {
            throw new InvalidCredentialsException();
        }
    }
}