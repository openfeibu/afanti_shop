<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Goods extends Model
{
    use SoftDeletes;
    protected $table = 'goods';
    protected $guarded = [];

    public function goods_class(){
        return $this->belongsTo('App\Models\GoodsClass','class_id','id')->withTrashed();
    }

    public function goods_brand(){
        return $this->belongsTo('App\Models\GoodsBrand','brand_id','id')->withTrashed();
    }

    public function goods_skus(){
        return $this->hasMany('App\Models\GoodsSku','goods_id','id');
    }

    public function goods_sku(){
        return $this->hasOne('App\Models\GoodsSku','goods_id','id');
    }
    // public function stores(){
    //     return $this->hasMany('App\Models\Store','id','store_id');
    // }
    public function store(){
        return $this->belongsTo('App\Models\Store','store_id','id')->withTrashed();
    }

    // 获取评论数量
    public function order_comment(){
        return $this->hasMany('App\Models\OrderComment','goods_id','id');
    }

    // 订单商品
    public function order_goods(){
        return $this->hasMany('App\Models\OrderGoods','goods_id','id');
    }

    // 获取分销ID
    public function distribution(){
        return $this->hasOne('App\Models\Distribution','goods_id','id')->withTrashed();
    }

    // 获取秒杀
    public function seckill(){
        return $this->hasOne('App\Models\Seckill','goods_id','id')->withTrashed();
    }

    // 获取拼团
    public function collective(){
        return $this->hasOne('App\Models\Collective','goods_id','id');
    }
    // 获取砍价
    public function bargain(){
        return $this->hasOne('App\Models\Bargain','goods_id','id');
    }
}
