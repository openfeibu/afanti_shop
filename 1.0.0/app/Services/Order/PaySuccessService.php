<?php
namespace App\Services\Order;

use App\Models\CollectiveActive;
use App\Models\Order;
use App\Models\OrderGoods;
use App\Models\OrderPay;
use App\Services\CollectiveService;
use App\Services\ConfigService;
use App\Services\DistributionService;
use App\Services\MoneyLogService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Yansongda\Pay\Pay;
use App\Services\BaseService;
/**
 *  支付回调 qingwuit
 */

class PaySuccessService extends BaseService{

    /**
     * 余额支付标记订单已支付
     * @param $payment_name,$order_pay
     * @return bool
     */
    public function onPaymentByBalance($payment_name,$order_pay)
    {
        $pay_password = request()->pay_password;
        if(empty($pay_password)){
            OutputServerMessageException(__('orders.pay_password_error'));
        }
        $user_info = auth('user')->user();
        if(!Hash::check($pay_password , $user_info->pay_password)){
            OutputServerMessageException(__('orders.pay_password_error'));
        }
        if($order_pay->total_price>$user_info->money){
            OutputServerMessageException(__('orders.balance_insufficient'));
        }

        $order_pay->order_balance = $order_pay->total_price;
        $this->onPaySuccess($payment_name,$order_pay);

        return $this->format([],__('orders.balance_pay_success'));
    }
    public function onPaymentNotify($payment_name,$trade_no,$out_trade_no)
    {
        $pay_no = str_replace(['A','W','R'],'',$out_trade_no); // 得到正常得到pay_no
        // 实例化orderPay模型
        $order_pay_model = new OrderPay();
        $order_pay = $order_pay_model->where('pay_no',$pay_no)->first();
        $lastWord = substr($out_trade_no,-1,1);
        $isRecharge = false;
        if($lastWord == 'R'){
            $isRecharge = true;
        }

        $order_pay->trade_no = $trade_no;
        $order_pay->pay_time = time();

        $rs = $this->onPaySuccess($payment_name,$order_pay);

        return $rs;
    }
    /**
     * 订单支付成功业务处理
     * @param $payment_name,$order_pay
     * @return bool
     */

    public function onPaySuccess($payment_name,$order_pay)
    {
        try {
            DB::beginTransaction();
            $order_model = new Order();
            $oid_arr = explode(',', $order_pay->order_ids);
            $rs = $order_model->whereIn('id', $oid_arr)->update([
                'order_status' => 2,
                'pay_time' => now(),
                'payment_name' => $payment_name,
            ]);
            // 订单支付表修改状态
            $order_pay->payment_name = $payment_name;
            $order_pay->pay_status = 1;
            $order_pay->save();

            // 订单送积分
            $config_service = new ConfigService();
            $config_service->giveIntegral('order');

            // 建立分销信息
            $distribution_service = new DistributionService();
            $distribution_service->addDisLog($oid_arr);

            // 金额日志 用户账户变更
            $ml_service = new MoneyLogService();
            $ml_info = $ml_service->editMoney(__('users.money_log_order'), $order_pay->user_id, -$order_pay->total_price);
            if (!$ml_info['status']) {
                throw new OutputServerMessageException($ml_info['msg']);
                //throw new \Exception($ml_info['msg']);
            }
            $collective_service = new CollectiveService();
            $collective_service->saveCollectiveActive($oid_arr);
            DB::commit();
            return true;
        }catch(\Exception $e){
            DB::rollBack();
            Log::channel('qwlog')->debug($e->getMessage());
            throw new OutputServerMessageException(__('orders.payment_failed'));
        }

    }

}