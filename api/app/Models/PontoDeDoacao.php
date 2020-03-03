<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PontoDeDoacao extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'hora_open',
        'hora_close',
        'instituicao_id',
        'image'
    ];

    protected $table = 'app.ponto_de_doacoes';

    public static function getPontoByInst($id)
    {
        return PontoDeDoacao::where('instituicao_id','=',$id)->get();
    }

}
