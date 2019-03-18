<?php

use Illuminate\Database\Seeder;

class PlataformaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.plataforma')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            $this->criaPlataforma('sistema', true, New DateTime());
        }
    }
    private function criaPlataforma($descricao, $is_ativo, $created_at) {
        DB::table('notificacao.plataforma')->insert([
            'descricao' => $descricao,
            'is_ativo' => $is_ativo,
            'created_at' => $created_at
        ]);
    }
}
