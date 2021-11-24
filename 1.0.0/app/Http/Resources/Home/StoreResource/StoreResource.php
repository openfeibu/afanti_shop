<?php

namespace App\Http\Resources\Home\StoreResource;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
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
            'id'                            =>  $this->id,
            'store_face_image'              =>  $this->store_face_image,
            'store_logo'                    =>  $this->store_logo,
            'store_description'             =>  $this->store_description,
            'store_name'                    =>  $this->store_name,
            'is_store'                    =>  $this->is_store,
            'created_at'                    =>  $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
