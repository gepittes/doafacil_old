<?php

namespace App\Models;

use DB;
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

    public static function buscarInstuicaoById($id)
    {
        return DB::table('app.instituicao as inst')
            ->where('inst.id', '=', $id)
            ->get();
    }

    public static function storeInsti($dados)
    {
        $inst = new Instituicao();
        $inst->fk_usuario_id = $dados['fk_usuario_id'];
        $inst->nome = $dados['nome'];
        $inst->telefone = $dados['telefone'];
        $inst->uf = $dados['uf'];
        $inst->localidade = $dados['localidade'];
        $inst->hora_open = $dados['hora_open'];
        $inst->hora_close = $dados['hora_close'];
        $inst->save();

        return $inst;
    }

    public static function buscarInstisUser($user_id)
    {
        return DB::table('app.instituicao as inst')
            ->where('fk_usuario_id', '=', $user_id)
            ->get();

    }
}
