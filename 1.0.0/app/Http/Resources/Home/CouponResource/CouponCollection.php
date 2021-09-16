<?php

namespace App\Http\Resources\Home\CouponResource;

use App\Models\CouponLog;
use Illuminate\Http\Resources\Json\JsonResource;

class CouponCollection extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->map(function($item){
            return [
                'id'                        =>  $item->id,
                'money'                     =>  intval($item->money),
                'use_money'                 =>  intval($item->use_money),
                'name'                      =>  $item->name,
                'content'                   =>  $item->content,
                'coupon_log_id'             => CouponLog::where('coupon_id',$item->id)->value('id'),
            ];
        });
    }
}
