<?php

namespace App\Http\Controllers\Evento;

use App\Models\Evento;
use Laravel\Lumen\Routing\Controller;
use Psr\Http\Message\ServerRequestInterface;

class EventoController extends Controller
{
    public function post(ServerRequestInterface $request)
    {
        try {
            $request = $request->getParsedBody();
            return response()->json(Evento::storeEvento($request));
        } catch (\Exception $e) {
            return response()->json($e, 204);
        }

    }

    public function getEventosByInsti($id)
    {
        $eventos = Evento::getEventosByInsti($id);
        return response()->json($eventos, 200);
    }

    public function patch(ServerRequestInterface $request, $id)
    {
        $request = $request->getParsedBody();

        $evento = Evento::updateEvento($request, $id);
        return response()->json($evento, 200);
    }

    public function delete(Evento $evento, $id)
    {
        Evento::destroy($id);
        return response()->json($evento, 204);
    }
}
