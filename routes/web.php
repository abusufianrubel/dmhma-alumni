<?php

use App\Http\Controllers\BatchSelectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterSubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::post('newsletter/subscribe', NewsletterSubscriptionController::class)
    ->middleware('throttle:6,1')
    ->name('newsletter.subscribe');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('profile/batch', BatchSelectionController::class)
        ->middleware('throttle:10,1')
        ->name('profile.batch.store');

    Route::middleware('batch.selected')->group(function () {
        Route::inertia('directory', 'directory')->name('directory');
        Route::inertia('membership', 'membership')->name('membership');
    });
});

require __DIR__.'/settings.php';
