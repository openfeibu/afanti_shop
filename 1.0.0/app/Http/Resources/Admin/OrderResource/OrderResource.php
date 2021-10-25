<?php

namespace App\Http\Resources\Admin\OrderResource;

use App\Services\OrderService;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $order_service = new OrderService();
        return [
            'id'                    =>  $this->id,
            'order_no'              =>  $this->order_no,
            'receive_name'          =>  $this->receive_name,
            'receive_tel'           =>  $this->receive_tel,
            'receive_area'          =>  $this->receive_area,
            'receive_address'       =>  $this->receive_address,
            'payment_name'          =>  $this->payment_name,
            'payment_name_cn'       =>  $order_service->getOrderPayMentCn($this->payment_name),
            'delivery_no'           =>  $this->delivery_no,
            'delivery_code' => $this->delivery_code,
            'delivery_company' => $this->delivery_company,
            'total_price'           =>  $this->total_price,
            'freight_money'         =>  $this->freight_money,
            'coupon_money'          =>  $this->coupon_money,
            'remark'                =>  $this->remark,
            'pay_time'              =>  $this->pay_time ? $this->pay_time->format('Y-m-d H:i:s') : '',
            'created_at'            =>  $this->created_at->format('Y-m-d H:i:s'),
            'order_status'          =>  $this->order_status,
            'order_status_cn'       =>  $order_service->getOrderStatusCn($this),
            'pay_status'         =>  $this->pay_status,
            'delivery_status'         =>  $this->delivery_status,
            'receipt_status'         =>  $this->receipt_status,
            'delivery_time'         =>  $this->delivery_time,
            'receipt_time'          =>  $this->receipt_time,
            'comment_time'          =>  $this->comment_time,
            'is_comment'            =>  $this->is_comment,
            'state_text' => $this->state_text,
            'order_goods'           =>  $this->order_goods,
        ];
    }
}
