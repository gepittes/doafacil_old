<?php

namespace App\Services;

use App\Models\Sistema as ModeloSistema;
use Validator;

class Sistema implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloSistema::findOrFail($id);
        } else {
            $data = ModeloSistema::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloSistema
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

        return ModeloSistema::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
        if(isset($dados['sistema_id'])) {
            unset($dados['sistema_id']);
        }

        return ModeloSistema::where('sistema_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        $usuario = ModeloSistema::findOrFail($id);
        return $usuario->delete();
    }

    public function habilitar()
    {

    }
}