<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        // Registra o seeder de usuário
        $this->call(UsuarioTableSeeder::class);
        Model::reguard();
    }
}
