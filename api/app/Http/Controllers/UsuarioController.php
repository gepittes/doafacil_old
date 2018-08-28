<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Http\Request;
use Validator;

class UsuarioController extends Controller
{
    public function get(Request $request, $id = null)
    {

        if(!empty(trim($id))) {
            $data = Usuario::find($id);
        } else {
            $data = Usuario::all();
        }

        return response()->json($data);
    }

    public function post(ServerRequestInterface $request)
    {

        $parsedBody = $request->getParsedBody();
        $usuario = new Usuario();

        // $usuario->usuario_id = 1;
        $usuario->descricao = $parsedBody['descricao'];

        $usuario->save();

        return response()->json($usuario);
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $validator = Validator::make($request->getParsedBody(), [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 400);
        }

        $parsedBody = $request->getParsedBody();
        $usuario = Usuario::find($id);
        $usuario->update([
            "descricao" => $parsedBody['descricao']
        ]);

        return response()->json($usuario);
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        try
        {
            $usuario = Usuario::findOrFail($id);
            $usuario->delete();
            return response()->json();
        }
        catch(Exception $e)
        {
            return response()->json(["message" => $e->getMessage()], 404);
        }
    }
}