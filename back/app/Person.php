<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        "full_name", 
        "birthdate", 
        "birthplace", 
        "uf", 
        "gender", 
        "mothers_name",
        "marital_status",
        "document"
    ];
}
