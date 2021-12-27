<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\StoreResource\StoreConfigResource;
use App\Models\Store;
use App\Services\UploadService;
use Illuminate\Http\Request;

class StoreConfigController extends Controller
{
    public function show(Request $request){
        $store_info = Store::find($request->id);
        return $this->success(new StoreConfigResource($store_info));
    }

    public function update(Request $request){
        $store_model = Store::find($request->id);
        // 店铺基本信息
        if($request->edit_type == 'base'){
            if(isset($request->store_name)){
                $store_model->store_name = $request->store_name;
            }
            if(isset($request->store_logo)){
                $store_model->store_logo = $request->store_logo;
            }
            if(isset($request->store_description)){
                $store_model->store_description = $request->store_description;
            }
            if(isset($request->store_mobile)){
                $store_model->store_mobile = $request->store_mobile;
            }
            if(isset($request->after_sale_service)){
                $store_model->after_sale_service = $request->after_sale_service;
            }
            if(isset($request->is_store)){
                $store_model->is_store = $request->is_store ? 1 : 0;
            }
        }

        // 店铺门面
        if($request->edit_type == 'face'){
            if(isset($request->store_face_image)){
                $store_model->store_face_image = $request->store_face_image;
            }
        }

        // 地图设置
        if($request->edit_type == 'map'){
            if(isset($request->province_id)){
                $store_model->province_id = $request->province_id;
            }
            if(isset($request->city_id)){
                $store_model->city_id = $request->city_id;
            }
            if(isset($request->region_id)){
                $store_model->region_id = $request->region_id;
            }
            if(isset($request->store_address)){
                $store_model->store_address = $request->store_address;
            }
            if(isset($request->area_info)){
                $store_model->area_info = $request->area_info;
            }
            if(isset($request->store_lat)){
                $store_model->store_lat = $request->store_lat;
            }
            if(isset($request->store_lng)){
                $store_model->store_lng = $request->store_lng;
            }
        }

        // pc幻灯片
        if($request->edit_type == 'pc_slide'){
            if(isset($request->store_slide)){
                $store_model->store_slide = empty($request->store_slide)?'':implode(',',$request->store_slide);
            }
        }
        if($request->edit_type == 'store_video'){
            if(isset($request->store_video)){
                $store_model->store_video = empty($request->store_video)?'':$request->store_video;
            }
        }
        // 手机幻灯片
        if($request->edit_type == 'mobile_slide'){
            if(isset($request->store_mobile_slide)){
                $store_model->store_mobile_slide = empty($request->store_mobile_slide)?'':implode(',',$request->store_mobile_slide);
            }
        }
        $store_model->save();
        return $this->success([],__('base.edit.success'));
    }

    // 图片上传
    public function config_upload(Request $request){
        $name = $request->name;
        $upload_service = new UploadService;

        switch($name){
            case 'store_logo':
                $rs = $upload_service->store_logo();
            break;
            default:
                $rs = $upload_service->store_slide();
            break;
        }

        if($rs['status']){
            return $this->success($rs['data'],$rs['msg']);
        }else{
            return $this->error($rs['msg']);
        }
    }
}
