<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/authenticate", [AuthenticationController::class, "authenticate"]);

Route::get('/test', function (Request $request) {
    return dd("ok");
});