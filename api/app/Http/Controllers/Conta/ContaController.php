<?php

namespace App\Http\Controllers\Conta;

use App\Services\Conta as ContaServices;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Lumen\Routing\Controller;

class ContaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $conta = new ContaServices();
        $response = response();
        return $response->json($conta->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $conta = new ContaServices();
        $response = response();
        return $response->json($conta->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = $request->getParsedBody();
        $conta = new ContaServices();
        return response()->json($conta->alterar($id, $dados),201);
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $conta = new ContaServices();
        $response = response();
        return $response->json($conta->remover($id));
    }
}
