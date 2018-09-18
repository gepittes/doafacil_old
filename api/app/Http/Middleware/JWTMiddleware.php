<?php

namespace App\Http\Middleware;

use App\Models\Usuario;
use Firebase\JWT\JWT;
use Closure;
use Exception;
use Firebase\JWT\ExpiredException;

class JWTMiddleware
{
    public function handle($request, Closure $next, $guard = null)
    {
        $token = $request->get('token');
        if(!$token) {
            return response()->json([
                'error' => 'Token n&atilde;o recebida.'
            ], 401);
        }

        if (!env('JWT_SECRET')) {
            return response()->json([
                'error' => 'Vari&aacute;vel de ambiente `JWT_SECRET` n&atilde;o definida.'
            ], 401);
        }

        try {
            $credentials = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        } catch(ExpiredException $e) {
            return response()->json([
                'error' => 'Token informada expirou.'
            ], 400);
        } catch(Exception $e) {
            return response()->json([
                'error' => 'Ocorreu um erro ao decodificar a Token.'
            ], 400);
        }

        $usuario = Usuario::find($credentials->sub);
        $request->auth = $usuario;
        return $next($request);
    }
}
