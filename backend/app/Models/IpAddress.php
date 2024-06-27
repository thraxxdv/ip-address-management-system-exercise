<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


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
}