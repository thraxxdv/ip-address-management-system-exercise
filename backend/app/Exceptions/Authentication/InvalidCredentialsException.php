<?php

namespace App\Exceptions\Authentication;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvalidCredentialsException extends Exception
{
    /**
     * Render the exception as an HTTP response.
     */
    public function render(Request $request): Response
    {
        return response(['message' => "The login credentials that you have entered is invalid."], 401);
    }
}