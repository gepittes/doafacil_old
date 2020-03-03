<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\Usuario as ModeloUsuario;
use Illuminate\Support\Facades\Hash;
use Ratchet\Wamp\Exception;
use Validator;

class Conta implements IService
{

    public function obter($id = null)
    {
        $modelUsuario = ModeloUsuario::select(
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

            if (!isset($dados['is_admin'])) {
                $dados['is_admin'] = false;
            }

            $dados['password'] = password_hash($dados['password'], PASSWORD_BCRYPT);
            $modeloUsuario = ModeloUsuario::create($dados);

            return $this->obter($modeloUsuario->usuario_id);
        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    public function alterar(int $id, array $dados = [])
    {
        if (isset($dados['password'])) {
            $validator = Validator::make($dados, [
                "password" => 'required|string|min:3|max:50',
                "passwordNova" => 'required|string|min:3|max:50'
            ]);

            $hashedPassword = ModeloUsuario::find($id)->password;
            if (Hash::check($dados['password'], $hashedPassword) && !empty($dados['passwordNova'])) {
                $dados['password'] = password_hash($dados['passwordNova'], PASSWORD_BCRYPT);
                unset($dados['passwordNova']);

            } else {
                throw new \Exception('Você digitou alguma coisa errada tente novamente!');
            }

        }
        if (!isset($dados['password'])) {
            $validator = Validator::make($dados, [
                "nome" => 'required|string|min:3|max:50',
                "email" => 'required|string|min:3|max:50'
            ]);
        }

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
        if (isset($dados['usuario_id'])) {
            unset($dados['usuario_id']);
        }
        ModeloUsuario::where('usuario_id', $id)->update($dados);

        return $this->obter($id);
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


    public function remover($id)
    {
        $usuario = ModeloUsuario::findOrFail($id);
        return $usuario->delete();
    }

    public function autenticar(\Illuminate\Http\Request $request): ModeloUsuario
    {
        $email = $request->input('email');
        if (empty($email)) {
            throw new \Exception('Item `email` não informado.');
        }

        $senha = $request->input('password');
        if (empty($senha)) {
            throw new \Exception('Item `password` não informado.');
        }

        $usuarioAtivo = ModeloUsuario::where(
            'email',
            $email
        )->where('is_ativo', true)->first();
        if (!$usuarioAtivo) {
            throw new \Exception('Usuario inativo.');
        }

        $senhaBanco = $usuarioAtivo->password;

        if (!$this->validarSenha($senha, $senhaBanco)) {
            throw new \Exception('Email ou senha incorretos.');
        }

        return $usuarioAtivo;
    }

    private function validarSenha(string $senha, string $senhaBanco)
    {
        return password_verify($senha, $senhaBanco);
    }

    public static function setImage($id, $image)
    {
        $usuario = Usuario::find($id);
        $usuario->image = $image;
        $usuario->update();

        return $usuario;
    }
}
