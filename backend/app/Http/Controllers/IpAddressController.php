<?php

namespace App\Http\Controllers;

use App\Http\Requests\IpAddress\StoreIpAddressRequest;
use App\Http\Requests\IpAddress\UpdateIpAddressRequest;
use App\Http\Resources\IpAddress\IpAddressResource;
use App\Models\IpAddress;
use Illuminate\Support\Facades\Gate;

class IpAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return IpAddressResource::collection(IpAddress::all()->load(['auditLogs', 'auditLogs.actionedBy']));
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

        return new IpAddressResource($ipAddress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIpAddressRequest $request, IpAddress $ipAddress)
    {

        Gate::authorize('update', $ipAddress);

        $ipAddress->auditLogs()->create(['payload' => $ipAddress->toJson(), 'actioned_by' => $request->user()->id]);
        $ipAddress->label = $request->validated('label');
        $ipAddress->save();

        // return response()->json($ipAddress->load("auditLogs"));
        return new IpAddressResource($ipAddress->load(['auditLogs', 'auditLogs.actionedBy']));
    }
}