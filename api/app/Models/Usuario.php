<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'nome',
        'email',
        'password',
        'id_admin',
        'is_ativo'
    ];
    protected $primaryKey = "usuario_id";
    protected $table = 'notificacao.usuario';
}
