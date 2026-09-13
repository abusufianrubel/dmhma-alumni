<?php

namespace App\Http\Controllers;

use App\Actions\AssignAlumniMemberId;
use App\Http\Requests\StoreBatchSelectionRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class BatchSelectionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(
        StoreBatchSelectionRequest $request,
        AssignAlumniMemberId $assignAlumniMemberId,
    ): RedirectResponse {
        $profile = $assignAlumniMemberId->handle(
            $request->user(),
            $request->integer('batch_year'),
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Welcome! Your DMHMA Member ID is :memberId.', [
                'memberId' => $profile->member_id,
            ]),
        ]);

        return to_route('dashboard');
    }
}
