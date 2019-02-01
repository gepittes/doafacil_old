<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Firebase\JWT\JWT;
use Laravel\Lumen\Routing\Controller;
use Ratchet\Wamp\Exception;

class AutenticacaoController extends Controller
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
            'user' => [
                'user_id' => $usuario->usuario_id,
                'name' => $usuario->nome,
                'email' => $usuario->email,
                'sistemas' => $usuario->sistemas,
            ],
            'iat' => $this->horarioEmissaoToken,
            'exp' => $this->tempoExpiracaoToken
        ];

        if (!env('JWT_SECRET')) {
            throw new \Exception('Vari&aacute;vel de ambiente `JWT_SECRET` n&atilde;o definida.');
        }

        return JWT::encode($payload, env('JWT_SECRET'));
    }

    private function validarHash($senha, $senhaBanco)
    {
        return password_verify($senha, $senhaBanco);
    }

    public function autenticar(Usuario $usuario)
    {
        try {

//            $validator = $this->validate($this->request, [
//                'email' => 'required|email',
//                'password' => 'required'
//            ]);
//            if ($validator->fails()) {
//                throw new \Exception($validator->errors()->first());
//            }

            $usuarioEmail = Usuario::where('email', $this->request->input('email'))->first();
            if (!$usuarioEmail) {
                throw new \Exception('Email inexistente.');
            }

            $usuarioAtivo = Usuario::where('email', $this->request->input('email'))->where('is_ativo', true)->first();
            if (!$usuarioAtivo) {
                throw new \Exception('Usuario inativo.');
            }

            $senha = $this->request->input('password');
            $senhaBanco = $usuarioAtivo->password;

            if (!$this->validarHash($senha, $senhaBanco)) {
                throw new \Exception('Email ou senha incorretos.');
            }

            return response()->json([
                'token' => $this->criarJWT($usuarioAtivo)
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $objThrowValidationException) {
            throw new \Exception($objThrowValidationException->getMessage());
        } catch (\Exception $objException) {
            throw $objException;
        }
    }

}
