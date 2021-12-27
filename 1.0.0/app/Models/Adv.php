<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adv extends Model
{
    //
    // 获取店铺信息
    public function adv_position(){
        return $this->belongsTo('App\Models\AdvPosition','ap_id','id')->withTrashed();
    }
}
