<?php

namespace App\Services;

use App\Models\Conta;
use Validator;

class Plataforma implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = Conta::findOrFail($id);
        } else {
            $data = Conta::all();
        }

        return $data;
    }

    public function criar(array $dados = []) : Conta
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return Conta::create($dados);
    }

    public function alterar($id, $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return Conta::where('usuario_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        $usuario = Conta::findOrFail($id);
        return $usuario->delete();
    }

    public function habilitar()
    {

    }
}