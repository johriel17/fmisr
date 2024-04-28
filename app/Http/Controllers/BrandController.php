<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    //
    public function index(Request $request){


        $brands = Brand::paginate(10);

        $search = $request->input('search');

        if($search){

            $brands = Brand::where('name', 'like', '%' . $search . '%')->paginate(10);
        }

        $data = [
            'data' => $brands,
            'search' => $search,
        ];

        return response()->json($data);
    }

    public function store(Request $request){

        $validated = $request->validate([
            'name' => 'required|max:255',
        ]);

    
        $brand = Brand::create($validated);
        $data = [
            'success' => 'Successfully added',
            'brand' => $brand,
        ];
    
        return response()->json($data, 201);
    }

    public function show(Brand $brand){

        return response()->json($brand);
    }

    public function update(Request $request, Brand $brand){

        $validated = $request->validate([
            'name' => 'required|max:255',
        ]);

    
        $brand->update($validated);

        $data = [
            'success' => 'Successfully updated',
            'brand' => $brand,
        ];
        
        

        return response()->json($data);
    }

    public function destroy(Brand $brand){

        $brand->delete();

        return response()->json($brand, 200);
    }
}
