<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class NotificacaoSistemaController extends Controller
{
    public function get(ServerRequestInterface $request, $sistema_id = null)
    {
        $notificacao = new \App\Services\Notificacao();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->obterNotificacoesSistema($sistema_id));
    }
}
