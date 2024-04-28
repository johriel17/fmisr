<?php

namespace App\Http\Controllers;

use App\Models\Frozen;
use App\Models\SaleLog;
use App\Models\SaleLogProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //

    public function salesOfTheDay(){

        $today = Carbon::today();

        $sales = SaleLog::whereDate('sale_date', $today)->get();

        $total = 0.0;

        foreach($sales as $sale){
            $total += $sale->total_price;
        }

        $formattedTotal = number_format($total, 2, '.', ',');

        return response()->json($formattedTotal, 200);

    }

    public function bestSeller(){

        // $saleLogProducts = SaleLogProduct::all();
        
        $bestSellers = SaleLogProduct::select('frozen_id', DB::raw('COUNT(*) as total'))
        ->groupBy('frozen_id')
        ->orderByDesc('total')
        ->get();

        $highest = 0;
        // $bestSellerProducts = [];
        foreach($bestSellers as $bestSeller){
            if($bestSeller->total > $highest){
                $highest = $bestSeller->total;
            }
        };

        $bestSellerIds = [];

        foreach ($bestSellers as $bestSeller) {
            if ($highest == $bestSeller->total) {
                $bestSellerIds[] = $bestSeller->frozen_id;
            }
        }

        // Fetch Frozen records using the array of IDs
        $bestSellerProducts = Frozen::whereIn('id', $bestSellerIds)->pluck('name');

        $bestSellerProductsString = implode(', ', $bestSellerProducts->toArray());

        return response()->json($bestSellerProductsString, 200);

    }

}
