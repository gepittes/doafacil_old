<?php

namespace App\Services;

use App\Models\Usuario as ModeloUsuario;
use Ratchet\Wamp\Exception;
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
            $data = $modelUsuario->where('usuario_id', $id)->findOrFail($id);
        } else {
            $data = $modelUsuario->get();
        }

        return $data;
    }

    public function criar(array $dados = [])
    {
        try {
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
                throw new \Exception("E-mail já cadastrado.");
            }

            $dados = array_merge($dados, [
                'is_ativo' => true
            ]);

            if(!isset($dados['is_admin'])) {
                $dados['is_admin'] = false;
            }

            $dados['password'] = password_hash($dados['password'], PASSWORD_BCRYPT);
            $modeloUsuario = ModeloUsuario::create($dados);

            if(isset($dados['sistemas']) && count($dados['sistemas']) > 0) {
                $this->vincularSistema($modeloUsuario->usuario_id, $dados['sistemas']);
            }

            return $this->obter($modeloUsuario->usuario_id);
        } catch (\Exception $exception) {
            throw $exception;
        }
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
        if (isset($dados['password']) && !empty($dados['password'])) {
            $dados['password'] = password_hash($dados['password'], PASSWORD_BCRYPT);
        } else {
            unset($dados['password']);
        }

        $sistemas = $dados['sistemas'];

        $this->desvincularSistemaUsuario($id);
        $this->vincularSistema($id, $sistemas);
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

    public function vincularSistema($usuario_id, array $sistemas)
    {
        if (count($sistemas) > 0) {
            $usuario = ModeloUsuario::findOrFail($usuario_id);
            foreach ($sistemas as $sistema) {
                $usuario->sistemas()->attach($sistema['sistema_id']);
            }
        }
    }

    public function desvincularSistemaUsuario($usuario_id)
    {
        $usuario = ModeloUsuario::find($usuario_id);
        
        if($usuario) {
            return $usuario->sistemas()->detach();
        }
    }
}
