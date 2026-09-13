<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('membership'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the membership page', function () {
    $user = User::factory()->hasProfile(['batch_year' => 2012])->create();

    $response = $this
        ->actingAs($user)
        ->get(route('membership'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('membership')
        ->where('auth.user.id', $user->id)
        ->etc()
    );
});
