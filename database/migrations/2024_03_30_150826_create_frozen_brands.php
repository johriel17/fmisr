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
        Schema::create('frozen_brands', function (Blueprint $table) {
            $table->id();
            $table->foreignId('frozen_id')->nullable()->constrained('frozens');
            $table->foreignId('brand_id')->nullable()->constrained('brands');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('frozen_brands');
    }
};
