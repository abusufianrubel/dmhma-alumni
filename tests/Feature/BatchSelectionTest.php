<?php

use App\Models\AlumniBatchSequence;
use App\Models\User;

test('guests are redirected to login when selecting a batch', function () {
    $this->post(route('profile.batch.store'), ['batch_year' => 2026])
        ->assertRedirect(route('login'));
});

test('a member ID is generated from the selected batch', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('profile.batch.store'), ['batch_year' => 2026]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('dashboard'))
        ->assertInertiaFlash('toast.type', 'success')
        ->assertInertiaFlash(
            'toast.message',
            'Welcome! Your DMHMA Member ID is DMHMA-2026-0001.',
        );

    $this->assertDatabaseHas('alumni_profiles', [
        'user_id' => $user->id,
        'batch_year' => 2026,
        'batch_serial' => 1,
        'member_id' => 'DMHMA-2026-0001',
    ]);
    $this->assertDatabaseHas('alumni_batch_sequences', [
        'batch_year' => 2026,
        'last_serial' => 1,
    ]);
});

test('serial numbers increment independently within each batch', function () {
    $firstUser = User::factory()->create();
    $secondUser = User::factory()->create();
    $differentBatchUser = User::factory()->create();

    $this->actingAs($firstUser)
        ->post(route('profile.batch.store'), ['batch_year' => 2026]);
    $this->actingAs($secondUser)
        ->post(route('profile.batch.store'), ['batch_year' => 2026]);
    $this->actingAs($differentBatchUser)
        ->post(route('profile.batch.store'), ['batch_year' => 2025]);

    expect($firstUser->profile()->value('member_id'))->toBe('DMHMA-2026-0001')
        ->and($secondUser->profile()->value('member_id'))->toBe('DMHMA-2026-0002')
        ->and($differentBatchUser->profile()->value('member_id'))->toBe('DMHMA-2025-0001');
});

test('an existing member ID is never regenerated', function () {
    $user = User::factory()->hasProfile([
        'batch_year' => 2010,
        'batch_serial' => 58,
        'member_id' => 'DMHMA-2010-0058',
    ])->create();

    $this->actingAs($user)
        ->post(route('profile.batch.store'), ['batch_year' => 2026])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('dashboard'));

    expect($user->profile()->firstOrFail())
        ->batch_year->toBe(2010)
        ->batch_serial->toBe(58)
        ->member_id->toBe('DMHMA-2010-0058');

    expect(AlumniBatchSequence::query()->count())->toBe(0);
});

test('an existing batch year is preserved when assigning a missing member ID', function () {
    $user = User::factory()->hasProfile([
        'batch_year' => 2012,
        'batch_serial' => null,
        'member_id' => null,
    ])->create();

    $this->actingAs($user)
        ->post(route('profile.batch.store'), ['batch_year' => 2026])
        ->assertSessionHasNoErrors();

    expect($user->profile()->firstOrFail())
        ->batch_year->toBe(2012)
        ->batch_serial->toBe(1)
        ->member_id->toBe('DMHMA-2012-0001');
});

test('a supported SSC batch year is required', function (mixed $batchYear, string $message) {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('dashboard'))
        ->post(route('profile.batch.store'), ['batch_year' => $batchYear]);

    $response
        ->assertSessionHasErrors(['batch_year' => $message])
        ->assertRedirect(route('dashboard'));

    expect($user->profile()->exists())->toBeFalse();
})->with([
    'missing year' => [null, 'Select your SSC batch to continue.'],
    'before the first batch' => [1998, 'Select a valid SSC batch year.'],
    'future year' => [9999, 'Select a valid SSC batch year.'],
    'non-numeric year' => ['latest', 'Select a valid SSC batch year.'],
]);

test('server-controlled member ID fields cannot be supplied by the user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('profile.batch.store'), [
            'batch_year' => 2026,
            'batch_serial' => 9000,
            'member_id' => 'DMHMA-2026-9000',
        ])
        ->assertSessionHasNoErrors();

    expect($user->profile()->firstOrFail())
        ->batch_serial->toBe(1)
        ->member_id->toBe('DMHMA-2026-0001');
});

test('members without a batch are redirected to the dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('directory'))
        ->assertRedirect(route('dashboard'));
});

test('a clear error is returned when a batch has used every serial', function () {
    $user = User::factory()->create();
    AlumniBatchSequence::query()->create([
        'batch_year' => 2026,
        'last_serial' => 9999,
    ]);

    $response = $this
        ->actingAs($user)
        ->from(route('dashboard'))
        ->post(route('profile.batch.store'), ['batch_year' => 2026]);

    $response
        ->assertSessionHasErrors([
            'batch_year' => 'This batch has reached its member ID limit. Please contact support.',
        ])
        ->assertRedirect(route('dashboard'));

    expect($user->profile()->exists())->toBeFalse();
});
