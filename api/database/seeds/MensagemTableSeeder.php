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
        factory(App\Models\Mensagem::class, 20)->create();
    }
}
