<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Frozen extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'amount',
        'category_id',
        'brand_id',
    ];

    public function category(){

        return $this->belongsTo(Category::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function SaleLogProducts(): BelongsToMany{
        return $this->belongsToMany(SaleLogProduct::class);
    }
}
