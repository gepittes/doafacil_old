<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageLink extends Model
{
    protected $table = 'app.image_links';

    protected $fillable = ['path'];

}
