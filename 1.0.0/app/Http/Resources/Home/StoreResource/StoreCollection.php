<?php

namespace App\Http\Resources\Home\StoreResource;

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
                    'store_face_image'              =>  $item->store_face_image,
                    'store_logo'                    =>  $item->store_logo,
                    'store_description'             =>  $item->store_description,
                    //'comment_rate'                  =>  $item->comments_count==0?100:round((($item->good_comment??0)/$item->comments_count)*100,2),
                    'store_name'                    =>  $item->store_name,
                    'created_at'                    =>  $item->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            // 'data'=>$this->collection,
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
