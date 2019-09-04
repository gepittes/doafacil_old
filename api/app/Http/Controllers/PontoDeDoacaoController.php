<?php

namespace App\Http\Controllers;

use App\Models\PontoDeDoacao;
use Illuminate\Http\Request;
use Psr\Http\Message\ServerRequestInterface;

class PontoDeDoacaoController extends Controller
{
    public function get()
    {
        $pontoDeDoacao = PontoDeDoacao::all();

        return response()->json($pontoDeDoacao);
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();

        return response()->json(PontoDeDoacao::create($dados));
    }

    public function show($id)
    {
        $intituicao = PontoDeDoacao::find($id);

        return response()->json($intituicao);
    }


    public function patch($id)
    {
        PontoDeDoacao::find($id)->update(Request::all());

        return response(PontoDeDoacao::find($id),'201');
    }

    public function delete(PontoDeDoacao $pontoDeDoacao, $id)
    {
        PontoDeDoacao::destroy($id);

        return response()->json($pontoDeDoacao,'204');
    }

}
