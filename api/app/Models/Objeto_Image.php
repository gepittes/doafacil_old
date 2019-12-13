<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Objeto_Image extends Model
{
   protected $fillable = [
       'image_id',
       'ponto_id',
       'usuario_id',
       'evento_id',
       'instituicao_id'
   ];
    protected $table = 'app.objeto_images';

    public function image()
    {
        return $this->belongsToMany('App\Models\Image');
    }
    public function ponto()
    {
        return $this->belongsToMany('App\Models\PontoDeDoacao');
    }
}
