<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Beacon extends Model
{
    protected $guarded = [];

    public function stores()
    {
        return $this->belongsToMany('App\Models\Store');
    }
}
