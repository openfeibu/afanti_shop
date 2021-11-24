<?php

namespace App\Http\Resources\Home\BeaconResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BeaconCollection extends ResourceCollection
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
                    'major_id'  =>  $item->major_id,
                    'created_at'            =>  $item->created_at->format('Y-m-d H:i:s'),
                    'store'                 =>  $item->store,
                ];
            }),
        ];
    }
}
