<?php

namespace App\Http\Controllers\Instituicao;

use App\Services\Instituicao\InstituicaoServices;
use Laravel\Lumen\Routing\Controller;
use Psr\Http\Message\ServerRequestInterface;


class InstituicaoController extends Controller
{
    public function get($id = null)
    {
        $instituicao = new InstituicaoServices();

        if (!empty(trim($id))) {
            return response()->json($instituicao->obter($id));
        }
        return response()->json($instituicao->obter());
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $instituicao = new InstituicaoServices();

        return response()->json($instituicao->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id)
    {
        $dados = $request->getParsedBody();
        $intituicao = new InstituicaoServices();

        return response()->json($intituicao->alterar($id, $dados));
    }

    public function delete($id)
    {
        $intituicao = new InstituicaoServices();

        return response()->json($intituicao->remover($id));
    }

    public function getInstisUser($id)
    {
        $instituicao = new InstituicaoServices();

        return response()->json($instituicao->obter($id, 'fk_usuario_id'));
    }
}
