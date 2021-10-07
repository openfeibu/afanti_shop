<?php

namespace App\Http\Resources\Admin\BargainResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BargainCollection extends ResourceCollection
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
                    'start_time'              =>  $item->start_time,
                    'end_time'                  =>  $item->end_time,
                    'expiry_time'            =>  $item->expiry_time,
                    'goods_id'              =>  $item->goods_id,
                    'floor_price' => $item->floor_price,
                    'peoples' => $item->peoples,
                    'is_self_cut' => $item->is_self_cut,
                    'is_floor_buy' => $item->is_floor_buy,
                    'status' => $item->status,
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
