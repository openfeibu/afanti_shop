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

    public function checkAllowJoin()
    {
        if (!in_array($this['status'], ['un-collect','collecting'])) {
            $this->error = '当前拼单已结束';
            return false;
        }
        if (date('Y-m-d H:i:s') > $this['end_time']) {
            $this->error = '当前拼单已结束';
            return false;
        }
        if ($this['actual_people'] >= $this['people']) {
            $this->error = '当前拼单人数已满';
            return false;
        }
        return true;
    }
}

