<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\OrderRefundResource\OrderRefundCollection;
use App\Models\OrderGoods;
use App\Models\User;
use App\Services\Home\OrderService;
use App\Services\OrderRefundService;
use Illuminate\Http\Request;

class OrderRefundController extends Controller
{
    public function __construct(OrderRefundService $order_refund_service)
    {
        $this->order_refund_service = $order_refund_service;
    }

    public function index(Request $request)
    {
        $order_refunds = $this->order_refund_service->getOrderRefunds();
        return $this->success(new OrderRefundCollection($order_refunds));
    }
    // 这里的ID 都是OrderId
    public function show($id){
        $order_refund = $this->order_refund_service->getOrderRefundById($id);
        return$this->success(new OrderRefund($order_refund));
    }

    //售后
    public function apply(Request $request,$order_goods_id)
    {
        $user_info = User::getAuthUserInfo();
        // 订单商品详情
        $order_goods =  OrderGoods::where('id',$order_goods_id)->with('order_refund')->first();
        if (isset($order_goods['order_refund']) && !empty($order_goods['order_refund'])) {
            OutputServerMessageException('当前商品已申请售后');
        }
        $this->order_refund_service->apply($user_info,$order_goods);
        return $this->success([],"申请成功，请等待审核");
    }

    public function store(){
        $rs = $this->order_refund_service->add();
        return $rs['status']?$this->success($rs['data'],$rs['msg']):$this->error($rs['msg']);
    }

    // 这里的ID 都是OrderId
    public function update($id){
        $rs = $this->order_refund_service->edit($id);
        return $rs['status']?$this->success([],$rs['msg']):$this->error($rs['msg']);
    }

}
