<?php

namespace App\Services;

use App\Models\Notificacao as ModeloNotificacao;
use Validator;

class Notificacao implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloNotificacao::findOrFail($id);
        } else {
            $data = ModeloNotificacao::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloNotificacao
    {
        $validator = Validator::make($dados, [
            "is_notificacao_lida" => 'required|bool',
            "destinatario_id" => 'required|int',
            "tipo_notificacao_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        return ModeloNotificacao::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "is_notificacao_lida" => 'required|bool',
            "destinatario_id" => 'required|int',
            "tipo_notificacao_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
        $dados['data_envio'] = ModeloNotificacao::now();

        if(isset($dados['notificacao_id'])) {
            unset($dados['notificacao_id']);
        }

        return ModeloNotificacao::where('notificacao_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        $notificacao = ModeloNotificacao::findOrFail($id);
        return $notificacao->delete();
    }

    public function habilitar()
    {

    }
}