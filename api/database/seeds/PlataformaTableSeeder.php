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
            factory(App\Models\Plataforma::class, 5)->create();
        }
    }
}
