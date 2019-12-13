<?php


namespace App\Services\ObjetoImage;

use App\Models\Objeto_Image;

class ObjetoImageService
{

    public static function store($dados)
    {
        return Objeto_Image::create($dados);
    }
}