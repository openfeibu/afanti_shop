<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Services\BargainService;
use App\Services\CheckoutService;
use App\Services\UserService;
use Illuminate\Http\Request;

class BargainOrderController extends Controller
{
    public function __construct(BargainService $bargain_service)
    {
        $this->bargain_service = $bargain_service;
    }

    public function create_order(){
        $params = base64Check();

        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();
        if(empty($user_info)){
            OutputServerMessageException(__('base.error').' - order_service');
        }
        $checkout_service = new CheckoutService();
        // 订单结算api参数
        $params = $checkout_service->setParams($params);

        $checkout_service->setOrderType('bargain');
        $checkout_service->setCheckoutRule([
            'is_coupon' => false,        // 优惠券抵扣
            'is_full_reduction' => false,
            'is_seckill' => false,
            'is_collective' => false,
        ]);

        $store_goods_list = $this->bargain_service->getCheckoutOrderGoodsList($params);
        $create_order_data = $checkout_service->onCheckout($user_info, $store_goods_list);

        $resp_data = $checkout_service->createOrder($create_order_data);
        return $resp_data;
    }


}
