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
        Schema::create('alumni_batch_sequences', function (Blueprint $table) {
            $table->unsignedSmallInteger('batch_year')->primary();
            $table->unsignedSmallInteger('last_serial')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni_batch_sequences');
    }
};
