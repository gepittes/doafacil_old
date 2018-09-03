<?php

namespace App\Services;

use App\Models\TipoNotificacao as ModeloTipoNotificacao;
use Validator;

class TipoNotificacao implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloTipoNotificacao::findOrFail($id);
        } else {
            $data = ModeloTipoNotificacao::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloTipoNotificacao
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50',
            "mensagem" => 'required|string|min:3|max:9999',
            "sistema_id" => 'required|int',
            "autor_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        return ModeloTipoNotificacao::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50',
            "mensagem" => 'required|string|min:3|max:9999',
            "sistema_id" => 'required|int',
            "autor_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if(isset($dados['tipo_notificacao_id'])) {
            unset($dados['tipo_notificacao_id']);
        }

        return ModeloTipoNotificacao::where('tipo_notificacao_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        $tipoNotificacao = ModeloTipoNotificacao::findOrFail($id);
        return $tipoNotificacao->delete();
    }

    public function habilitar()
    {

    }
}