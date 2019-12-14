<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateObjetoImagesTable extends Migration
{
    public function up()
    {
        Schema::create('app.objeto_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('image_id');
            $table->foreign('image_id')
                ->references('id')->on('app.image')->onDelete('cascade');;
            $table->unsignedBigInteger('ponto_id')->nullable();
            $table->foreign('ponto_id')
                ->references('id')->on('app.ponto_de_doacoes')->onDelete('cascade');
            $table->unsignedBigInteger('instituicao_id')->nullable();
            $table->foreign('instituicao_id')->references('id')->on('app.instituicao')->onDelete('cascade');
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')
                ->references('usuario_id')->on('app.usuario')->onDelete('cascade');
            $table->unsignedBigInteger('evento_id')->nullable();
            $table->foreign('evento_id')
                ->references('id')->on('app.eventos')->onDelete('cascade');
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
