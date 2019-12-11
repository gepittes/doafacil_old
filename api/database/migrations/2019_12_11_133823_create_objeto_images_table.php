<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateObjetoImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app.objeto_images', function (Blueprint $table) {
            $table->increments('id');
//            $table->unsignedBigInteger('image_id');
//            $table->foreign('image_id')->references('id')->on('app.image');
//            $table->unsignedBigInteger('ponto_id');
//            $table->foreign('ponto_id')->references('id')->on('app.ponto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('app.objeto_images');
    }
}
