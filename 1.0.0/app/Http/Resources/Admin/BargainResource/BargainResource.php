<?php

namespace App\Http\Resources\Admin\BargainResource;

use App\Traits\HelperTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class BargainResource extends JsonResource
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
            'start_time'              =>  $this->start_time,
            'end_time'                  =>  $this->end_time,
            'times'                     =>  [$this->start_time,$this->end_time],
            'expiry_time'            =>  $this->expiry_time,
            'goods_id'              =>  $this->goods_id,
            'floor_price' => $this->floor_price,
            'peoples' => $this->peoples,
            'is_self_cut' => $this->is_self_cut,
            'is_floor_buy' => $this->is_floor_buy,
            'status' => $this->status,
            'goods_info'            =>  [
                                            'id'                        =>  $this->goods->id,
                                            'goods_name'                =>  $this->goods->goods_name,
                                            'goods_master_image'        =>  $this->thumb($this->goods->goods_master_image,150),
                                        ],
        ];
    }
}
