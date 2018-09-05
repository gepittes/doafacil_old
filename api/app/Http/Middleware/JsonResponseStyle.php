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
            'data' => [],
            'error' => []
        ];

        if (!defined('API_VERSION')) {
            $responseData['error'] = "Constante API_VERSION n&atilde;o definida.";
        }

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        if (empty(trim($response->exception))) {
            $dados = json_decode($response->getContent(), true);
            if(is_array($dados)) {
                $dados = $this->converterUTF8($dados);
            }
            $responseData['data'] = $dados;
            $statusCode = '200';
        } else {
            $responseData['error'] = $response->exception->getMessage();
            $statusCode = '400';
        }

        $content = json_encode($responseData);

        return $response->setContent($content)->setStatusCode($statusCode);
    }

    private function converterUTF8(array $dados)
    {
        array_walk($dados, function ($value, $key) use (&$dados) {
            if(is_array($value)) {
                $value = $this->converterUTF8($value);
            } else {
                $dados[$key] = utf8_encode($value);
            }
        });

        return $dados;
    }

}
