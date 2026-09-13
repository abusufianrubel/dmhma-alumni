<?php

namespace App\Support;

class AlumniBatchYears
{
    public const int FirstBatchYear = 1999;

    /** @return list<int> */
    public static function all(): array
    {
        return range((int) now()->year, self::FirstBatchYear);
    }
}
