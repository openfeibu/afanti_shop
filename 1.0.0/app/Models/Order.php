<?php

namespace App\Models;

use App\Enums\Order\DeliveryStatus;
use App\Enums\Order\ReceiptStatus;
use App\Services\ConfigService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;
    protected $guarded = [];
    protected $dates = ['pay_time'];

    public function order_goods(){
        return $this->hasMany('App\Models\OrderGoods','order_id','id');
    }

    // 获取店铺信息
    public function store(){
        return $this->belongsTo('App\Models\Store','store_id','id');
    }

    // 获取店铺信息
    public function user(){
        return $this->belongsTo('App\Models\User','user_id','id');
    }

    /**
     * 当前订单是否允许申请售后
     * @return bool
     */
    public function isAllowRefund()
    {
        // 必须是已发货的订单
        if ($this['delivery_status'] != DeliveryStatus::DELIVERED) {
            return false;
        }
        // 允许申请售后期限(天)
        $config_service = new ConfigService();
        $task = $config_service->getFormatConfig('task');
        $refund_days = $task['refund_days'];
        // 不允许售后
        if ($refund_days == 0) {
            return false;
        }
        $refund_date = date('Y-m-d H:i:s',strtotime("{$this['receipt_time']} +{$refund_days} day"));
        // 当前时间超出允许申请售后期限
        if (
            $this['receipt_status'] == ReceiptStatus::RECEIVED
            && now() > $refund_date
        ) {
            return false;
        }
        return true;
    }

    // 获取售后
    public function refund(){
        return $this->hasOne('App\Models\Refund','order_id','id');
    }

    // 获取分销日志
    public function distribution(){
        return $this->hasMany('App\Models\DistributionLog','order_id','id');
    }

    public function collective_active_user(){
        return $this->hasMany('App\Models\CollectiveActiveUser','order_id','id');
    }
    public function collective_active(){
        return $this->belongsTo('App\Models\CollectiveActive');
    }
    public function getOrderSourceTextAttribute()
    {
        return isset($this->attributes['order_source']) ? trans('orders.order_source_text.'.$this->attributes['order_source']) : '';
    }
    public function transferDataType($dataType)
    {
        // 数据类型
        switch ($dataType) {
            case 'delivery':
                return $this->where([
                    ['pay_status','=',20],
                    ['delivery_status','=',10],
                ])->whereIn('order_status', [10, 21]);

                break;
            case 'receipt':
                return $this->where([
                    ['pay_status','=',20],
                    ['delivery_status','=',20],
                    ['receipt_status','=',10],
                ]);

                break;
            case 'pay':
                return $this->where([
                    ['pay_status','=',10],
                    ['order_status','=',10],
                ]);
                break;
            case 'complete':
                return $this->where([
                    ['order_status','=',30],
                ]);
                break;
            case 'cancel':
                return $this->where([
                    ['order_status','=',20],
                ]);
                break;
            case 'all':
                return $this;
                break;
        }
        return $this;
    }
}
