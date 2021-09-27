<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectiveActiveUser extends Model
{
    protected $guarded = [];
    public function user(){
        return $this->belongsTo("App\Models\User","user_id","id")->withTrashed();
    }

    public function order(){
        return $this->belongsTo('App\Models\Order','order_id','id');
    }

    public function store(){
        return $this->belongsTo('App\Models\Store','store_id','id');
    }
    public function collective_active(){
        return $this->belongsTo('App\Models\CollectiveActive','collective_active_user','id');
    }
}

