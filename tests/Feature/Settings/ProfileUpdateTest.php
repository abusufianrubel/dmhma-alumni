<?php

use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

test('profile page is displayed', function () {
    $user = User::factory()->hasProfile([
        'batch_year' => 2012,
        'student_id' => 'DMHMA-2024-0158',
        'blood_group' => 'B+',
        'nickname' => 'Arafat',
        'father_name' => 'Anwar Hossain',
        'mother_name' => 'Salma Begum',
        'gender' => 'male',
        'tshirt_size' => 'XXL',
    ])->create();

    $response = $this
        ->actingAs($user)
        ->get(route('profile.edit'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('settings/profile')
        ->where('mustVerifyEmail', false)
        ->where('profile.batch_year', 2012)
        ->where('profile.student_id', 'DMHMA-2024-0158')
        ->where('profile.blood_group', 'B+')
        ->where('profile.nickname', 'Arafat')
        ->where('profile.father_name', 'Anwar Hossain')
        ->where('profile.mother_name', 'Salma Begum')
        ->where('profile.gender', 'male')
        ->where('profile.tshirt_size', 'XXL')
        ->where('status', null)
        ->etc()
    );
});

test('profile page includes the email verification status', function () {
    $user = User::factory()->hasProfile(['batch_year' => 2012])->create();

    $response = $this
        ->actingAs($user)
        ->withSession(['status' => 'verification-link-sent'])
        ->get(route('profile.edit'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('settings/profile')
        ->where('mustVerifyEmail', false)
        ->where('status', 'verification-link-sent')
        ->etc()
    );
});

test('personal profile information can be updated', function () {
    $user = User::factory()->hasProfile([
        'batch_year' => 2012,
        'is_verified' => false,
    ])->create();
    $originalEmail = $user->email;

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'nickname' => 'Arafat',
            'father_name' => 'Anwar Hossain',
            'mother_name' => 'Salma Begum',
            'date_of_birth' => '1994-01-15',
            'gender' => 'male',
            'blood_group' => 'B+',
            'present_address' => 'Dhanmondi, Dhaka',
            'permanent_address' => 'Jhenidah, Khulna',
            'tshirt_size' => 'XXL',
            'is_verified' => true,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    $user->refresh();
    $profile = $user->profile;

    expect($user->name)->toBe('Test User')
        ->and($user->email)->toBe($originalEmail)
        ->and($profile->nickname)->toBe('Arafat')
        ->and($profile->father_name)->toBe('Anwar Hossain')
        ->and($profile->mother_name)->toBe('Salma Begum')
        ->and($profile->date_of_birth->toDateString())->toBe('1994-01-15')
        ->and($profile->gender)->toBe('male')
        ->and($profile->blood_group)->toBe('B+')
        ->and($profile->present_address)->toBe('Dhanmondi, Dhaka')
        ->and($profile->permanent_address)->toBe('Jhenidah, Khulna')
        ->and($profile->tshirt_size)->toBe('XXL')
        ->and($profile->is_verified)->toBeFalse();
});

test('stored addresses are preserved when the basic information form omits them', function () {
    $user = User::factory()->hasProfile([
        'present_address' => 'Dhanmondi, Dhaka',
        'permanent_address' => 'Jhenidah, Khulna',
    ])->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'blood_group' => 'B+',
            'tshirt_size' => 'XL',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    $profile = $user->profile()->firstOrFail();

    expect($profile->present_address)->toBe('Dhanmondi, Dhaka')
        ->and($profile->permanent_address)->toBe('Jhenidah, Khulna')
        ->and($profile->blood_group)->toBe('B+')
        ->and($profile->tshirt_size)->toBe('XL');
});

test('personal profile information must use supported values', function () {
    $user = User::factory()->hasProfile([
        'batch_year' => 2012,
        'nickname' => null,
        'date_of_birth' => null,
        'gender' => null,
        'blood_group' => null,
        'tshirt_size' => null,
    ])->create();

    $response = $this
        ->actingAs($user)
        ->from(route('profile.edit'))
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'nickname' => Str::repeat('a', 101),
            'date_of_birth' => now()->addDay()->toDateString(),
            'gender' => 'unsupported',
            'blood_group' => 'X+',
            'tshirt_size' => '2XL',
        ]);

    $response
        ->assertSessionHasErrors([
            'date_of_birth',
            'gender',
            'blood_group',
            'nickname',
            'tshirt_size',
        ])
        ->assertRedirect(route('profile.edit'));

    $profile = $user->profile()->firstOrFail();

    expect($profile->nickname)->toBeNull()
        ->and($profile->date_of_birth)->toBeNull()
        ->and($profile->gender)->toBeNull()
        ->and($profile->blood_group)->not->toBe('X+')
        ->and($profile->tshirt_size)->toBeNull();
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->hasProfile(['batch_year' => 2012])->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test('user can delete their account', function () {
    $user = User::factory()->hasProfile(['batch_year' => 2012])->create();

    $response = $this
        ->actingAs($user)
        ->delete(route('profile.destroy'), [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('home'));

    $this->assertGuest();
    expect($user->fresh())->toBeNull();
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->hasProfile(['batch_year' => 2012])->create();

    $response = $this
        ->actingAs($user)
        ->from(route('profile.edit'))
        ->delete(route('profile.destroy'), [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect(route('profile.edit'));

    expect($user->fresh())->not->toBeNull();
});
