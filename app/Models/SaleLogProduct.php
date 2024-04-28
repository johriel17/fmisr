<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SaleLogProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'product',
        'sale_log_id',
        'frozen_id'
    ];

    public function SaleLogs(): BelongsToMany{
        return $this->belongsToMany(SaleLog::class);
    }

    public function Frozens(): BelongsToMany{
        return $this->belongsToMany(Frozen::class);
    }
}
