<?php

namespace App\Services;

use App\Models\Mensagem as ModeloMensagem;
use Validator;

class Mensagem implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloMensagem::with('plataformas:descricao')->findOrFail($id);
        } else {
            $data = ModeloMensagem::with('plataformas')->get();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloMensagem
    {
        $validator = Validator::make($dados, [
            "titulo" => 'required|string|min:3|max:50',
            "descricao" => 'required|string|min:3|max:9999',
            "sistema_id" => 'required|int',
            "autor_id" => 'required|int',
            "plataformas" => 'required|array|min:1',
            "plataformas.*.plataforma_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        $mensagem = ModeloMensagem::create($dados);
        $this->vincularPlataforma($mensagem->mensagem_id, $dados['plataformas']);
        return $mensagem;

    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'string|min:3|max:50',
            "mensagem" => 'string|min:3|max:9999',
            "sistema_id" => 'int',
            "autor_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if (isset($dados['mensagem_id'])) {
            unset($dados['mensagem_id']);
        }

        return ModeloMensagem::where('mensagem_id', $id)->update($dados);
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

    public function vincularPlataforma($mensagem_id, array $plataformas)
    {
        foreach ($plataformas as $plataforma) {
            $mensagem = ModeloMensagem::findOrFail($mensagem_id);
            $mensagem->plataformas()->attach($plataforma['plataforma_id']);
        }
    }

}
