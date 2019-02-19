<?php

use Illuminate\Database\Seeder;

class MensagemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.mensagem')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            factory(App\Models\Mensagem::class, 20)->create();
        }
    }
}
