<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PontoDeDoacao extends Model
{
    protected $fillable = ['nome'];

    protected $table = 'app.ponto_de_doacoes';
}
