<?php

namespace App\Services\Image;

use App\Models\Image;
use App\Models\PontoDeDoacao;
use App\Services\ObjetoImage\ObjetoImageService;
use App\Services\Ponto\PontoServices;

class ImageServices
{
    public static function setImage($dados)
    {
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

        if($dados['objectName'] === "ponto") {
          return  PontoServices::setImage($dados['objectId'], $image['path'] );
        }

        return $image->id;
    }
}
