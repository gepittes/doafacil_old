<?php


namespace App\Services\ObjetoImage;

use App\Models\Objeto_Image;

class ObjetoImageService
{

    public static function store($data)
    {
        return Objeto_Image::create($data);
    }

    public static function getObjectId($data)
    {
        if ($data['objectName'] === "ponto") {
            $object = 'ponto_id';
        }
        if ($data['objectName'] === "evento") {
            $object = 'evento_id';
        }
        if ($data['objectName'] === "usuario") {
            $object = 'usuario_id';
        }
        if ($data['objectName'] === "instituicao") {
            $object = 'instituicao_id';
        }

        return Objeto_Image::where($object, '=', $data['objectId'])->first();
    }
}