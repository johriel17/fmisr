<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// Route::get('login', function(){
//     return view('login');
// })->name('login');

// Route::get('/login', function(){
//     return view('index');
// })->name('login');

// Route::get('/{any?}/{slug?}', function () {
//     return view('index');
// })->name('index');

Route::get('/{all}', function () {
    return view('index');
})->where('all', '^(?!api).*$');


