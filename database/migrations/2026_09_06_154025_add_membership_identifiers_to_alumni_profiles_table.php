<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->unsignedSmallInteger('batch_serial')->nullable()->after('batch_year');
            $table->string('member_id', 32)->nullable()->after('batch_serial');

            $table->unique(['batch_year', 'batch_serial']);
            $table->unique('member_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumni_profiles', function (Blueprint $table) {
            $table->dropUnique(['batch_year', 'batch_serial']);
            $table->dropUnique(['member_id']);
            $table->dropColumn(['batch_serial', 'member_id']);
        });
    }
};
