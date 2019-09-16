<?php

namespace App\Services\Instituicao;

use App\Models\Instituicao;

class InstituicaoServices
{
    public function obter($id = null, $nameFk = null)
    {
        $data = Instituicao::all();

        try {
            if (!empty(trim($id))) {
                $data =  Instituicao::where('id','=',$id)->get();
            }

            if (!empty(trim($nameFk))) {
                $data =  Instituicao::where($nameFk,'=',$id)->get();
            }

            return $data;
        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    public function criar(array $dados = [])
    {
        try {

            return Instituicao::create($dados);

        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    public function alterar($id, array $dados = [])
    {
        try {

            $ponto = Instituicao::where('id', $id)->update($dados);

            return $ponto ;

        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    public function remover($id)
    {
        return  Instituicao::findOrFail($id)->delete();
    }

}