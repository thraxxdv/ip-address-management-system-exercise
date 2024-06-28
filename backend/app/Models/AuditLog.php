<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class AuditLog
 * 
 * @property int $actioned_by
 * @property int $audit_loggable_id
 * @property string $audit_loggable_type
 */
class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = ['payload', 'actioned_by'];

    public function auditLoggable(): MorphTo
    {
        return $this->morphTo();
    }

    public function actionedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, "actioned_by");
    }
}