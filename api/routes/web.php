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

    $router->group(['namespace' => 'Instituicao'], function () use ($router){
        $router->get('/instituicao', 'InstituicaoController@get');
        $router->get('/instituicao/{id}', 'InstituicaoController@get');
        $router->get('/instituicao/user/buscar/{id}', 'InstituicaoController@getInstisUser');
        $router->post('/instituicao', 'InstituicaoController@post');
        $router->patch('/instituicao/{id}', 'InstituicaoController@patch');
        $router->delete('/instituicao/{id}', 'InstituicaoController@delete');
    });

    $router->group(['namespace' => 'Evento'], function () use ($router){
        $router->get('/evento/inistituicao/{id}', 'EventoController@getEventosByInsti');
        $router->get('/evento', 'EventoController@get');
        $router->post('/evento', 'EventoController@post');
        $router->patch('/evento/{id}', 'EventoController@patch');
        $router->delete('/evento/{id}', 'EventoController@delete');
    });

    $router->group(['namespace' => 'Ponto'], function () use ($router){
        $router->get('/pontoByInst/{id}', 'PontoController@getPontoByInst');
        $router->get('/ponto', 'PontoController@get');
        $router->post('/ponto', 'PontoController@post');
        $router->patch('/ponto/{id}', 'PontoController@patch');
        $router->delete('/ponto/{id}', 'PontoController@delete');
    });

    $router->group(['namespace' => 'Conta'], function () use ($router){
        $router->post('/conta', 'ContaController@post');
        $router->get('/conta[/{id}]', 'ContaController@get');
        $router->patch('/conta[/{id}]', 'ContaController@patch');
        $router->delete('/conta[/{id}]', 'ContaController@delete');
    });

    /* Desativar jwt por enquanto
    $router->group(['middleware' => 'jwt.auth'], function () use ($router) {
        $router->delete(
            '/conta/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'ContaController@delete'
            ]
        );
    });
    */
});
