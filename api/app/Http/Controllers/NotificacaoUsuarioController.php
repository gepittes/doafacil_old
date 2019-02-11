<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class NotificacaoUsuarioController extends Controller
{
    public function get(ServerRequestInterface $request, $usuario_id, $limite = null)
    {
        $notificacao = new \App\Services\Notificacao();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
//        $dados = $request->getParsedBody();
//        $limite = null;
//        if(isset($dados['limite']) && (int)$dados['limite'] > 0) {
//            $limite = (int)$dados['limite'];
//        }
        return $response->json($notificacao->obterNotificacoesUsuario($usuario_id, $limite));
    }

    public function patch(ServerRequestInterface $request, $notificacao_id, $usuario_id)
    {
        $dados = $request->getParsedBody();
        $notificacao = new \App\Services\Notificacao();
        $dados = $request->getParsedBody();
        if(!isset($dados['']))
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->lerNotificacao($notificacao_id, $usuario_id));
    }
}
