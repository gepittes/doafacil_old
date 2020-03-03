<?php


namespace App\Services\Evento;


use App\Models\Evento;

class EventoServices
{

    public static function setImage($id, $image)
    {
        $evento = Evento::find($id);
        $evento->image =  $image;
        $evento->update();

        return $evento;
    }
}