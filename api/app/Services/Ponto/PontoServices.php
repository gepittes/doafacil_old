<?php

namespace App\Services\Ponto;

use App\Models\Objeto_Image;
use App\Models\PontoDeDoacao;


class PontoServices
{
    public function obter($id = null, $nameFk = null)
    {
        $data = PontoDeDoacao::all();

        if (!empty(trim($nameFk))) {
            $data = PontoDeDoacao::where($nameFk, '=', $id)->get();
        }
        return $data;
    }

    public function criar($dados)
    {
        try {
            return PontoDeDoacao::create($dados);

        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    public function alterar($id, $dados)
    {

        unset($dados['image']);
        $ponto = PontoDeDoacao::where('id', $id)->update($dados);

        return $ponto;
    }

    public function remover($id)
    {
        return PontoDeDoacao::findOrFail($id)->delete();
    }

    public static function setImage($id, $image)
    {
        $ponto = PontoDeDoacao::find($id);
        $ponto->image =  $image;
        $ponto->update();

       return $ponto;
    }


}
