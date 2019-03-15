<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {
            abort(403, 'Acesso negado.');
        }

        // antes do middleware
        $response = $next($request);
        // depois do middleware

        return $response;
    }
}
