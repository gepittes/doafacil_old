<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePontoDeDoacaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app.ponto_de_doacoes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome');
            $table->string('descricao');
            $table->string('hora_open')->nullable();
            $table->string('hora_close')->nullable();
            $table->unsignedbigInteger('instituicao_id')
                ->references('id')
                ->on('app.instituicao')
                ->onDelete('cascade');
            $table->string('img')->nullable();
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
        Schema::dropIfExists('app.ponto_de_doacoes');
    }
}
