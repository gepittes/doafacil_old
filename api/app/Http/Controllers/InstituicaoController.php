<?php

namespace App\Http\Controllers;

use App\Models\Instituicao;
use Illuminate\Support\Facades\Request;
use Laravel\Lumen\Routing\Controller;
use Psr\Http\Message\ServerRequestInterface;

class InstituicaoController extends Controller
{
    public function get()
    {
        $intituicao = Instituicao::all();

        return response()->json($intituicao);
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        Instituicao::create($dados);


    }

    public function show($id)
    {
        $intituicao = Instituicao::find($id);

        return response()->json($intituicao);
    }


    public function patch($id)
    {

       Instituicao::find($id)->update(Request::all());

        return response(Instituicao::find($id),'201');
    }

    public function delete(Instituicao $instituicao, $id)
    {
        Instituicao::destroy($id);

        return response()->json($instituicao,'204');


    }
}
