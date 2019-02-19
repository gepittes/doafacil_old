<?php

use Illuminate\Database\Seeder;

class UsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.usuario')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            // cria 10 usuários utilizando a factory para o model Usuario
            factory(App\Models\Usuario::class, 15)->create();
        }
    }
}
