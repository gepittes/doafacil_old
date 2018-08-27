<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;

class UsuarioController extends Controller implements RequestInter
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $data = [
            1 => 1, 2, 3, 4, 5
        ];

        return response()->json($data);
    }

    public function post (ServerRequestInterface $request)
    {
xd($request->getParsedBody());
//        usuario_id
//        descricao
    }
}