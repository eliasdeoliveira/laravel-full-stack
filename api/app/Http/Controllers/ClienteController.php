<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index()
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente->get();
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 200);
    }

    public function getOne($id)
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente->where('id', $id)->get();
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }

    public function insert(Request $request)
    {
        try {
            $resposta = $this->validarFormulario($request->all());
            if ($resposta == true) {
                $cliente = new Cliente();
                $resposta = $cliente->create($request->all());
            } else {
                $resposta = array(
                    'status' =>  false,
                    'mensagem' => 'Cliente é de Minas Gerais, não é permitido cadastrar clientes que sejam do tipo pessoa física'
                );
            }
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente->where('id', $id)->update($request->all());
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
        }
        return response()->json($resposta, 201);
    }

    public function delete($id)
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente->where('id', $id)->delete();
        } catch (\Throwable $error) {
            //throw $th;
            $resposta = $error;
        }
        return response()->json($resposta, 201);
    }

    private function validarFormulario($dados)
    {
        if (($dados['uf'] == 'MG' || $dados['uf'] == 'Minas Gerais') && $dados['tipoCliente'] == 'Pessoa Fisica') {
            return false;
        } else {
            return true;
        }
    }
}
