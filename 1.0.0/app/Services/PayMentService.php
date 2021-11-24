<?php
namespace App\Services;

use App\Enums\Order\PayStatus;
use App\Models\Order;
use App\Models\OrderPay;
use App\Services\Order\PaySuccessService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Yansongda\Pay\Pay;

/**
 *  支付回调
 */

class PayMentService extends BaseService{
    public function payment($payment_name){
        Log::channel('afanti_log')->debug("开始支付：".$payment_name);
        try{
            if($payment_name == 'ali'){
                $out_trade_no = request()->input('out_trade_no');
            }

            if($payment_name == 'wechat'){
                $return_info = json_decode(json_encode(simplexml_load_string(file_get_contents("php://input"), 'SimpleXMLElement', LIBXML_NOCDATA)),true);
                $out_trade_no = $return_info['out_trade_no'];
            }
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug(__('orders.payment_call_error').' - '.$payment_name.' - Payment 26 message:'.$e->getMessage());
            OutputServerMessageException(__('orders.payment_call_error').' - Payment');
        }

        // 如果商户号没传回来，肯定报错
        if(empty($out_trade_no)){
            Log::channel('afanti_log')->debug(__('orders.payment_call_error').' - Payment 31');
            OutputServerMessageException(__('orders.payment_call_error').' - Payment');
        }

        // 获取回调的订单号判断是那种支付类型 首字母为支付方式 尾部为是否充值
        $firstWord = substr($out_trade_no,0,1);


        //配置好支付的参数
        if($firstWord == 'W'){
            $payment_name = 'wechat';
        }
        if($firstWord == 'A'){
            $payment_name = 'ali';
        }

        // 根据out_trade_no 获取支付订单信息
        $pay_no = str_replace(['A','W','R'],'',$out_trade_no); // 得到正常得到pay_no
        $order_pay_model = OrderPay::where('pay_no',$pay_no)->first();

        $this->getPaymentConfig($order_pay_model->payment_name);

        // 根据情况做回调验证
        if($payment_name == 'wechat'){
            $wxpayObj = Pay::wechat($this->wx_config);
            $notify_info = $wxpayObj->verify();
            $rs = $this->payHandle($payment_name,$out_trade_no,$notify_info);
            return $rs['status']?$wxpayObj->success():$this->format_error($rs['msg']);
        }elseif($payment_name == 'ali'){
            $alipayObj = Pay::alipay($this->ali_config);
            $notify_info = $alipayObj->verify();
            $rs = $this->payHandle($payment_name,$out_trade_no,$notify_info);
            return $rs['status']?$alipayObj->success():$this->format_error($rs['msg']);
        }

    }


    /**
     * 调取第三方支付 function
     *
     * @param [type] $payment_name  支付类型 如：wechat_jsapi
     * @param [type] $order_pay 支付订单的支付数据 order_pay 表内数据
     * @return Mix
     * @Description
     *
     */
    public function pay($payment_name,$order_pay){
        if(empty($payment_name) || empty($order_pay)){
            OutputServerMessageException(__('orders.error'));
        }

        // 判断是否是余额支付
        if($payment_name == 'money'){
            $pay_success_service = new PaySuccessService();
            return $pay_success_service->onPaymentByBalance($payment_name,$order_pay);

        }else{
            // 获取支付配置
            $rs = $this->getPaymentConfig($payment_name);
            if(!$rs['status']){
                OutputServerMessageException($rs['msg']);
            }
            // 根据订单支付数据查询订单名称
            $order_id = explode(',',$order_pay->order_ids)[0];
            if(empty($order_id)){
                OutputServerMessageException(__('orders.error').' - 51');
            }

            $order_model = new Order();
            $order_info = $order_model->select('order_name')->where('id',$order_id)->first();
            if(empty($order_info)){
                OutputServerMessageException(__('orders.error').' - 59');
            }

            // 订单支付表修改状态
            $order_pay->payment_name = $payment_name;
            $order_pay->save();

            // 如果长度过长128将信息裁掉
            $orderNameLen = mb_strlen($order_info['order_name']);
            if($orderNameLen>30){
                $order_info['order_name'] = mb_substr($order_info['order_name'],0,30);
            }

            if($rs['data'] == 'wechat'){  // 微信支付
                // 支付订单信息
                $pay_order_info['out_trade_no'] = 'W'.$order_pay->pay_no;
                $pay_order_info['total_fee'] = abs($order_pay->total_price??1);
                $pay_order_info['total_fee'] = $pay_order_info['total_fee']*100;
                $pay_order_info['body'] = $order_info['order_name'];
            }elseif($rs['data'] == 'ali'){
                $pay_order_info['out_trade_no'] = 'A'.$order_pay->pay_no;
                $pay_order_info['total_amount'] = abs($order_pay->total_price??1);
                $pay_order_info['subject'] = $order_info['order_name'];
            }
            $rs = $this->payCall($payment_name,$pay_order_info);
            return $rs['status']?$this->format($rs['data']):$this->format_error($rs['msg']);
        }

    }

