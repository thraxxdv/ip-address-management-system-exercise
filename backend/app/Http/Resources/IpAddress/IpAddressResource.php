<?php

namespace App\Http\Resources\IpAddress;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IpAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ip_address' => $this->ip_address,
            'label' => $this->label,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'audit_logs' => IpAddressAuditLogResource::collection($this->whenLoaded('auditLogs'))
        ];
    }
}