<?php
namespace App\Services\Recharge;

use App\Models\Order;
use App\Models\OrderPay;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Yansongda\Pay\Pay;
use App\Services\BaseService;

/**
 *  支付回调 qingwuit
 */

class PayMentService extends BaseService{

    /**
     * 调取第三方支付 function
     *
     * @param [type] $payment_name  支付类型 如：wechat_jsapi
     * @param [type] $order_pay 支付订单的支付数据 order_pay 表内数据
     * @return Mix
     * @Description
     * @author hg <www.qingwuit.com>
     */
    public function pay($payment_name,$order_pay){
        if(empty($payment_name) || empty($order_pay)){
            OutputServerMessageException(__('orders.error'));
        }
        // 判断是否是余额支付
        if($payment_name == 'money'){
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
            // 金额日志 用户账户变更
            $ml_service = new MoneyLogService();
            $ml_info = $ml_service->editMoney(__('users.money_log_order'),$order_pay->user_id,-$order_pay->total_price);
            if(!$ml_info['status']){
                OutputServerMessageException($ml_info['msg']);
            }else{
                $order_model = new Order();
                $oid_arr = explode(',',$order_pay->order_ids);
                $rs = $order_model->whereIn('id',$oid_arr)->update([
                    'order_status'  =>  2,
                    'pay_time'      =>  now(),
                    'payment_name'  =>  $payment_name,
                ]);

                // 订单支付表修改状态
                $order_pay->payment_name = $payment_name;
                $order_pay->pay_status = 1;
                $order_pay->order_balance = $order_pay->total_price;
                $order_pay->save();

                // 订单送积分
                $config_service = new ConfigService();
                $config_service->giveIntegral('order');

                // 建立分销信息
                $distribution_service = new DistributionService();
                // $oid_arr = explode(',',$order_pay->order_ids);
                $distribution_service->addDisLog($oid_arr);

                return $this->format([],__('orders.balance_pay_success'));
            }
        }else{

            $rechargeBody = '商城在线充值';
            // 获取支付配置
            $rs = $this->getPaymentConfig($payment_name);
            if(!$rs['status']){
                OutputServerMessageException($rs['msg']);
            }


            // 订单支付表修改状态
            $order_pay->payment_name = $payment_name;
            $order_pay->save();

            if($rs['data'] == 'wechat'){  // 微信支付
                // 支付订单信息
                $pay_order_info['out_trade_no'] = 'W'.$order_pay->pay_no.'R';
                $pay_order_info['total_fee'] = abs($order_pay->total_price??1);
                $pay_order_info['total_fee'] = $pay_order_info['total_fee']*100;
                $pay_order_info['body'] = $rechargeBody;
            }elseif($rs['data'] == 'ali'){
                $pay_order_info['out_trade_no'] = 'A'.$order_pay->pay_no.'R';
                $pay_order_info['total_amount'] = abs($order_pay->total_price??1);
                $pay_order_info['subject'] = $rechargeBody;
            }
            $rs = $this->payCall($payment_name,$pay_order_info);
            return $rs['status']?$this->format($rs['data']):$this->format_error($rs['msg']);
        }

    }


}