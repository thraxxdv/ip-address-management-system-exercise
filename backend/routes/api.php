<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\IpAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/authenticate", [AuthenticationController::class, "authenticate"]);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('ip-addresses', IpAddressController::class)->only([
        'store'
    ]);
});