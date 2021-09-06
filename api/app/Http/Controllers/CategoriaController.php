<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use PhpParser\Node\Stmt\TryCatch;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = new Categoria();
        $dados = $categorias->get();
        return response()->json($dados, 200);
    }

    public function insert(Request $request)
    {
        try {
            $categorias = new Categoria();
            $resposta = $categorias->create($request->all());
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $categorias = new Categoria();
            $resposta = $categorias->where('id', $id)->update($request->all());
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }

    public function delete($id)
    {
        try {
            $categorias = new Categoria();
            $resposta = $categorias->where('id', $id)->delete();
        } catch (\Throwable $erro) {
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }
}
