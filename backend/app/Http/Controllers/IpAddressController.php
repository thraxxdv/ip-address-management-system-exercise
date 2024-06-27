<?php

namespace App\Http\Controllers;

use App\Http\Requests\IpAddress\StoreIpAddressRequest;
use App\Models\IpAddress;
use Illuminate\Http\Request;

class IpAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIpAddressRequest $request)
    {
        $ipAddress = new IpAddress();
        $ipAddress->ip_address = $request->validated("ip_address");
        $ipAddress->label = $request->validated("label");
        $ipAddress->created_by = $request->user()->id;
        $ipAddress->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(IpAddress $ipAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IpAddress $ipAddress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IpAddress $ipAddress)
    {
        //
    }
}