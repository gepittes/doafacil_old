<?php

namespace App\Http\Controllers\Evento;

use App\Models\Evento;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Laravel\Lumen\Routing\Controller;
use Psr\Http\Message\ServerRequestInterface;

class EventoController extends Controller
{
    public function post(ServerRequestInterface $request)
    {
        $request = $request->getParsedBody();

        $evento = Evento::storeEvento($request);
        return response()->json($evento, 200);
    }

    public function get()
    {

    }

    public function getEventosByInsti($id)
    {
        $eventos = Evento::getEventosByInsti($id);
        return response()->json($eventos, 200);
    }

    public function patch($id)
    {

    }

    public function delete($id)
    {

    }


}
