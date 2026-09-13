<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->where('auth.user.id', $user->id)
        ->where('auth.user.name', $user->name)
        ->where('auth.user.profile', null)
        ->has('auth.user.created_at')
        ->where('batchYears.0', (int) now()->year)
        ->where('batchYears.'.((int) now()->year - 1999), 1999)
        ->etc()
    );
});
