<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MensagemPlataformaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.mensagem_has_plataforma', function(Blueprint $table) {
            $table->integer('mensagem_id');
            $table->integer('plataforma_id');
        });

        Schema::table('notificacao.mensagem_has_plataforma', function (Blueprint $table) {
            $table->foreign('mensagem_id')->references('mensagem_id')->on('mensagem');
        });

        Schema::table('notificacao.mensagem_has_plataforma', function (Blueprint $table) {
            $table->foreign('plataforma_id')->references('plataforma_id')->on('plataforma');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacao.mensagem_has_plataforma');
    }
}
