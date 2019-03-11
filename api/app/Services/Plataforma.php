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

        unset($dados['plataforma_id']);

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

        unset($dados['created_at']);
        $dataAtual = \Carbon\Carbon::now();
        $dados['updated_at'] = $dataAtual->toDateTimeString();

        return ModeloPlataforma::where('plataforma_id', $id)->update($dados);
    }

    public function remover($plataforma_id)
    {
        $plataforma = ModeloPlataforma::findOrFail($plataforma_id);
        return $plataforma->delete();
    }

    public function desabilitar($id)
    {
        return $this->alterar($id, [
            'is_ativo' => false
        ]);
    }

    public function habilitar($id)
    {
        return $this->alterar($id, [
            'is_ativo' => true
        ]);
    }

    public function vincularMensagem($plataforma_id, array $mensagens)
    {
        foreach ($mensagens as $mensagem) {
            $plataforma = ModeloPlataforma::findOrFail($plataforma_id);
            $plataforma->mensagens()->attach($mensagem['mensagem_id']);
        }
    }
}
