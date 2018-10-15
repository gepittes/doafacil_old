<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class ContaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $conta = new \App\Services\Conta();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();

        return $response->json($conta->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($conta->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = $request->getParsedBody();
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($conta->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($conta->desabilitar($id));
    }
}
