<?php

namespace App\Services;

use App\Models\Notificacao as ModeloNotificacao;
use Carbon\Carbon;
use Validator;
use App\Models\Usuario as ModeloUsuario;

class Notificacao implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloNotificacao::with('mensagem')->findOrFail($id);
        } else {
            $data = ModeloNotificacao::with('mensagem')->get();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloNotificacao
    {
        $validator = Validator::make($dados, [
            "codigo_destinatario" => 'required|string',
            "mensagem_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true,
            'is_notificacao_lida' => false,
            'data_envio' => Carbon::now()
        ]);

        $modeloNotificacao = ModeloNotificacao::create($dados);

        return $this->obter($modeloNotificacao->notificacao_id);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "is_notificacao_lida" => 'bool',
            "codigo_destinatario" => 'string',
            "mensagem_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if (isset($dados['notificacao_id'])) {
            unset($dados['notificacao_id']);
        }

        return ModeloNotificacao::where('notificacao_id', $id)->update($dados);
    }

    public function remover($id)
    {
        $plataforma = ModeloNotificacao::findOrFail($id);
        return $plataforma->delete();
    }

    public function obterNotificacoesSistema($dados)
    {

        $validator = Validator::make($dados, [
            "usuario_id" => 'int',
            "sistema_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $modeloUsuario = ModeloUsuario::with('sistemas')->select(
            'usuario_id',
            'nome',
            'email',
            'is_ativo',
            'is_admin'
        );
        $resultado = $modeloUsuario->where('usuario_id', $dados['usuario_id'])
            ->where('sistema_id', $dados['sistema_id'])
            ->get;

        return $resultado;
    }
}
