<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $batchYears = DB::table('alumni_profiles')
            ->whereNotNull('batch_year')
            ->distinct()
            ->orderBy('batch_year')
            ->pluck('batch_year');

        foreach ($batchYears as $batchYear) {
            $serial = 0;

            DB::table('alumni_profiles')
                ->where('batch_year', $batchYear)
                ->orderBy('id')
                ->chunkById(500, function ($profiles) use ($batchYear, &$serial): void {
                    foreach ($profiles as $profile) {
                        $serial++;

                        if ($serial > 9999) {
                            throw new RuntimeException("Batch {$batchYear} exceeds the four-digit member ID limit.");
                        }

                        DB::table('alumni_profiles')
                            ->where('id', $profile->id)
                            ->update([
                                'batch_serial' => $serial,
                                'member_id' => sprintf(
                                    'DMHMA-%d-%s',
                                    $batchYear,
                                    Str::padLeft((string) $serial, 4, '0'),
                                ),
                            ]);
                    }
                });

            DB::table('alumni_batch_sequences')->insert([
                'batch_year' => $batchYear,
                'last_serial' => $serial,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('alumni_profiles')->update([
            'batch_serial' => null,
            'member_id' => null,
        ]);

        DB::table('alumni_batch_sequences')->delete();
    }
};
