<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instituicao extends Model
{

    protected $fillable = [
        'nome',
        'telefone',
        'hora_open',
        'hora_close',
        'localidade',
        'uf',
    ];

    protected $table = 'app.instituicao';
}
