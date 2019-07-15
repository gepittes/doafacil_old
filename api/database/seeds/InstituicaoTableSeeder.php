<?php

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InstituicaoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('app.instituicao')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            // cria 10 usuários utilizando a factory para o model Usuario
            factory(App\Models\Instituicao::class, 10)->create();
        }
    }
}
