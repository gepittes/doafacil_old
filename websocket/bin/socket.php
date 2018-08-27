<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Websocket\Notificacao;

require_once __DIR__.'/../vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Notificacao()
        )
    ),
    8001
);

$server->run();