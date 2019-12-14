<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'app.image';

    protected $fillable = ['path'];

    public $timestamps = false;
}
