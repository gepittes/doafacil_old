<?php

namespace App\Services;

use App\Models\Usuario as ModeloUsuario;
use Validator;

class Conta implements IService
{

    public function obter($id = null)
    {
        $modelUsuario = ModeloUsuario::with('sistemas')->select(
            'usuario_id',
            'nome',
            'email',
            'is_ativo',
            'is_admin'
        );
        //ModeloMensagem::with('plataformas')->get();
        if (!empty(trim($id))) {
            $data = $modelUsuario->where('usuario_id', $id)->get();
        } else {
            $data = $modelUsuario->get();
//            $data = ModeloUsuario::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloUsuario
    {
        $validator = Validator::make($dados, [
            "nome" => 'required|string|min:3|max:50',
            "email" => 'required|string|min:3|max:50',
            "password" => 'required|string|min:3|max:50',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        /**
         * @var $usuarioExistente \Illuminate\Database\Eloquent\Collection
         */
        $usuarioExistente = ModeloUsuario::where('email', $dados['email'])->get();
        if (count($usuarioExistente->toArray()) > 0) {
            throw new \Exception("Usu&aacute;rio existente");
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        $dados['password'] = password_hash($dados['password'], PASSWORD_BCRYPT);

        return ModeloUsuario::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "nome" => 'required|string|min:3|max:50',
            "email" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
        if (isset($dados['usuario_id'])) {
            unset($dados['usuario_id']);
        }
        unset($dados['sistemas']);
        return ModeloUsuario::where('usuario_id', $id)->update($dados);
    }

    public function recuperarSenha()
    {

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
}
