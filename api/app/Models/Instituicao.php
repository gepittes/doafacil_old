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
}
