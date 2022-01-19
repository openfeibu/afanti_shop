<?php

namespace App\Http\Resources\Home\FileResource;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FileCollection extends ResourceCollection
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
                    'id' =>  $item->id,
                    'disk' => $item->disk,
                    'url' => $item->url,
                    'name' => $item->name,
                    'path' => $item->path,
                    'size' => $item->size,
                    'type' => $item->type,
                    'extension' => $item->extension,
                    'created_at'  =>  $item->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            // 'data'=>$this->collection,
            'total'=>$this->total(), // 数据总数
            'per_page'=>$this->perPage(), // 每页数量
            'current_page'=>$this->currentPage(), // 当前页码
        ];
    }
}
