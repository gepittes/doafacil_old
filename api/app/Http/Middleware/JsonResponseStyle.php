<?php

namespace App\Http\Middleware;

use Closure;

class JsonResponseStyle
{

    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {
        try {
            $response = $next($request);
            $responseData = [
                'apiVersion' => API_VERSION,
                'data' => [],
                'error' => []
            ];

            if (!defined('API_VERSION')) {
                $responseData['error'] = "Constante API_VERSION não está definida.";
            }
            /**
             * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
             */
            $statusCode = 400;
            if (!$response->exception) {
                $dados = json_decode($response->getContent(), true);

                $responseData['data'] = $dados;
                $statusCode = 200;
            } else {
                $responseData['error'] = $response->exception->getMessage();
            }

            $content = json_encode($responseData);

            return $response->setContent($content)->setStatusCode($statusCode);
        } catch (\Exception $objException) {
            die($objException->getMessage());
        }
    }

}
