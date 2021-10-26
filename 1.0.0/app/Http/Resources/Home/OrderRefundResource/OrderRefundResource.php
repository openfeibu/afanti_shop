<?php

namespace App\Http\Resources\Home\OrderRefundResource;

use App\Services\OrderService;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderRefundResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $order_service = new OrderService();
        return [
            'id'                    =>  $this->id,
            'order_id'              =>  $this->order_id,
            'order_goods_id'            =>  $this->order_goods_id,
            'user_id'           =>  $this->user_id,
            'refund_type'           =>  $this->refund_type,
            'refund_type_text' => $this->refund_type_text,
            'apply_desc'            =>  $this->apply_desc,
            'is_agree'          =>  $this->is_agree,
            'is_agree_text' => $this->is_agree_text,
            'refuse_desc'       =>  $this->refuse_desc,
            'refund_money'         =>  $this->refund_money,
            'is_user_send'         =>  $this->is_user_send,
            'send_time'         =>  $this->send_time,
            'is_receipt'         =>  $this->is_receipt,
            'status'         =>  $this->status,
            'status_text' => $this->status_text,
            'status_text_detail' => $this->status_text_detail,
            'images'         =>  $this->images,
            'delivery_no' =>  $this->delivery_no,
            'delivery_code' => $this->delivery_code,
            'delivery_company' => $this->delivery_company,
            'created_at'            =>  $this->created_at->format('Y-m-d H:i:s'),
            'order_goods' => $this->order_goods,
            'order' => $this->order,

        ];
    }
}