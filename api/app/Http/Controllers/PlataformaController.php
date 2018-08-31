<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;

class PlataformaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $plataforma = new \App\Services\Plataforma();
        return response()->json($plataforma->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        try {
            $dados = $request->getParsedBody();
            $plataforma = new \App\Services\Plataforma();

            return response()->json($plataforma->criar($dados));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        try {
            $dados = $request->getParsedBody();
            $plataforma = new \App\Services\Plataforma();

            return response()->json($plataforma->alterar($id, $dados));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        try {
            $plataforma = new \App\Services\Plataforma();

            return response()->json($plataforma->desabilitar($id));
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), 400);
        }
    }
}
