<?php

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

define('API_VERSION', '1.0');
$apiPattern = 'v1';
$router->group(['prefix' => $apiPattern], function () use ($router) {

    $router->post('/autenticacao/login', 'AutenticacaoController@post');
    $router->post('/conta', 'ContaController@post');

    $router->get('/ponto', 'PontoDeDoacaoController@get');
    $router->post('/ponto', 'PontoDeDoacaoController@post');
    $router->patch('/ponto/{id}', 'PontoDeDoacaoController@patch');
    $router->delete('/ponto/{id}', 'PontoDeDoacaoController@delete');

    $router->get('/instituicao', 'InstituicaoController@get');
    $router->get('/instituicao/buscar/{id}', 'InstituicaoController@buscarInsti');
    $router->get('/instituicao/user/buscar/{id}', 'InstituicaoController@getInstisUser');
    $router->post('/instituicao', 'InstituicaoController@post');
    $router->patch('/instituicao/{id}', 'InstituicaoController@patch');
    $router->get('/instituicao/{id}', 'InstituicaoController@show');
    $router->delete('/instituicao/{id}', 'InstituicaoController@delete');

    $router->group(['namespace' => 'Evento'], function () use ($router){
        $router->get('/evento/inistituicao/{id}', 'EventoController@getEventosByInsti');
        $router->get('/evento', 'EventoController@get');
        $router->post('/evento', 'EventoController@post');
        $router->patch('/evento/{id}', 'EventoController@patch');
        $router->delete('/evento/{id}', 'EventoController@delete');
    });


    $router->group(['middleware' => 'jwt.auth'], function () use ($router) {
        $router->get('/conta[/{id}]', 'ContaController@get');
        $router->patch(
            '/conta/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'ContaController@patch'
            ]
        );
        $router->delete(
            '/conta/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'ContaController@delete'
            ]
        );
    });
});
