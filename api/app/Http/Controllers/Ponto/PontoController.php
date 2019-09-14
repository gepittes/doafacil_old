<?php

namespace App\Http\Controllers\Ponto;

use App\Models\PontoDeDoacao;
use App\Services\Ponto\PontoServices as PontoService;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Lumen\Routing\Controller;

class PontoController extends Controller
{
    public function get()
    {
        $pontoServices = new PontoService();
        return response()->json($pontoServices->obter());
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        $pontoServices = new PontoService();
        try {
            return response()->json($pontoServices->criar($dados));
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function show($id)
    {
        $intituicao = PontoDeDoacao::find($id);

        return response()->json($intituicao);
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = $request->getParsedBody();
        $pontoServices = new PontoService();
        return response()->json($pontoServices->alterar($id, $dados));
    }

    public function delete($id)
    {
        $pontoServices = new PontoService();
        return response()->json($pontoServices->remover($id));
    }

    public function getPontoByInst($id)
    {
        $pontoServices = new PontoService();
        return response()->json($pontoServices->obter($id, 'instituicao_id'));
    }

}
