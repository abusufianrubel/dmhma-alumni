<?php

namespace App\Http\Controllers;

use App\Support\AlumniBatchYears;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('dashboard', [
            'batchYears' => $request->user()->profile?->batch_year === null
                ? AlumniBatchYears::all()
                : [],
        ]);
    }
}
