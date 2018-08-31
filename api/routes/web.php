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

$router->get('/conta[/{id}]', 'ContaController@get');
$router->post('/conta', 'ContaController@post');
$router->patch('/conta/{id}', 'ContaController@patch');
$router->delete('/conta/{id}', 'ContaController@delete');

$router->get('/plataforma[/{id}]', 'PlataformaController@get');
$router->post('/plataforma', 'PlataformaController@post');
$router->patch('/plataforma/{id}', 'PlataformaController@patch');
$router->delete('/plataforma/{id}', 'PlataformaController@delete');
