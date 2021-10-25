<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderRefundResource\OrderRefundCollection;
use App\Http\Resources\Admin\OrderResource\OrderCollection;
use App\Http\Resources\Admin\OrderResource\OrderResource;
use App\Models\Express;
use App\Models\Order;
use App\Services\Admin\OrderService;
use App\Services\OrderRefundService;
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
}