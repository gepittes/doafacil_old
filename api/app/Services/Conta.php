<?php

namespace App\Services;

use App\Models\Usuario as ModeloUsuario;
use Validator;

class Conta implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloUsuario::findOrFail($id);
        } else {
            $data = ModeloUsuario::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloUsuario
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        /**
         * @var $usuarioExistente \Illuminate\Database\Eloquent\Collection
         */
        $usuarioExistente = ModeloUsuario::where('descricao', $dados['descricao'])->get();
        if(count($usuarioExistente->toArray()) > 0 ) {
            throw new \Exception("Usu&aacute;rio existente");
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        return ModeloUsuario::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }
        if(isset($dados['usuario_id'])) {
            unset($dados['usuario_id']);
        }

        return ModeloUsuario::where('usuario_id', $id)->update($dados);
    }

    public function recuperarSenha()
    {

    }

    public function desabilitar($id)
    {
        $this->alterar($id, [

        ]);
//        return
    }

    public function habilitar()
    {

    }
}