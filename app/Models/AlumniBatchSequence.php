<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $batch_year
 * @property int $last_serial
 */
class AlumniBatchSequence extends Model
{
    protected $primaryKey = 'batch_year';

    public $incrementing = false;

    public $timestamps = false;

    protected $keyType = 'int';

    protected $fillable = [
        'batch_year',
        'last_serial',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'batch_year' => 'integer',
            'last_serial' => 'integer',
        ];
    }
}
