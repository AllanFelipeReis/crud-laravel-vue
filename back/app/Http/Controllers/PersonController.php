<?php

namespace App\Http\Controllers;

use App\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $query = Person::query();
        
        if($request->has("name"))
            $query->where("name", "LIKE", "%" . $request->name . "%");

        return $query->get();
    }

    public function show(Person $person)
    {
        return $person;
    }

    public function store(Request $request)
    {
        $person = Person::create($request->all());

        return response()->json($person, 201);
    }

    public function update(Request $request, Person $person)
    {
        $person->update($request->all());

        return response()->json($person, 200);
    }

    public function delete(Person $person)
    {
        $person->delete();

        return response()->json(null, 204);
    }
}
