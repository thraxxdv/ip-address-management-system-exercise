<?php

namespace App\Http\Requests\IpAddress;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * Undocumented class
 * @property string $ip_address
 */
class StoreIpAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ip_address' => ['required', 'ipv4', 'unique:ip_addresses'],
            'label' => ['required', 'filled']
        ];
    }
}