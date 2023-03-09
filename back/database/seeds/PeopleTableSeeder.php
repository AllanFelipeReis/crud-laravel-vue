<?php

use App\Person;
use Illuminate\Database\Seeder;

class PeopleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Person::truncate();

        $faker = \Faker\Factory::create();

        $maritalStatus = ["Solteiro", "Namorando", "Casado", "Viúvo"];

        for($i = 0; $i < 50; $i++)
        {
            Person::create([
                "full_name" => $faker->name, 
                "birthdate" => $faker->date, 
                "birthplace" => $faker->city, 
                "uf" => $faker->stateAbbr, 
                "gender" => $faker->numberBetween(1, 2), 
                "mothers_name" => $faker->name("female"),
                "marital_status" => $faker->randomElement($maritalStatus),
                "document" => $faker->numerify("###########"),
            ]);
        }
    }
}
