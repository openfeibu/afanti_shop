<?php

namespace App\Http\Resources\Admin\StoreResource;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreConfigResource extends JsonResource
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
            'id'                        => $this->id,
            'store_name'                =>  $this->store_name,
            'store_logo'                =>  $this->store_logo,
            'store_video'                =>  $this->store_video,
            'store_description'         =>  $this->store_description,
            'store_face_image'          =>  $this->store_face_image,
            'store_slide'               =>  empty($this->store_slide)?[]:explode(',',$this->store_slide),
            'store_mobile_slide'        =>  empty($this->store_mobile_slide)?[]:explode(',',$this->store_mobile_slide),
            'store_status'                  =>  $this->store_status,
            'store_verify'                  =>  $this->store_verify,
            'is_store'        =>  $this->is_store,
            'created_at'                    =>  $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'                    =>  $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
