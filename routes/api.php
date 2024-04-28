<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrozenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SaleLogController;
use App\Http\Controllers\SelectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [LoginController::class, 'authenticate']);
Route::post('logout', [LoginController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    Route::get('/select', SelectController::class);

    //Dashboard
    Route::get('/dashboard/sales', [DashboardController::class, 'salesOfTheDay']);
    Route::get('/dashboard/best_seller', [DashboardController::class, 'bestSeller']);

    //categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    
    //brands
    Route::get('/brands', [BrandController::class, 'index']);
    Route::post('/brands', [BrandController::class, 'store']);
    Route::get('/brands/{brand}', [BrandController::class, 'show']);
    Route::put('/brands/{brand}', [BrandController::class, 'update']);
    Route::delete('/brands/{brand}', [BrandController::class, 'destroy']);

    //frozens
    Route::get('/frozens', [FrozenController::class, 'index']);
    Route::post('/frozens', [FrozenController::class, 'store']);
    Route::get('/frozens/{id}', [FrozenController::class, 'show']);
    Route::put('/frozens/{frozen}', [FrozenController::class, 'update']);
    Route::delete('/frozens/{frozen}', [FrozenController::class, 'destroy']);

    //sale_logs
    Route::get('/sale_logs', [SaleLogController::class, 'index']);
    Route::post('/sale_logs', [SaleLogController::class, 'store']);
    Route::get('/sale_logs/{id}', [SaleLogController::class, 'show']);
    Route::put('/sale_logs/{saleLog}', [SaleLogController::class, 'update']);
    // Route::delete('/frozens/{frozen}', [FrozenController::class, 'destroy']);
});

