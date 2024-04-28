<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SaleLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'sale_date',
        'total_price'
    ];

    public function saleLogProducts(): HasMany {
        return $this->hasMany(SaleLogProduct::class);
    }
}
