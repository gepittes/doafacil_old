<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller as BaseController;

class AutenticacaoController extends BaseController
{
    /**
     * @var \Illuminate\Http\Request
     */
    private $request;

    private $emissorToken = "lumen-jwt";
    private $assuntoToken;
    private $horarioEmissaoToken;
    private $tempoExpiracaoToken;

    public function __construct(\Illuminate\Http\Request $request)
    {
        $this->request = $request;
    }

    protected function criarJWT(Usuario $usuario)
    {
        $this->assuntoToken = $usuario->usuario_id;
        $this->horarioEmissaoToken = time();
        $this->tempoExpiracaoToken = $this->horarioEmissaoToken + 60 * 60;

        $payload = [
            'iss' => $this->emissorToken,
            'sub' => $this->assuntoToken,
            'iat' => $this->horarioEmissaoToken,
            'exp' => $this->tempoExpiracaoToken
        ];

        if (!env('JWT_SECRET')) {
            throw new \Exception('Vari&aacute;vel de ambiente `JWT_SECRET` n&atilde;o definida.');
        }

        return JWT::encode($payload, env('JWT_SECRET'));
    }

    private function validarHash($hashEnviado, $hashOriginal)
    {
        return Hash::check($hashEnviado, $hashOriginal);
    }

    public function autenticar(Usuario $usuario)
    {
        $this->validate($this->request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $usuario = Usuario::where('email', $this->request->input('email'))->first();
        if (!$usuario) {
            throw new JsonResponseExceptionHandler('Email inexistente.');
        }

        if (!$this->validarHash($this->request->input('password'), $usuario->password)) {
            throw new JsonResponseExceptionHandler('Email ou senha incorretos.');
        }

        return response()->json([
            'token' => $this->criarJWT($usuario)
        ], 200);
    }

}
