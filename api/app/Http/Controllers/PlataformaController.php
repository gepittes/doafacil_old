<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;

class PlataformaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $conta = new \App\Services\Conta();
        return response()->json($conta->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        try {
            $dados = $request->getParsedBody();
            $conta = new \App\Services\Conta();

            return response()->json($conta->criar($dados));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        try {
            $dados = $request->getParsedBody();
            $conta = new \App\Services\Conta();

            return response()->json($conta->alterar($id, $dados));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        try {
            $conta = new \App\Services\Conta();

            return response()->json($conta->desabilitar($id));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }
}
