<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsuarioSistemaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.usuario_has_sistema', function(Blueprint $table) {
            $table->integer('usuario_id');
            $table->integer('sistema_id');
        });

        Schema::table('notificacao.usuario_has_sistema', function (Blueprint $table) {
            $table->foreign('usuario_id')->references('usuario_id')->on('notificacao.usuario');
        });

        Schema::table('notificacao.usuario_has_sistema', function (Blueprint $table) {
            $table->foreign('sistema_id')->references('sistema_id')->on('notificacao.sistema');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacao.usuario_has_sistema');
    }
}
/*
 *
create table usuario_has_sistema
(
  usuario_id integer not null
    constraint notificacao_usuario_has_sistema_usuario_id_foreign
    references usuario,
  sistema_id integer not null
    constraint notificacao_usuario_has_sistema_sistema_id_foreign
    references sistema
)
;

 */
