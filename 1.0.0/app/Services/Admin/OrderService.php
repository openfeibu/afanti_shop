<?php
namespace App\Services\Admin;

use App\Enums\Order\DeliveryStatus;
use App\Enums\Order\OrderRefundStatus;
use App\Enums\Order\OrderStatus;
use App\Enums\Order\PayStatus;
use App\Models\Address;
use App\Models\CouponLog;
use App\Models\Goods;
use App\Models\GoodsSku;
use App\Models\Order;
use App\Models\OrderGoods;
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\UserService;
use App\Services\PayMentService;

class OrderService extends \App\Services\Common\OrderService{

    use HelperTrait;

    public function delivery($order,$data)
    {
        // 转义为订单列表
        $orderList = [$order];
        // 验证订单是否满足发货条件
        if (!$this->verifyDelivery($orderList)) {
            return false;
        }
        // 整理更新的数据
        $update_list = [[
            'order_id' => $order['id'],
            'delivery_code' => $data['delivery_code'],
            'delivery_no' => $data['delivery_no'],
            'delivery_company' =>  $data['delivery_company'],
        ]];
        // 更新订单发货状态
        if ($status = $this->updateToDelivery($update_list)) {
            //todo
            // 获取已发货的订单
            //$completed = Order::find($order['order_id'])->with(['user', 'address', 'goods', 'express']);
            // 发送消息通知
            //$this->sendDeliveryMessage([$completed]);
        }
        return $status;
    }
    /**
     * 更新订单发货状态(批量)
     * @param $orderList
     * @return array|false
     * @throws \Exception
     */
    private function updateToDelivery($orderList)
    {
        foreach ($orderList as $item) {
            Order::where('id',$item['order_id'])->update([
                'delivery_no' => $item['delivery_no'],
                'delivery_code' => $item['delivery_code'],
                'delivery_company' =>  $item['delivery_company'],
                'delivery_status' => DeliveryStatus::DELIVERED,
                'delivery_time' => now(),
            ]);
        }
        return true;
    }
    public function confirmCancel($order,$data)
    {
        // 判断订单是否有效
        if ($order['pay_status'] != 20) {
            OutputServerMessageException("该订单不合法");
        }
        DB::beginTransaction();
        if ($data['is_cancel']) {
            // 执行退款操作
            $payment_service = new PayMentService();
            $payment_service->refund($order,$order['total_price']);
            $order->is_refund = 1;
            // 回退商品库存
            $og_model = new OrderGoods();
            $og_list = $og_model->select('goods_id','sku_id','buy_num')->where('order_id',$order['id'])->get();
            foreach($og_list as $v){
                $this->orderStock($v['goods_id'],$v['sku_id'],$v['buy_num'],1);
            }
            // 回退用户优惠券 如果有优惠券则修改优惠券
            $coupon_log_model = new CouponLog();
            $coupon_log_model->where('order_id',$order['id'])->update(['status'=>0,'order_id'=>0]);
        }
        // 更新订单状态
        $order->order_status = $data['is_cancel'] ? 20 : 10;
        $order->save();

        DB::commit();
        return true;
    }
    /**
     * 验证订单是否满足发货条件
     * @param $orderList
     * @return bool
     */
    private function verifyDelivery($orderList)
    {
        foreach ($orderList as $order) {
            if (
                $order['pay_status'] !=  PayStatus::SUCCESS || $order['order_status'] != OrderStatus::NORMAL
            ) {
                OutputServerMessageException("订单号[{$order['order_no']}] 不满足发货条件!");
                return false;
            }
        }
        return true;
    }


}
