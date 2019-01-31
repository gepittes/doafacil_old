<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SistemaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.sistema', function (Blueprint $table) {
            $table->increments('sistema_id');
            $table->string('descricao');
            $table->string('url');
            $table->boolean('is_ativo');
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
        Schema::dropIfExists('notificacao.sistema');
    }
}

/**
 * alter table sistema add url varchar(255);
 */