    // 支付做分别返回
    protected function payCall($payment_name,$pay_order_info){
        $tool_service = new ToolService();
        try{
            switch($payment_name){
                // 微信支付
                case 'wechat_h5': // wap
                    $rs = Pay::wechat($this->wx_config)->wap($pay_order_info);
                    $rs = $rs->getTargetUrl();
                    break;
                case 'wechat_public': // 公众号
                    $pay_order_info['openid'] = ''; // 微信游览器需要openid
                    $rs = Pay::wechat($this->wx_config)->mp($pay_order_info);
                    break;
                case 'wechat_app': // app
                    $rs = Pay::wechat($this->wx_config)->app($pay_order_info);
                    break;
                case 'wechat_mini': // 小程序
                    $pay_order_info['openid'] = ''; // 小程序需要openid
                    $rs = Pay::wechat($this->wx_config)->miniapp($pay_order_info);
                    break;
                case 'wechat_scan': // pc 扫码
                    $rs = Pay::wechat($this->wx_config)->scan($pay_order_info);
                    $qr_code = $tool_service->create_qrcode($rs['code_url']);
                    $rs['qr_code'] = $qr_code;
                    break;

                // 阿里支付
                case 'ali_h5': // wap
                    $rs = Pay::wechat($this->ali_config)->wap($pay_order_info);
                    $rs = $rs->getTargetUrl();
                    break;
                case 'ali_app': // app
                    $rs = Pay::wechat($this->ali_config)->app($pay_order_info);
                    break;
                case 'ali_mini': // 小程序
                    $rs = Pay::wechat($this->ali_config)->mini($pay_order_info);
                    break;
                case 'ali_scan':
                    $rs = Pay::alipay($this->ali_config)->web($pay_order_info);
                    $rs = $rs->getContent();
                    break;
            }
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug($pay_order_info['out_trade_no'].':'.$e->getMessage());
            OutputServerMessageException(__('orders.payment_failed'));
        }

        return $this->format($rs);
    }

    // 检测微信支付是否成功
    public function wechatPayCheck(){
        $out_trade_no = request()->out_trade_no;
        if($rs = Order::where('order_no',$out_trade_no)->where('pay_status',PayStatus::SUCCESS)->exists()){
            return $this->format($rs);
        }else{
            OutputServerMessageException($rs);
        }
    }

