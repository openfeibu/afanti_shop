<?php

namespace App\Http\Resources\Admin\StoreResource;

use App\Models\Store;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StoreCollection extends ResourceCollection
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
            'data'=>$this->collection->map(function($item){
                return [
                    'id'                            =>  $item->id,
                    'store_name'                    =>  $item->store_name,
                    'store_logo'                    =>  $item->store_logo,
                    'store_phone'                   =>  $item->store_phone,
                    'store_money'                   =>  $item->store_money,
                    'store_status'                  =>  $item->store_status,
                    'is_store' => $item->is_store,
                    'created_at'                    =>  $item->created_at->format('Y-m-d H:i:s'),
                    'updated_at'                    =>  $item->updated_at->format('Y-m-d H:i:s'),
                ];
            }),
            'total'=>$request->all ?  $this->count() : $this->total(), // 数据总数
            'per_page'=>$request->all ? 1 : $this->perPage(), // 每页数量
            'current_page'=>$request->all ? 1 : $this->currentPage(), // 当前页码
        ];
    }
}
