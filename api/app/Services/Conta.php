<?php

namespace App\Services;

use App\Models\Usuario;
use Validator;

class Conta implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = Usuario::findOrFail($id);
        } else {
            $data = Usuario::all();
        }

        return $data;
    }

    public function criar(array $dados = []) : Usuario
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return Usuario::create($dados);
    }

    public function alterar($id, $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return Usuario::where('usuario_id', $id)->update($dados);
    }

    public function recuperarSenha()
    {

    }

    public function desabilitar($id)
    {
        $usuario = Usuario::findOrFail($id);
        return $usuario->delete();
    }

    public function habilitar()
    {

    }
}