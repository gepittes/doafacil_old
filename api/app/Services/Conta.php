<?php

namespace App\Services;

use App\Models\Usuario;

class Conta implements IService
{

    public function criar(array $dados = []) : \Usuario
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->all());
        }

        return Usuario::create($dados);
    }

    public function alterar()
    {

    }

    public function recuperarSenha()
    {

    }

    public function desabilitar()
    {

    }

    public function ativar()
    {

    }
}