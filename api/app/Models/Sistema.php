<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sistema extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'descricao',
        'is_ativo'
    ];
    protected $primaryKey = "sistema_id";
    protected $table = 'notificacao.sistema';
}