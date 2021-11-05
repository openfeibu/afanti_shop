<?php

namespace App\Http\Resources\Home\CollectiveActiveResource;

use App\Services\ToolService;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CollectiveActiveGoodsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $tool_service = new ToolService();
        return $this->collection->map(function($item) use($tool_service){
            return [
                'id'                        =>  $item->id,
                'people'                    =>  $item->people,
                'actual_people'             => $item->actual_people,
                'nickname'                  =>  $tool_service->formatTrueName2($item->user->nickname),
                'avatar'                    =>  $item->user->avatar,
                'end_time'              =>  $item->end_time,
                'is_active' => $item->is_active ?? 0,
            ];
        });
    }
}
