<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'destinatario_id',
        'mensagem_id',
        'data_envio',
        'is_notificacao_lida'
    ];
    protected $primaryKey = "notificacao_id";
    protected $table = 'notificacao.notificacao';

    public function mensagens()
    {
        return $this->hasMany(
            'App\Models\Mensagem'
        );
    }
}
