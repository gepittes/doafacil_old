<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'destinatario_id',
        'tipo_notificacao_id',
        'data_envio',
        'is_notificacao_lida'
    ];
    protected $primaryKey = "notificacao_id";
    protected $table = 'notificacao.notificacao';

    public function tiposNotificacao()
    {
        return $this->hasMany(
            'App\Models\TipoNotificacao'
        );
    }
}