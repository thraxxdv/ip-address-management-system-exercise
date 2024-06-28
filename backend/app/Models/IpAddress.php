<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Class IpAddress
 * 
 * @property string $ip_address
 * @property string $label
 * @property int $created_by
 */
class IpAddress extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ip_address',
        'label',
        'created_by',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function auditLogs(): MorphMany
    {
        return $this->morphMany(AuditLog::class, "audit_loggable");
    }
}