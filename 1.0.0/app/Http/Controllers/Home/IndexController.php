<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\CollectiveActiveUser;
use App\Models\Order;
use App\Models\User;
use App\Services\AdvService;
use App\Services\BargainService;
use App\Services\GoodsClassService;
use App\Services\SeckillService;
use Illuminate\Http\Request;
use App\Services\UserService;
use Hash;

class IndexController extends Controller
{
    // 获取首页信息
    public function index(GoodsClassService $goods_class_service,AdvService $adv_service,SeckillService $seckill_service, BargainService $bargain_service){
        $data['goods'] = $goods_class_service->is_master(8)['data']; // 获取商品首页信息
        $data['banner_bottom_adv'] = $adv_service->getAdvList('PC_幻灯片下广告')['data'];
        $data['class_left_adv'] = $adv_service->getAdvList('PC_栏目左侧广告')['data'];
        $data['class_top_adv'] = $adv_service->getAdvList('PC_栏目顶部广告')['data'];
        $data['banner'] = $adv_service->getAdvList('PC_首页幻灯片')['data'];
        $data['seckill_list'] = $seckill_service->getIndexSeckillAndGoods(4)['data'];
        $data['bargains'] = $bargain_service->getIndexBargains(4)['data'];
        return $this->success($data);
    }

    public function test(UserService $user_service)
    {
        /*
        $user_model = User::find(10);
        $user_model->pay_password = Hash::make("123456");
        $user_model->save();
        */
        $collective_active_user_id = 1;
        $data = Order::find(34);
        var_dump($data->user);exit;
        echo "success";
    }
}
