<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    //

        public function index(Request $request)
    {
        $categories = Category::paginate(10);

        $search = $request->input('search');

        if($search){

            $categories = Category::where('name', 'like', '%' . $search . '%')->paginate(10);
        }

        $data = [
            'data' => $categories,
            'search' => $search,
        ];

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
        ]);

    
        $category = Category::create($validated);
        
        $data = [
            'success' => 'Successfully added',
            'category' => $category,
        ];
    
        return response()->json($data, 201);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
        ]);

    
        $category->update($validated);

        $data = [
            'success' => 'Successfully updated',
            'category' => $category,
        ];
        
        

        return response()->json($data);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json($category, 200);
    }

}
