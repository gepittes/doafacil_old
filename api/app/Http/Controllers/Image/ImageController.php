<?php

namespace App\Http\Controllers\Image;

use App\Services\Image\ImageServices;
use Laravel\Lumen\Routing\Controller;
use Psr\Http\Message\ServerRequestInterface;

class ImageController extends Controller
{
    public function post(ServerRequestInterface $request)
    {
        $dados = $request->getParsedBody();
        return response()->json(ImageServices::setImage($dados));
    }
}
