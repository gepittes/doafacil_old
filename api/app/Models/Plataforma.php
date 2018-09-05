<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plataforma extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'descricao',
        'is_ativo'
    ];
    protected $primaryKey = "plataforma_id";
    protected $table = 'notificacao.plataforma';

    public function tiposNotificacao()
    {
        return $this->belongsToMany(
            App\Models\TipoNotificacao::class,
            'notificacao.tipo_notificacao_has_plataforma',
            'plataforma_id',
            'tipo_notificacao_id'
        );
    }
}