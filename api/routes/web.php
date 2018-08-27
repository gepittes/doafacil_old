<?php

use Illuminate\Http\Response;

$router->get('/', function () use ($router) {
    return redirect()->route('api');
});

$router->get('/api', ['as' => 'api', function () use ($router) {
    return response()->json(
        [
            'name' => 'Abigail', 
            'state' => 'CA'
        ]
    );
}]);

$router->get('/user[/{id}]', 'UsuarioController@get');