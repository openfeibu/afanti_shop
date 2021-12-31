<?php

namespace App\Http\Resources\Admin\OrderRefundResource;

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
            'delivery_no' =>  $this->delivery_no,
            'delivery_code' => $this->delivery_code,
            'delivery_company' => $this->delivery_company,
            'is_receipt'         =>  $this->is_receipt,
            'status'         =>  $this->status,
            'status_text' => $this->status_text,
            'images'         =>  $this->images,
            'return_name' => $this->return_name,
            'return_phone' => $this->return_phone,
            'return_address' => $this->return_address,
            'created_at'            =>  $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'            =>  $this->updated_at->format('Y-m-d H:i:s'),
            'order_goods' => $this->order_goods,
            'order' => $this->order,
            'user' => $this->user,

        ];
    }
}
