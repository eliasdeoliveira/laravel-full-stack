<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{

    public Int $status = 200;

    public function index()
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente
                ->join('categorias', 'categorias.id', '=', 'clientes.categoria_id')
                ->select('clientes.*', 'categorias.nome as categoria')
                ->get();
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


    public function search(Request $request)
    {
        try {
            $cliente = new Cliente();
            $resposta = $cliente
                ->join('categorias', 'categorias.id', '=', 'clientes.categoria_id')
                ->select('clientes.*', 'categorias.nome as categoria')
                ->where('clientes.nome', 'LIKE', '%' . $request->all()['texto'] . '%')
                ->orWhere('clientes.uf', 'like', '%' . $request->all()['texto'] . '%')
                ->orWhere('categorias.nome', 'like', '%' . $request->all()['texto'] . '%')
                ->get();
        } catch (\Throwable $erro) {
            //throw $th;
            $resposta = $erro;
            $this->status = 400;
        }
        return response()->json($resposta, $this->status);
    }

    public function insert(Request $request)
    {
        try {
            $resposta = $this->validarFormulario($request->all());
            if ($resposta == true) {
                $this->status = 201;
                $cliente = new Cliente();
                $resposta = $cliente->create($request->all());
            } else {
                $resposta = array(
                    'status' =>  false,
                    'mensagem' => 'Cliente é de Minas Gerais, não é permitido cadastrar clientes que sejam do tipo pessoa física'
                );
            }
        } catch (\Exception  $erro) {
            //throw $th;
            $this->status = 400;
            $resposta = $erro;
        }
        return response()->json($resposta, $this->status);
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
        try {
            if (($dados['uf'] == 'MG' || $dados['uf'] == 'Minas Gerais') && $dados['tipoCliente'] == 'Pessoa Fisica') {
                return false;
            } else {
                return true;
            }
        } catch (\Throwable $th) {
            return response()->json($th, 404);
        }
    }
}
