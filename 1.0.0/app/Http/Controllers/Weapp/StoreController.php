<?php

namespace App\Http\Controllers\Weapp;

use App\Http\Controllers\Controller;
use App\Services\StoreService;
use App\Models\Store;
use App\Services\GoodsService;
use App\Services\UploadService;
use Illuminate\Http\Request;

class StoreController extends Controller
{

    // 获取店铺列表
    public function index(StoreService $store_service){
        $info = $store_service->getWeappStoreList();
        if($info['status']){
            return $this->success($info['data']);
        }else{
            return $this->error($info['msg']);
        }
    }

    // 获取店铺信息
    public function get_store_info(StoreService $store_service,GoodsService $goods_service,$id){
        $store_info = $store_service->getStoreInfo($id,'id,store_name,store_description,store_slide,store_video');
        if($store_info['status']){
            $slide = [];
            if(!empty($store_info['data']['store_slide'])){
                $slide_demo = explode(',',$store_info['data']['store_slide']);
                foreach($slide_demo as $v){
                    $slide[] = ['image_url'=>$v];
                }
            }
            $store_info['data']['store_slide'] = $slide;
            $store_info['data']['sale_list'] = $goods_service->getSaleSortGoods(['store_id'=>$id])['data'];
            return $this->success($store_info['data']);
        }
    }

}
