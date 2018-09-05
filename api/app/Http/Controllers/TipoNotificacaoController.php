<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;

class TipoNotificacaoController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $tipoNotificacao = new \App\Services\TipoNotificacao();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($tipoNotificacao->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $tipoNotificacao = new \App\Services\TipoNotificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($tipoNotificacao->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = $request->getParsedBody();
        $tipoNotificacao = new \App\Services\TipoNotificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($tipoNotificacao->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $tipoNotificacao = new \App\Services\TipoNotificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($tipoNotificacao->desabilitar($id));
    }
}
