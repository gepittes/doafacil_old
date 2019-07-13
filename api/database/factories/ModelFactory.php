<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\Usuario::class, function (Faker\Generator $faker) {
    return [
        'nome' => $faker->name,
        'is_ativo' => $faker->boolean,
        'is_admin' => $faker->boolean,
        'email' => $faker->email,
        'password' => password_hash('123456', PASSWORD_BCRYPT),
        'created_at' => $faker->dateTime,
    ];
});

$factory->define(App\Models\Instituicao::class, function (Faker\Generator $faker) {
    return [
        'nome' => $faker->name,
        'created_at' => $faker->dateTime,
    ];
});
