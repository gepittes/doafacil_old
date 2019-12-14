<?php

namespace App\Services\Image;

use App\Models\Image;
use App\Services\Conta;
use App\Services\Evento\EventoServices;
use App\Services\Instituicao\InstituicaoServices;
use App\Services\ObjetoImage\ObjetoImageService;
use App\Services\Ponto\PontoServices;

class ImageServices
{
    public static function setImage($dados)
    {
        $hasImage = ObjetoImageService::getObjectId($dados);
        if ($hasImage) {
            self::deleteImage($hasImage->image_id);
        };
        $image_parts = explode(";base64,", $dados['image']);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_ext = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $romdon = microtime();
        $safeName = md5($romdon) . '.' . $image_ext;
        $file = storage_path('app/images/' . $safeName);
        file_put_contents($file, $image_base64);

        $image = Image::create([
            'path' => $safeName,
        ]);

        $data['image_id'] = $image->id;

        if ($dados['objectName'] === "ponto") {
            $data['ponto_id'] = $dados['objectId'];
            $object = PontoServices::setImage($dados['objectId'], $image['path']);
        }
        if ($dados['objectName'] === "evento") {
            $data['evento_id'] = $dados['objectId'];
            $object = EventoServices::setImage($dados['objectId'], $image['path']);
        }
        if ($dados['objectName'] === "usuario") {
            $data['usuario_id'] = $dados['objectId'];
            $object = Conta::setImage($dados['objectId'], $image['path']);
        }
        if ($dados['objectName'] === "instituicao") {
            $data['instituicao_id'] = $dados['objectId'];
            $object = InstituicaoServices::setImage($dados['objectId'], $image['path']);
        }
        ObjetoImageService::store($data);

        return $object;
    }

    public static function deleteImage($id)
    {
        $image = Image::find($id);
        unlink(storage_path('app/images/' . $image->path));
        $image->delete();
    }
}
