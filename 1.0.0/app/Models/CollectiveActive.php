<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CollectiveActive extends Model
{
    protected $guarded = [];
    public function goods(){
        return $this->hasOne("App\Models\Goods","id","goods_id")->withTrashed();
    }

    public function user(){
        return $this->hasOne("App\Models\User","id","creator_id")->withTrashed();
    }

    public function orders(){
        return $this->hasOne('App\Models\Order','collective_id','id');
    }

}

