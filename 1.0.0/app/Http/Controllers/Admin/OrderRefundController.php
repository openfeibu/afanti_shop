<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderRefundResource\OrderRefundCollection;
use App\Http\Resources\Admin\OrderRefundResource\OrderRefundResource;
use App\Services\Admin\OrderService;
use App\Services\Admin\OrderRefundService;
use Illuminate\Http\Request;

class OrderRefundController extends Controller
{
    public function __construct(
        OrderService $order_service,
        OrderRefundService $order_refund_service)
    {
        $this->order_service = $order_service;
        $this->order_refund_service = $order_refund_service;
    }
    public function index(Request $request)
    {
        $order_refunds = $this->order_refund_service->getOrderRefunds();
        return $this->success(new OrderRefundCollection($order_refunds));
    }
    public function show($id)
    {
        $order_refund = $this->order_refund_service->getOrderRefundById($id,'admin');
        return $this->success(new OrderRefundResource($order_refund));
    }
    public function audit(Request $request, $id)
    {
        $order_refund = $this->order_refund_service->getOrderRefundById($id,'admin');
        $this->order_refund_service->audit($order_refund, $request->all());
        return $this->success([],'操作成功');
    }
    public function receipt(Request $request, $id)
    {
        $order_refund = $this->order_refund_service->getOrderRefundById($id,'admin');
        $this->order_refund_service->receipt($order_refund, $request->all());
        return $this->success([],'操作成功');
    }
}