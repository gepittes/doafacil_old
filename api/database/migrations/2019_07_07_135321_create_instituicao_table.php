<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInstituicaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app.instituicao', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome');
            $table->string('telefone');
            $table->string('localidade');
            $table->string('uf');
            $table->string('hora_open', null);
            $table->string('hora_close',null);
            $table->unsignedBigInteger('fk_usuario_id');
            $table->foreign('fk_usuario_id')
                ->references('usuario_id')->on('app.usuario');
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
        Schema::dropIfExists('app.instituicao');
    }
}
