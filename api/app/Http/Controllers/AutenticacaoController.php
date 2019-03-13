<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use Illuminate\Validation\ValidationException;

class AutenticacaoController extends Controller
{
    /**
     * @var \Illuminate\Http\Request
     */
    private $request;

    public function __construct(\Illuminate\Http\Request $request)
    {
        $this->request = $request;
    }

    public function post(ServerRequestInterface $request)
    {
        try {
            $conta = new \App\Services\Conta();
            $usuario = $conta->autenticar($request);
            $jwt = new \App\Services\JWT();

            /**
             * @var \Illuminate\Http\Response $response
             */
            $response = response();
            return $response->json($jwt->criarToken($usuario), 200);
        } catch (ValidationException $objThrowValidationException) {
            throw new \Exception($objThrowValidationException->getMessage());
        } catch (\Exception $objException) {
            throw $objException;
        }
    }


}
