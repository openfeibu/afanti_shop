<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Services\AdvService;
use App\Services\CollectiveService;
use App\Services\CouponService;
use App\Services\FullReductionService;
use App\Services\GoodsService;
use App\Services\OrderCommentService;
use App\Services\SeckillService;
use App\Services\StoreService;
use Illuminate\Http\Request;

class GoodsController extends Controller
{
    public function __construct(GoodsService $goods_service,
                                StoreService $store_service,
                                CouponService $coupon_service,
                                FullReductionService $full_reduction_service,
                                SeckillService $seckill_service,
                                CollectiveService $collective_service,
                                OrderCommentService $order_comment_service)
    {
        $this->goods_service = $goods_service;
        $this->store_service = $store_service;
        $this->coupon_service = $coupon_service;
        $this->full_reduction_service = $full_reduction_service;
        $this->seckill_service = $seckill_service;
        $this->collective_service = $collective_service;
        $this->order_comment_service = $order_comment_service;
    }

    // 商品详情
    public function goods_info($id){
        $goods_info = $this->goods_service->getGoodsInfo($id);
        if($goods_info['status']){
            $goods_info['data']['store_info'] = $this->store_service->getStoreInfoAndRate($goods_info['data']['store_id'],'id,store_name,store_description')['data'];
            $goods_info['data']['sale_list'] = $this->goods_service->getSaleSortGoods(['class_id'=>$goods_info['data']['class_id']])['data']; // 销售排名
            $goods_info['data']['coupons'] = $this->coupon_service->getCoupons()['data']; // 优惠券
            $goods_info['data']['full_reductions'] = $this->full_reduction_service->getFullReductionByStoreId($goods_info['data']['store_id'])['data']; // 满减
            $seckill_info = $this->seckill_service->getSeckillInfoByGoodsId($id);
            $goods_info['data']['seckills'] = $seckill_info['status']?$seckill_info['data']:false; // 秒杀
            $collective_info = $this->collective_service->getCollectiveInfoByGoodsId($id);
            $goods_info['data']['collectives'] = $collective_info['status']?$collective_info['data']:false; // 团购
            $goods_info['data']['collective_list'] = $this->collective_service->getCollectiveActiveByGoodsId($id)['data']; // 正在团的
            return $this->success($goods_info['data']);
        }
        return $this->error($goods_info['msg']);
        
    }
    // 评论统计
    public function goods_comment_statistics($id){
        $data = $this->order_comment_service->getCommentStatistics($id);
        if($data['status']){
            $data=$this->order_comment_service->getCommentStatistics($id);
            return $this->success($data['data']);
        }
        return $this->error($data['msg']);
    }

    // 评论列表
    public function goods_comments($id){
        $data = $this->order_comment_service->getList($id);
        if($data['status']){
            $data=$this->order_comment_service->getList($id);
            return $this->success($data['data']);
        }
        return $this->error($data['msg']);
    }

    // 搜索产品
    public function goods_search(){
        
        $info = $this->goods_service->goodsSearch();
        if(!$info['status']){
            return $this->error($info['msg']);
        }
        
        return $this->success($info['data']);
    }

    // 获取拼团幻灯片
    public function collection_banner(AdvService $adv_service){
        $data = $adv_service->getAdvList('PC_拼团幻灯片')['data'];
        return $this->success($data);
    }
}
