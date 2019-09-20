<?php

namespace App\Services\Ponto;

use App\Models\PontoDeDoacao;
use App\Services\Image\ImageServices;

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
        if ($dados->img) {
            ImageServices::setImage($dados, $dados->img);
        } else {
            $this->alterarImage($id, ImageServices::setImage($dados));
        }

        unset($dados['image']);;
        $ponto = PontoDeDoacao::where('id', $id)->update($dados);

        return $ponto;
    }

    public function remover($id)
    {
        return PontoDeDoacao::findOrFail($id)->delete();
    }

    public function alterarImage($id, $img_id)
    {
        PontoDeDoacao::findOrFail($id)->update([
            'img' => $img_id
        ]);
    }


}