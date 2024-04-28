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
        Schema::create('sale_log_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_log_id')->nullable()->constrained('sale_logs')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('frozen_id')->nullable()->constrained('frozens')->cascadeOnUpdate()->nullOnDelete();
            $table->string('product');
            $table->float('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_log_products');
    }
};
