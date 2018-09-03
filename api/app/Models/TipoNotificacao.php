<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoNotificacao extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'descricao',
        'mensagem',
        'sistema_id',
        'autor_id',
        'is_ativo'
    ];
    protected $primaryKey = "tipo_notificacao_id";
    protected $table = 'notificacao.tipo_notificacao';

    public function plataformas()
    {
        return $this->belongsToMany(
            'App\Models\Plataforma',
            'notificacao.plataforma',
            'tipo_notificacao_id',
            'plataforma_id'
        );
    }
}