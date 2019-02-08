<?php

use Illuminate\Database\Seeder;

class SistemaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.sistema')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            factory(App\Models\Sistema::class, 5)->create();
        }
    }
}
