<?php

namespace App\Http\Controllers;

use App\Models\Frozen;
use App\Models\SaleLog;
use App\Models\SaleLogProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SaleLogController extends Controller
{
    //

    public function index(Request $request){

        $saleLogs = SaleLog::paginate(10);

        $search = $request->input('search');

        if($search){

            $saleLogs = SaleLog::where('name', 'like', '%' . $search . '%')
            ->paginate(10);
        }

        foreach($saleLogs as $saleLog){
            
            $saleLog->sale_date = Carbon::parse($saleLog->sale_date)->format('m/d/Y');

        }

        $data = [
            'data' => $saleLogs,
            'search' => $search,
        ];

        return response()->json($data);
    }

    public function store(Request $request){

        $validated = $request->validate([
            'customer_name' => 'required|max:255',
            'sale_date' => 'required|date',
        ]);

        $validated['sale_date'] = date('Y-m-d', strtotime($validated['sale_date']));
        $validated['total_price'] = 0;
        $sale_log = SaleLog::create($validated);
        $total_price = 0;
        
        if ($request->has('saleLogProducts')) {
            foreach ($request->saleLogProducts as $productData) {
                $saleLogProduct = new SaleLogProduct([
                    'sale_log_id' => $sale_log->id,
                    'frozen_id' => $productData['frozen_id'],
                    'product' => $productData['product'],
                    'price' => $productData['price'],
                ]);
                $total_price += $productData['price'];
                $saleLogProduct->save();

                //for auto subtracting of the inventory
                $frozen = Frozen::find($productData['frozen_id']);
                if ($frozen) {
                    $frozen->amount -= 1; 
                    $frozen->save();
                }
            }               
        }
        
        // Update the total price after saving all related SaleLogProducts
        $sale_log->total_price = $total_price;
        $sale_log->save();

        $data = [
            'success' => 'Successfully added',
            'sale_log' => $sale_log,
        ];

        
    
        return response()->json($data, 201);
    }

    public function show($id){

        $saleLog = SaleLog::with('saleLogProducts')->find($id);

        if (!$saleLog) {

            return response()->json(['error' => 'Sale Log item not found'], 404);
        }

        $saleLog->sale_date = date('m/d/Y', strtotime($saleLog->sale_date));

        return response()->json($saleLog);
    }

    public function update(Request $request, SaleLog $saleLog){

        $validated = $request->validate([
            'customer_name' => 'required|max:255',
            'sale_date' => 'required|date',
        ]);
    
        $saleLog->update([
            'customer_name' => $validated['customer_name'],
            'sale_date' => date('Y-m-d', strtotime($validated['sale_date'])),
        ]);
    
        $total_price = 0;

        if ($request->has('saleLogProducts')) {
            foreach ($request->saleLogProducts as $productData) {
                $saleLogProduct = SaleLogProduct::updateOrCreate(
                    ['sale_log_id' => $saleLog->id, 'frozen_id' => $productData['frozen_id']],
                    ['product' => $productData['product'], 'price' => $productData['price']]
                );
                $total_price += $productData['price'];
            }
    
            $saleLog->saleLogProducts()->whereNotIn('id', collect($request->saleLogProducts)->pluck('id'))->delete();
        }

        $saleLog->total_price = $total_price;
        $saleLog->save();
    
        return response()->json(['success' => 'Successfully updated', 'sale_log' => $saleLog]);
    }

}
