<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MensagemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.mensagem', function (Blueprint $table) {
            $table->increments('mensagem_id');
            $table->string('titulo');
            $table->text('descricao');
            $table->integer('sistema_id');
            $table->integer('autor_id');
            $table->boolean('is_ativo');
            $table->timestamps();
        });

        Schema::table('notificacao.mensagem', function (Blueprint $table) {
            $table->foreign('sistema_id')
                ->references('sistema_id')
                ->on('notificacao.sistema');
            $table->foreign('autor_id')
                ->references('usuario_id')
                ->on('notificacao.usuario');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacao.mensagem');
    }
}
