<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instituicao extends Model
{
//    protected $table = ['instituicoes'];

    protected $fillable = [
        'nome',
        'telefone',
        'banner',
        'horario',
        'localidade',
        'uf',
    ];

    protected $table = 'app.instituicao';
}
