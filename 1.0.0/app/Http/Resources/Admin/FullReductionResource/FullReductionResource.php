<?php

namespace App\Http\Resources\Admin\FullReductionResource;

use Illuminate\Http\Resources\Json\JsonResource;

class FullReductionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                        =>  $this->id,
            'money'                     =>  $this->money,
            'use_money'                 =>  $this->use_money,
            'name'                      =>  $this->name,
            'start_time'                =>  $this->start_time->format('Y-m-d H:i:s'),
            'end_time'                  =>  $this->end_time->format('Y-m-d H:i:s'),
            'times'                     =>  [$this->start_time->format('Y-m-d H:i:s'),$this->end_time->format('Y-m-d H:i:s')],
        ];
    }
}
