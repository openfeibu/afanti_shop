<?php

namespace App\Http\Resources\Home\BargainResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BargainGoodsCollection extends ResourceCollection
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

                $goods_price = $item->goods_price;

                // 判断是否存在sku
                if(isset($item->goods_sku)){
                    $goods_price = $item->goods_sku['goods_price'];
                }
                return [
                    'goods_id'                    =>  $item->id,
                    'goods_name'            =>  $item->goods_name,
                    'goods_subname'         =>  $item->goods_subname,
                    'goods_price'           =>  $goods_price,
                    'goods_market_price'    =>  $item->goods_market_price,
                    'goods_sale'            =>  $item->goods_sale,
                    'goods_master_image'    =>  $this->thumb($item->goods_master_image,300),
                    'store_id'              =>  $item->store_id,
                    'store_name'            =>  $item->store->store_name,
                    'bargin_id' => $item->bargain->id,
                    'floor_price'           => $item->bargain->floor_price,
                    'active_sales' => $item->bargain->active_sales,
                ];
            }),
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
