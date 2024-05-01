<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Frozen;
use Illuminate\Http\Request;

class SelectController extends Controller
{
    //
    public function __invoke(Request $request){

        $type = $request->input('type');

        if($type == 'all-categories'){
            
            $categories = Category::all();

            return response()->json($categories, 200);
        }

        if($type == 'all-brands'){
        
            $brands = Brand::all();

            return response()->json($brands, 200);

        }

        if($type == 'all-frozen-with-cat'){

            $frozens = Frozen::with('category', 'brand')
            ->where('amount', '>', 0)
            ->orderBy('name')
            ->get();

            $data = [];

            foreach($frozens as $frozen){

                $data[] = [

                    'name' => $frozen['name'].' - '.$frozen['size'].' - '.$frozen['category']['name'].' - '.$frozen['brand']['name'],

                    'id' => $frozen['id']

                ];

            }

            return response()->json($data, 200);
        }

        return response()->json($type, 200);
    }
}
