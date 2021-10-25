<?php

namespace App\Http\Resources\Admin\OrderRefundResource;

use App\Services\OrderService;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderRefundCollection extends ResourceCollection
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
            'data'=>$this->collection->map(function($item) use($order_service){
                return [
                    'id'                    =>  $item->id,
                    'order_id'              =>  $item->order_id,
                    'order_goods_id'            =>  $item->order_goods_id,
                    'user_id'           =>  $item->user_id,
                    'refund_type'           =>  $item->refund_type,
                    'refund_type_text' => $item->refund_type_text,
                    'apply_desc'            =>  $item->apply_desc,
                    'is_agree'          =>  $item->is_agree,
                    'is_agree_text' => $item->is_agree_text,
                    'refuse_desc'       =>  $item->refuse_desc,
                    'refund_money'         =>  $item->refund_money,
                    'is_user_send'         =>  $item->is_user_send,
                    'send_time'         =>  $item->send_time,
                    'delivery_no' =>  $item->delivery_no,
                    'delivery_code' => $item->delivery_code,
                    'delivery_company' => $item->delivery_company,
                    'is_receipt'         =>  $item->is_receipt,
                    'status'         =>  $item->status,
                    'status_text' => $item->status_text,
                    'images'         =>  $item->images,
                    'created_at'            =>  $item->created_at->format('Y-m-d H:i:s'),
                    'updated_at'            =>  $item->updated_at->format('Y-m-d H:i:s'),
                    'order_goods' => $item->order_goods,
                    'user' => $item->user,
                ];
            }),
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
