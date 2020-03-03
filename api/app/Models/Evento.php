<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'app.eventos';

    protected $fillable = ['nome', 'descricao', 'data', 'hora','longitude', 'latitude', 'image'];

    public static function storeEvento($request)
    {
        $evento = new Evento();
        $evento->nome = $request['nome'];
        $evento->descricao = $request['descricao'];
        $evento->data = $request['data'];
        $evento->hora = $request['hora'];
        $evento->longitude = $request['localizacao']['longitude'];
        $evento->latitude = $request['localizacao']['latitude'];
        $evento->fk_insti_id = $request['fk_insti_id'];
        $evento->save();
        return $evento;
    }

    public static function getEventosByInsti($id)
    {
        return Evento::all()->where('fk_insti_id', '=', $id);
    }

    public static function updateEvento($evento, $id)
    {
        $ev = Evento::find($id);
        $ev->nome = $evento['nome'];
        $ev->descricao = $evento['descricao'];
        $ev->data = $evento['data'];
        $ev->hora = $evento['hora'];
        $ev->longitude = $evento['localizacao']['longitude'];
        $ev->latitude = $evento['localizacao']['latitude'];
        $ev->fk_insti_id = $evento['fk_insti_id'];
        $ev->fk_insti_id = $evento['fk_insti_id'];
        $ev->save();

        return $ev;
    }


}
