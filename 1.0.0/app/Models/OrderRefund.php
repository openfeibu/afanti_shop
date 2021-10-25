<?php

namespace App\Models;

use App\Enums\Order\OrderRefundStatus;
use Illuminate\Database\Eloquent\Model;

class OrderRefund extends Model
{
    protected $guarded = [];

    public function order_goods()
    {
        return $this->belongsTo('App\Models\OrderGoods','order_goods_id','id');
    }
    public function User()
    {
        return $this->belongsTo('App\Models\User','user_id','id');
    }

    /**
     * 售后类型
     * @return array
     */
    public function getRefundTypeTextAttribute()
    {
        return  __('order_refunds.refund_type.'. $this['refund_type']);
    }

    /**
     * 商家是否同意售后
     * @return array
     */
    public function getIsAgreeTextAttribute()
    {
        return __('order_refunds.is_agree.'. $this['is_agree']);
    }

    /**
     * 售后单状态
     * @return array
     */

    public function getStatusTextAttribute()
    {
        return  __('order_refunds.status.'. $this['status']) ;
    }

    /**
     * 售后单状态文字描述
     * @return string
     */
    public function getStatusTextDetailAttribute()
    {

        // 已完成
        if ($this['status'] == OrderRefundStatus::COMPLETED) {
            $text = [10 => '已同意退货并已退款', 20 => '已同意换货'];
            return $text[$this['refund_type']];
        }
        // 已取消
        if ($this['status'] == OrderRefundStatus::CANCELLED) {
            return '已取消';
        }
        // 已拒绝
        if ($this['status'] == OrderRefundStatus::REJECTED) {
//            return '已拒绝';
            return $this['refund_type'] == 10 ? '已拒绝退货退款' : '已拒绝换货';
        }
        // 进行中
        if ($this['status'] == OrderRefundStatus::NORMAL) {
            if ($this['is_agree'] == 0) {
                return '等待审核中';
            }
            if ($this['refund_type'] == 10) {
                return $this['is_user_send'] ? '已发货，待平台确认' : '已同意退货，请及时发货';
            }
        }
        return $this['status'];
    }

}
