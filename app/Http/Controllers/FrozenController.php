<?php

namespace App\Http\Controllers;

use App\Models\Frozen;
use Illuminate\Http\Request;

class FrozenController extends Controller
{
    //
    public function index(Request $request){

        $frozens = Frozen::with('category', 'brand')->paginate(10);

        $search = $request->input('search');

        if($search){

            $frozens = Frozen::with('category','brand')
            ->where('name', 'like', '%' . $search . '%')
            ->orWhere('size', 'like', '%' . $search . '%')
            ->paginate(10);
        }

        $data = [
            'data' => $frozens,
            'search' => $search,
        ];

        return response()->json($data);
    }

    public function store(Request $request){

        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'amount' => 'required',
            'size' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
        ]);

    
        $brand = Frozen::create($validated);
        $data = [
            'success' => 'Successfully added',
            'frozen' => $brand,
        ];
    
        return response()->json($data, 201);
    }

    public function show($id){

        $frozen = Frozen::with('category', 'brand')->find($id);

        if (!$frozen) {

            return response()->json(['error' => 'Frozen item not found'], 404);
        }
        

        return response()->json($frozen);
    }

    public function update(Request $request, Frozen $frozen){

        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'amount' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
        ]);

    
        $frozen->update($validated);

        $data = [
            'success' => 'Successfully updated',
            'brand' => $frozen,
        ];
        
        

        return response()->json($data);
    }

    public function destroy(Frozen $frozen){

        $frozen->delete();

        return response()->json($frozen, 200);
    }
}
