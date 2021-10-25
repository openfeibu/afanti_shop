<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\OrderResource\OrderCollection;
use App\Http\Resources\Home\OrderResource\OrderResource;
use App\Models\User;
use App\Services\Home\OrderService;
use App\Services\PayMentService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(OrderService $order_service)
    {
        $this->order_service = $order_service;
    }

    // 获取订单列表
    public function get_orders(){
        $order_service = new OrderService();
        $list = $order_service->getOrders()['data'];
        return $this->success(new OrderCollection($list));
    }

    // 创建订单
    public function create_order(){
        $order_service = new OrderService;
        $rs = $order_service->createOrder();
        return $rs['status']?$this->success($rs['data']):$this->auto($rs['code'],$rs['msg']);
    }

    // 创建订单前
    public function create_order_before(){
        $order_service = new OrderService;
        $rs = $order_service->createOrderBefore();
        return $rs['status']?$this->success($rs['data']):$this->auto($rs['code'],$rs['msg']);
    }

    // 创建订单后
    public function create_order_after(){
        $order_service = new OrderService;
        $rs = $order_service->createOrderAfter();
        return $rs['status']?$this->success($rs['data']):$this->auto($rs['code'],$rs['msg']);
    }

    // 支付订单
    public function pay(){
        $order_service = new OrderService();
        $rs = $order_service->payOrder();
        return $rs['status']?$this->success($rs['data']):$this->error($rs['msg']);
    }

    // 微信订单验证是否支付成功
    public function wechat_pay_check(PayMentService $payment_service){
        $rs = $payment_service->wechatPayCheck();
        return $rs['status']?$this->success($rs['data']):$this->error($rs['msg']);
    }
    // 取消订单
    public function cancel(Request $request)
    {
        $order_service = new OrderService();
        $user_info = User::getAuthUserInfo();
        $order_service->cancel($request->id,$user_info);
        return $this->success([],"订单取消成功");
    }
    //收货
    public function receipt(Request $request)
    {
        $order_service = new OrderService();
        $user_info = User::getAuthUserInfo();
        $order_service->receipt($request->id,$user_info);
        return $this->success([],"订单收货成功");
    }

    // 修改订单状态 // 用户只能操作取消订单
    public function edit_order_status(Request $request){
        $order_service = new OrderService();
        $rs = $order_service->editOrderStatus($request->id,$request->order_status,'user');
        return $rs['status']?$this->success($rs['data'],$rs['msg']):$this->error($rs['msg']);
    }

    // 获取订单详情
    public function get_order_info($id){
        $order_service = new OrderService();
        $rs = $order_service->getOrderInfoById($id,'user');
        return $rs['status']?$this->success(new OrderResource($rs['data']),$rs['msg']):$this->error($rs['msg']);
    }
    public function get_freight(Request $request)
    {
        $freight_id = $request->freight_id;
        $total_weight = $request->total_weight;
        $province_id = $request->province_id;
        $freight = $this->order_service->sumFreight($freight_id,$total_weight,$province_id); // 直接计算运费，如果多个不同的商品取第一个商品的运费
        return $this->success(['freight' => $freight]);
    }

}
