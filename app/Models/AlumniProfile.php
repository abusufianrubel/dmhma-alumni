<?php

namespace App\Models;

use Database\Factories\AlumniProfileFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int|null $batch_year
 * @property int|null $batch_serial
 * @property string|null $member_id
 */
class AlumniProfile extends Model
{
    /** @use HasFactory<AlumniProfileFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'batch_year',
        'student_id',
        'nickname',
        'father_name',
        'mother_name',
        'department',
        'blood_group',
        'phone',
        'date_of_birth',
        'gender',
        'present_address',
        'permanent_address',
        'tshirt_size',
        'occupation',
        'company',
        'designation',
        'bio',
        'linkedin_url',
        'facebook_url',
        'is_verified',
    ];

    protected $casts = [
        'batch_year' => 'integer',
        'batch_serial' => 'integer',
        'date_of_birth' => 'date',
        'is_verified' => 'boolean',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
