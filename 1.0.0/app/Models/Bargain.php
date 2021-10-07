<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bargain extends Model
{
    protected $guarded = [];

    public $append = [
        'is_start',   // 活动已开启
        'is_end',   // 活动已结束
        'active_sales', // 活动销量
    ];

    public function goods(){
        return $this->belongsTo("App\Models\Goods",'goods_id','id')->withTrashed();
    }
    /**
     * 获取器：活动是否已开启
     * @return bool
     */
    public function getIsStartAttribute()
    {
        return $this->attributes['id'] ? $this->attributes['start_time'] <= now() : false;
    }

    /**
     * 获取器：活动是否已结束
     * @return bool
     */
    public function getIsEndAttribute()
    {
        return $this->attributes['id'] ? $this->attributes['end_time'] <= now() : false;
    }

    /**
     * 获取器：显示销量
     * @return bool
     */
    public function getActiveSalesAttribute()
    {
        return $this->attributes['id'] ? $this->attributes['actual_sales'] + $this->attributes['initial_sales'] : 0;
    }
}
