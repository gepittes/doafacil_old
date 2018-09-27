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
        factory(App\Models\Plataforma::class, 5)->create();
    }
}
