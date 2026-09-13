<?php

namespace App\Http\Requests;

use App\Support\AlumniBatchYears;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBatchSelectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'batch_year' => [
                'required',
                'integer',
                Rule::in(AlumniBatchYears::all()),
            ],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'batch_year.required' => __('Select your SSC batch to continue.'),
            'batch_year.integer' => __('Select a valid SSC batch year.'),
            'batch_year.in' => __('Select a valid SSC batch year.'),
        ];
    }
}
