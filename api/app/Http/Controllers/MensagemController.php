<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;

class MensagemController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $mensagem = new \App\Services\Mensagem();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = $request->getParsedBody();
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->desabilitar($id));
    }
}
