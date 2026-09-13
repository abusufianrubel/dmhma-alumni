<?php

namespace App\Actions;

use App\Models\AlumniBatchSequence;
use App\Models\AlumniProfile;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AssignAlumniMemberId
{
    public function handle(User $user, int $batchYear): AlumniProfile
    {
        return DB::transaction(function () use ($user, $batchYear): AlumniProfile {
            $lockedUser = User::query()
                ->whereKey($user->getKey())
                ->lockForUpdate()
                ->firstOrFail();

            $profile = AlumniProfile::query()
                ->whereBelongsTo($lockedUser)
                ->lockForUpdate()
                ->firstOrNew(['user_id' => $lockedUser->getKey()]);

            if ($profile->member_id !== null) {
                return $profile;
            }

            $assignedBatchYear = $profile->batch_year ?? $batchYear;

            AlumniBatchSequence::query()->insertOrIgnore([
                'batch_year' => $assignedBatchYear,
                'last_serial' => 0,
            ]);

            $sequence = AlumniBatchSequence::query()
                ->whereKey($assignedBatchYear)
                ->lockForUpdate()
                ->firstOrFail();

            if ($sequence->last_serial >= 9999) {
                throw ValidationException::withMessages([
                    'batch_year' => __('This batch has reached its member ID limit. Please contact support.'),
                ]);
            }

            $nextSerial = $sequence->last_serial + 1;
            $memberId = sprintf(
                'DMHMA-%d-%s',
                $assignedBatchYear,
                Str::padLeft((string) $nextSerial, 4, '0'),
            );

            $sequence->update(['last_serial' => $nextSerial]);

            $profile->forceFill([
                'user_id' => $lockedUser->getKey(),
                'batch_year' => $assignedBatchYear,
                'batch_serial' => $nextSerial,
                'member_id' => $memberId,
            ])->save();

            return $profile;
        }, 5);
    }
}
