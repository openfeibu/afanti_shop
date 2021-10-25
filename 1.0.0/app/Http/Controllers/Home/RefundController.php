<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\OrderGoods;
use App\Services\Home\OrderService;
use App\Services\RefundService;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function __construct(RefundService $refund_service)
    {
        $this->refund_service = $refund_service;
    }

    //售后
    public function apply(Request $request)
    {
        $order_service = new OrderService();
        $user_info = User::getAuthUserInfo();
        $order_goods_id = $request->order_goods_id;
        // 订单商品详情
        $order_goods =  OrderGoods::find($order_goods_id)->with(['order_refunds']);
        if (isset($order_goods['refund']) && !empty($order_goods['refund'])) {
            OutputServerMessageException('当前商品已申请售后');
        }

        $order_service->receipt($request->id,$user_info);
        return $this->success([],"申请成功，请等待审核");
    }

    public function store(RefundService $refund_service){
        $rs = $this->refund_service->add();
        return $rs['status']?$this->success($rs['data'],$rs['msg']):$this->error($rs['msg']);
    }
    // 这里的ID 都是OrderId 
    public function show(RefundService $refund_service,$id){
        $rs = $this->refund_service->getRefundByOrderId($id);
        return $rs['status']?$this->success($rs['data']):$this->error($rs['msg']);
    }
    // 这里的ID 都是OrderId 
    public function update(RefundService $refund_service,$id){
        $rs = $this->refund_service->edit($id);
        return $rs['status']?$this->success([],$rs['msg']):$this->error($rs['msg']);
    }
}