    // 配置好支付的参数
    protected function getPaymentConfig($payment_name){

        // 获取配置的模型
        $config_model = new ConfigService();
        $payment_arr = explode('_',$payment_name);
        $config_info = $config_model->getFormatConfig($payment_arr[0].'_pay');
        if(empty($config_info)){
            OutputServerMessageException(__('orders.empty_payment').' - payment_config');
        }

        switch($payment_name){
            // 微信支付
            case 'wechat_h5': // wap
                $this->wx_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->wx_config['mch_id'] = trim($config_info[$payment_name]['mch_id']);
                $this->wx_config['key'] = $config_info[$payment_name]['key'];
                $this->wx_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                break;
            case 'wechat_public': // 公众号
                $this->wx_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->wx_config['mch_id'] = trim($config_info[$payment_name]['mch_id']);
                $this->wx_config['key'] = $config_info[$payment_name]['key'];
                $this->wx_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                break;
            case 'wechat_app': // app
                $this->wx_config['appid'] = $config_info[$payment_name]['app_id'];
                $this->wx_config['mch_id'] = trim($config_info[$payment_name]['mch_id']);
                $this->wx_config['key'] = $config_info[$payment_name]['key'];
                $this->wx_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                break;
            case 'wechat_mini': // 小程序
                $this->wx_config['miniapp_id'] = $config_info[$payment_name]['app_id'];
                $this->wx_config['mch_id'] = trim($config_info[$payment_name]['mch_id']);
                $this->wx_config['key'] = $config_info[$payment_name]['key'];
                $this->wx_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                break;
            case 'wechat_scan': // pc 扫码
                // 配置支付密钥
                $this->wx_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->wx_config['mch_id'] = trim($config_info[$payment_name]['mch_id']);
                $this->wx_config['key'] = $config_info[$payment_name]['key'];
                $this->wx_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                break;

            // 阿里支付
            case 'ali_h5': // wap
                $this->ali_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->ali_config['ali_public_key'] = $config_info[$payment_name]['ali_public_key'];
                $this->ali_config['public_key'] = $config_info[$payment_name]['public_key'];
                $this->ali_config['private_key'] = $config_info[$payment_name]['private_key'];
                $this->ali_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                $this->ali_config['return_url'] = $config_info[$payment_name]['return_url'];
                break;
            case 'ali_app': // app
                $this->ali_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->ali_config['ali_public_key'] = $config_info[$payment_name]['ali_public_key'];
                $this->ali_config['public_key'] = $config_info[$payment_name]['public_key'];
                $this->ali_config['private_key'] = $config_info[$payment_name]['private_key'];
                $this->ali_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                $this->ali_config['return_url'] = $config_info[$payment_name]['return_url'];
                break;
            case 'ali_mini': // 小程序
                $this->ali_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->ali_config['ali_public_key'] = $config_info[$payment_name]['ali_public_key'];
                $this->ali_config['public_key'] = $config_info[$payment_name]['public_key'];
                $this->ali_config['private_key'] = $config_info[$payment_name]['private_key'];
                $this->ali_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                $this->ali_config['return_url'] = $config_info[$payment_name]['return_url'];
                break;
            case 'ali_scan':
                // 配置支付密钥
                $this->ali_config['app_id'] = $config_info[$payment_name]['app_id'];
                $this->ali_config['ali_public_key'] = $config_info[$payment_name]['ali_public_key'];
                $this->ali_config['public_key'] = $config_info[$payment_name]['public_key'];
                $this->ali_config['private_key'] = $config_info[$payment_name]['private_key'];
                $this->ali_config['notify_url'] = $config_info[$payment_name]['notify_url'];
                $this->ali_config['return_url'] = $config_info[$payment_name]['return_url'];
                break;
        }
        return $this->format($payment_arr[0]);
    }

