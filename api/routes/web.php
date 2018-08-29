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

$router->get('/usuario[/{id}]', 'UsuarioController@get');
$router->post('/usuario', 'UsuarioController@post');
$router->patch('/usuario/{id}', 'UsuarioController@patch');
$router->delete('/usuario/{id}', 'UsuarioController@delete');
