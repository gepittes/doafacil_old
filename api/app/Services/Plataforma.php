<?php

namespace App\Services;

use App\Models\Plataforma as ModeloPlataforma;
use Validator;

class Plataforma implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloPlataforma::findOrFail($id);
        } else {
            $data = ModeloPlataforma::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloPlataforma
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        return ModeloPlataforma::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return ModeloPlataforma::where('usuario_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        $usuario = ModeloPlataforma::findOrFail($id);
        return $usuario->delete();
    }

    public function habilitar()
    {

    }
}