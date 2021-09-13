<?php
use App\Http\Controllers\{
    CategoriaController,
    ClienteController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     Route::get('/categorias', [CategoriaController::class, 'index']);
//     // return $request->user();
// });


Route::get('/categorias', [CategoriaController::class, 'index']);
Route::post('categorias/insert', [CategoriaController::class, 'insert']);
Route::put('categorias/update/{id}', [CategoriaController::class, 'update']);
Route::delete('categorias/delete/{id}', [CategoriaController::class, 'delete']);


Route::get('/clientes', [ClienteController::class, 'index']);
Route::post('clientes/insert', [ClienteController::class, 'insert']);
Route::get('clientes/get/{id}', [ClienteController::class, 'getOne']);
Route::post('clientes/search', [ClienteController::class, 'search']);
Route::put('clientes/update/{id}', [ClienteController::class, 'update']);
Route::delete('clientes/delete/{id}', [ClienteController::class, 'delete']);