    /**
     * 支付后数据处理 function
     *
     * @param string $payment_name 支付方式 wechat|ali|money
     * @param string $out_trade_no 如果非第三方支付可以为空
     * @param array $notify_info 如果非第三方支付可以为空
     * @return void
     * @Description
     *
     */
    public function payHandle($payment_name,$out_trade_no='',$notify_info=[]){
        $trade_no = ''; // 平台支付流水号
        // 微信和支付宝和余额
        if($payment_name == 'wechat'){
            if($notify_info['result_code'] != 'SUCCESS'){
                throw new \Exception(__('orders.payment_failed').':'.$out_trade_no);
            }
            $trade_no = $notify_info['transaction_id']??'';

        }elseif($payment_name == 'ali'){
            // 如果状态不为true 则表示支付失败
            if($notify_info['trade_status'] != 'TRADE_SUCCESS'){
                throw new \Exception(__('orders.payment_failed').':'.$out_trade_no);
            }
            $trade_no = $notify_info['trade_no']??'';
        }elseif($payment_name == 'money'){ // 不记得做什么用的了，后续再看
            $trade_no = '';
        }

        $pay_success_service = new PaySuccessService();
        $rs = $pay_success_service->onPaymentNotify($payment_name,$trade_no,$out_trade_no);
        return $this->format($rs);

    }

    public function refund($order,$money)
    {
        $payment_provider = $order['payment_name'];
        $order_pay = OrderPay::whereRaw('FIND_IN_SET(?,order_ids)',[$order['id']])->where('pay_status','20')->first();
        if(!$order_pay)
        {
            OutputServerMessageException("未找到相关支付");
        }
        $payment_name = $order_pay->payment_name;
        $this->getPaymentConfig($payment_name);
        try {
            switch ($payment_provider) {
                case 'wechat':
                    /*
                    $refund_order = [
                        'out_trade_no' => $order_pay->trade_no,
                        'out_refund_no' => time(),
                        'amount' => [
                            'refund' => $money * 100,
                            'total' => $order['total_price'] * 100,
                            'currency' => 'CNY',
                        ],
                    ];
                    */
                    $refund_order = [
                        'transaction_id' => $order_pay->trade_no, //微信交易号
                        'out_refund_no' => time(),
                        'total_fee' => $order['total_price'] * 100,
                        'refund_fee' => $money * 100,
                        'refund_desc' => '退款',

                    ];
                    $this->wx_config['cert_client'] = storage_path('cert/wechat/apiclient_cert.pem');
                    $this->wx_config['cert_key'] = storage_path('cert/wechat/apiclient_cert.pem');
                    $wxpayObj = Pay::wechat($this->wx_config);
                    $wxpayObj->refund($refund_order);
                    break;
                case 'ali':
                    $refund_order = [
                        'trade_no' => $order_pay->trade_no, //支付宝交易号
                        'refund_amount' => $money,
                    ];
                    $alipayObj = Pay::alipay($this->ali_config);
                    $rs = $alipayObj->refund($refund_order);
                    //var_dump($rs);exit;
                    break;
                default:
                    OutputServerMessageException("未找到相关支付方式");
                    break;
            }
        } catch (\Exception $e) {
            Log::channel('afanti_log')->debug('order_refund:'.json_encode($e->getMessage()));
            OutputServerMessageException($e->getMessage() ?? __('orders.error'));
        }
    }


    protected $wx_config = [
        'appid' => 'wxb3fxxxxxxxxxxx', // APP APPID
        'app_id' => 'wxb3fxxxxxxxxxxx', // 公众号 APPID
        'miniapp_id' => 'wxb3fxxxxxxxxxxx', // 小程序 APPID
        'mch_id' => '14577xxxx',
        'key' => 'mF2suE9sU6Mk1Cxxxxxxxxxxx',
        'notify_url' => 'www.feibu.info',
        //'cert_client' => './cert/apiclient_cert.pem', // optional，退款等情况时用到
        //'cert_key' => './cert/apiclient_key.pem',// optional，退款等情况时用到
        //'mode' => 'dev', // optional, dev/hk;当为 `hk` 时，为香港 gateway。
    ];

    protected $ali_config = [
        'app_id' => '2016082000295641',
        'notify_url' => '',
        'return_url' => '',
        'ali_public_key' => '',
        // 加密方式： **RSA2**  
        'private_key' => '',
        'mode' => 'dev', // optional,设置此参数，将进入沙箱模式
    ];
}
