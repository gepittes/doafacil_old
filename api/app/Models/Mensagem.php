<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensagem extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'titulo',
        'descricao',
        'sistema_id',
        'autor_id',
        'is_ativo'
    ];
    protected $primaryKey = "mensagem_id";
    protected $table = 'notificacao.mensagem';

    public function plataformas()
    {
        return $this->belongsToMany(
            \App\Models\Plataforma::class,
            'notificacao.mensagem_has_plataforma',
            'mensagem_id',
            'plataforma_id'
        )->as('mensagem_has_plataforma');
    }

    public function delete()
    {
        $this->plataformas()->delete();

        return parent::delete();
    }

}
