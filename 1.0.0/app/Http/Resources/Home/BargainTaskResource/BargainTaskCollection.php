<?php

namespace App\Http\Resources\Home\BargainTaskResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BargainTaskCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    use HelperTrait;
    public function toArray($request)
    {
        return [
            'data'=>$this->collection->map(function($item){
                return [
                    'id'                    =>  $item->id,
                    'bargain_id'              =>  $item->bargain_id,
                    'user_id'                  =>  $item->user_id,
                    'goods_id'            =>  $item->goods_id,
                    'goods_id'              =>  $item->goods_id,
                    'goods_sku_id' => $item->goods_sku_id,
                    'goods_price' => $item->goods_price,
                    'floor_price' => $item->floor_price,
                    'peoples' => $item->peoples,
                    'cut_people' => $item->cut_people,
                    'cut_money' => $item->cut_money,
                    'actual_price' => $item->actual_price,
                    'end_time' => $item->end_time,
                    'is_buy' => $item->is_buy,
                    'status' => $item->status == 1 &&  $item->end_time > now() ? 1 : 0,
                    'is_floor' =>  $item->is_floor,
                    'cut_people' => $item->cut_people,
                    'surplus_money' => $item->surplus_money,
                    'bargain_rate' => $item->bargain_rate,
                    'created_at'            =>  $item->created_at->format('Y-m-d H:i:s'),
                    'updated_at'            =>  $item->updated_at->format('Y-m-d H:i:s'),
                    'goods'                 =>  [
                                                    'goods_name'                =>  $item->goods->goods_name,
                                                    'goods_master_image'        =>  $this->thumb($item->goods->goods_master_image,150),
                                                ],
                ];
            }),
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
