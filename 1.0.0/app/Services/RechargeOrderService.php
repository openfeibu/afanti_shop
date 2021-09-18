<?php
namespace App\Services;

use App\Http\Resources\Home\OrderResource\CreateOrderAfterCollection;
use App\Models\Address;
use App\Models\Cart;
use App\Models\CouponLog;
use App\Models\Freight;
use App\Models\Goods;
use App\Models\GoodsSku;
use App\Models\Order;
use App\Models\OrderGoods;
use App\Models\OrderPay;
use App\Models\Store;
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RechargeOrderService extends BaseService{

    // 充值，创建支付订单
    // @param bool $recharge_pay 是否是充值 还是订单
    // @param string $pay_no 支付订单号
    protected function createPayOrder($user_info,$pay_no='',$order_list=[]){
        // 创建支付订单
        $create_data = [];
        $pay_no = date('YmdHis').mt_rand(10000,99999);
        $create_data = [
            'user_id'               =>  $user_info['id'],
            'pay_no'                =>  $pay_no,
            'pay_type'              =>  'r',
            'total_price'           =>  abs(request()->total??1), // 充值金额
        ];
        $order_pay_model = new OrderPay();
        try{
            $order_pay_info = $order_pay_model->create($create_data);
        }catch(\Exception $e){
            Log::channel('qwlog')->debug($e->getMessage());
            return $this->format_error(__('orders.payment_failed'));
        }

        return $this->format($order_pay_info);

    }
}