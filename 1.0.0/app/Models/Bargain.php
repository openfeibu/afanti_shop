<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bargain extends Model
{
    public function goods(){
        return $this->belongsTo("App\Models\Goods",'goods_id','id')->withTrashed();
    }
}
