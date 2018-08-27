<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;

class UsuarioController extends Controller
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

        $parsedBody = $request->getParsedBody();
        $usuario = new Usuario();
//        $usuario->usuario_id = 1;
        $usuario->descricao = $parsedBody['descricao'];

        $usuario->save();

        return response()->json($usuario);
    }
}