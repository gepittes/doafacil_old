<?php

use Illuminate\Http\Response;

$router->get('/', function () use ($router) {
    return response()->json(
        [
            'name' => 'Abigail', 
            'state' => 'CA'
        ]
    );
});
