<?php

namespace App\Http\Middleware;

use Closure;

class JsonResponseStyle
{

    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {
        $response = $next($request);

        $responseData = [
            'apiVersion' => API_VERSION,
            'data' => null,
            'error' => null
        ];

        if (!defined('API_VERSION')) {
            $responseData['error'] = "Constante API_VERSION n&atilde;o definida.";
        }

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $responseData['error'] = $response->exception;
        $statusCode = '400';
        if (empty(trim($response->exception))) {
            $responseData['data'] = $response->getContent();
            $statusCode = '200';
        }

        array_walk($responseData, function ($value, $key) use (&$responseData) {
            $responseData[$key] = utf8_encode($value);
        });
        $content = json_encode($responseData);

        return $response->setContent($content)->setStatusCode($statusCode);
    }

}
