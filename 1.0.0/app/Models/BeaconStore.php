<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BeaconStore extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public $table = 'beacon_store';
}
