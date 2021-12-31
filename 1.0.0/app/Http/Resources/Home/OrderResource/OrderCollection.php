<?php

namespace App\Http\Resources\Home\OrderResource;

use App\Services\Home\OrderService;
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
                    'order_price'           =>  $item->order_price,
                    'total_price'           =>  $item->total_price,
                    'order_status'          =>  $item->order_status,
                    'order_status_cn'       =>  $order_service->getOrderStatusCn($item),
                    'pay_status'         =>  $item->pay_status,
                    'pay_time'              =>  $item->pay_time ? $item->pay_time->format('Y-m-d H:i:s') : '',
                    'delivery_status'         =>  $item->delivery_status,
                    'receipt_status'         =>  $item->receipt_status,
                    'delivery_time'         =>  $item->delivery_time,
                    'receipt_time'          =>  $item->receipt_time,
                    'comment_time'          =>  $item->comment_time,
                    'is_comment'            =>  $item->is_comment,
                    'store'                 =>  $item->store,
                    'refund_status'         =>  $item->refund_status,
                    'user'                  =>  $item->user,
                    'order_source' => $item->order_source,
                    'order_source_text' => __('orders.order_source_text.'.$item->order_source),
                    'created_at'            =>  $item->created_at->format('Y-m-d H:i'),
                    'order_goods'           =>  $item->order_goods->map(function($v){
                                                return [
                                                    'goods_image'=>$v->goods_image,
                                                    'goods_name'=>$v->goods_name,
                                                    'goods_price'=>$v->goods_price,
                                                    'sku_name'=>$v->sku_name,
                                                    'buy_num'=>$v->buy_num,
                                                    'total_price'=>$v->total_price,
                                                ];
                    }),
                ];
            }),
            // 'data'=>$this->collection,
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
