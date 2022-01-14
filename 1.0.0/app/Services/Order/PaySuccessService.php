<?php
namespace App\Services\Order;

use App\Enums\Order\PayStatus;
use App\Models\Bargain;
use App\Models\BargainTask;
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
 *  支付回调
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

        $order_pay->trade_no = $trade_no;

        return $this->onPaySuccess($payment_name,$order_pay);

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
            $order_model->whereIn('id', $oid_arr)->update([
                'pay_status' => PayStatus::SUCCESS,
                'pay_time' => now(),
                'payment_name' => $payment_name,
            ]);
            // 订单支付表修改状态
            $order_pay->pay_status = PayStatus::SUCCESS;
            $order_pay->pay_time = now();
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
                OutputServerMessageException($ml_info['msg']);
            }
            foreach ($oid_arr as $oid)
            {
                $order = Order::whereIn('id',$oid_arr)->first();
                switch ($order['order_source'])
                {
                    case 'collective':
                        $collective_service = new CollectiveService();
                        $collective_service->saveCollectiveActive($order);
                        break;
                    case 'bargain':
                        $task = BargainTask::detail($order['order_source_id']);
                        if (empty($task)) {
                            OutputServerMessageException('未找到砍价任务信息');
                        }
                        $task->setIsBuy();
                        $bargain = Bargain::find($task['bargain_id']);
                        if (empty($bargain)) {
                            OutputServerMessageException('未找到砍价活动信息');
                        }
                        // 累计活动销量
                        $bargain->increment('actual_sales');

                        break;
                    case 'seckill':
                        break;
                }
            }


            DB::commit();
            return true;
        }catch(\Exception $e){
            DB::rollBack();
            Log::channel('afanti_log')->debug($e->getMessage());
            OutputServerMessageException(__('orders.payment_failed'));
        }

    }

}