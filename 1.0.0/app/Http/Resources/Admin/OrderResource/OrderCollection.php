<?php

namespace App\Http\Resources\Admin\OrderResource;

use App\Services\Admin\OrderService;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderCollection extends ResourceCollection
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
                    'order_no'              =>  $item->order_no,
                    'order_name'            =>  $item->order_name,
                    'order_image'           =>  $item->order_image,
                    'total_price'           =>  $item->total_price,
                    'user' => [
                        'id' => $item->user->id,
                        'username' => $item->user->username,
                        'avatar' => $item->user->avatar,
                    ],
                    'buyer_name'            =>  $item->user->username??'',
                    'order_status'          =>  $item->order_status,
                    'order_status_cn'       =>  $order_service->getOrderStatusCn($item),
                    'pay_status'         =>  $item->pay_status,
                    'delivery_status'         =>  $item->delivery_status,
                    'receipt_status'         =>  $item->receipt_status,
                    'pay_time'              =>  $item->pay_time ? $item->pay_time->format('Y-m-d H:i:s') : '',
                    'delivery_time'         =>  $item->delivery_time,
                    'receipt_time'          =>  $item->receipt_time,
                    'comment_time'          =>  $item->comment_time,
                    'is_comment'          =>  $item->is_comment,
                    'delivery_code' => $item->delivery_code,
                    'delivery_company' => $item->delivery_company,
                    'order_source' => $item->order_source,
                    'order_source_text' => __('orders.order_source_text.'.$item->order_source),
                    'created_at'            =>  $item->created_at->format('Y-m-d H:i:s'),
                    'updated_at'            =>  $item->updated_at->format('Y-m-d H:i:s'),
                ];
            }),
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
