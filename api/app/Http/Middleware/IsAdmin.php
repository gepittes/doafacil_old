<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json([
                'error' => 'Acesso negado.'
            ], 403);
        }

        if(!$request->auth) {
            return response()->json([
                'error' => 'Usuário não autenticado.'
            ], 401);
        }
        $dadosUsuario = $request->user();
        if(intval($dadosUsuario['is_admin']) === 0) {
            return response()->json([
                'error' => 'Usuário sem privilégios Administrativos.'
            ], 401);
        }

        // antes do middleware
        $response = $next($request);
        // depois do middleware

        return $response;
    }
}
