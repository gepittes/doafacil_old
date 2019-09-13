<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'app.eventos';

    protected $fillable = ['nome', 'descricao', 'data', 'hora'];


    public static function storeEvento($request)
    {
        $evento = new Evento();
        $evento->nome = $request['nome'];
        $evento->descricao = $request['descricao'];
        $evento->data = $request['data'];
        $evento->hora = $request['hora'];
        $evento->fk_insti_id = $request['fk_insti_id'];
        $evento->save();

        return $evento;
    }

    public static function getEventosByInsti($id)
    {



    }


}
