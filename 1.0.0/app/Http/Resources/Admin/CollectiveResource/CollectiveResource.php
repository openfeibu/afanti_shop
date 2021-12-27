<?php

namespace App\Http\Resources\Admin\CollectiveResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class CollectiveResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    use HelperTrait;
    public function toArray($request)
    {
        return [
            'id'                    =>  $this->id,
            'goods_id'              =>  $this->goods_id,
            'discount'              =>  $this->discount,
            'need'                  =>  $this->need,
            'group_time'            =>  $this->group_time,
            'goods_info'            =>  [
                                            'id'                        =>  $this->goods->id,
                                            'goods_name'                =>  $this->goods->goods_name,
                                            'goods_master_image'        =>  $this->thumb($this->goods->goods_master_image,150),
                                        ],
        ];
    }
}
