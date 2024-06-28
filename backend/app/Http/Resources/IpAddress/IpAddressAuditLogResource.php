<?php

namespace App\Http\Resources\IpAddress;

use App\Models\IpAddress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IpAddressAuditLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $ipAddress = new IpAddress();
        $ipAddress->forceFill((array) json_decode($this->payload));

        return [
            'label' => $ipAddress->label,
            'actioned_at' => $this->created_at,
            'actioned_by' => $this->actionedBy->name
        ];
    }
}