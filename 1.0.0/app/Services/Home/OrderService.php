<?php
namespace App\Services\Home;

use App\Enums\Order\DeliveryStatus;
use App\Enums\Order\OrderStatus;
use App\Enums\Order\PayStatus;
use App\Enums\Order\ReceiptStatus;
use App\Exceptions\OutOfStockException;
use App\Http\Resources\Home\OrderResource\CreateOrderAfterCollection;
use App\Models\Address;
use App\Models\BargainTask;
use App\Models\Cart;
use App\Models\CollectiveActive;
use App\Models\CouponLog;
use App\Models\Freight;
use App\Models\Goods;
use App\Models\GoodsSku;
use App\Models\Order;
use App\Models\OrderGoods;
use App\Models\OrderPay;
use App\Models\Store;
use App\Models\User;
use App\Services\OrderCompleteService;
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\UserService;
use App\Services\CheckoutService;
use App\Services\BargainTaskService;
use App\Services\PayMentService;

class OrderService extends \App\Services\Common\OrderService{

    use HelperTrait;
    // 要删除的购物车数据
    protected $cartId = [];

    // 获取创建订单前处理订单
    public function createOrderBefore(){
        $check = $this->base64Check();
        if(!$check['status']){
            OutputServerMessageException($check['msg']);
        }

        $params = $check['data'];

        $user_service = new UserService();
        if(!$user_info = $user_service->getUserInfo()){
            OutputServerMessageException(__('auth.no_token'));
        }
        $checkout_service = new CheckoutService();
        $params = $checkout_service->setParams($params);
        $order_source = $params['order_source'] ?? 'common';
        switch ($order_source)
        {
            case 'common':
                // 列表设置使用，默认不使用
                $checkout_service->setCheckoutRule([
                    'is_default_coupon' => true,
                ]);
                $store_goods_list = $this->getCheckoutOrderGoodsList($params);
                break;
            case 'bargain':
                $checkout_service->setOrderSource([
                    'source' => 'bargain',
                    'source_id' => $params['bargain_task_id'],
                ]);
                $checkout_service->setCheckoutRule([
                    'is_coupon' => false,        // 优惠券抵扣
                    'is_full_reduction' => false,
                    'is_seckill' => false,
                    'is_collective' => false,
                ]);
                $bargain_task_service = new BargainTaskService();
                $store_goods_list = $bargain_task_service->getBargainTaskGoods($params['bargain_task_id']);
                break;
        }
        $create_order_data = $checkout_service->onCheckout($user_info, $store_goods_list);
        return $this->format($create_order_data);
    }

    // 创建订单
    public function createOrder(){
        $check = $this->base64Check();
        if(!$check['status']){
            OutputServerMessageException($check['msg']);
        }
        $user_service = new UserService;
        $user_info = $user_service->getUserInfo();
        if(empty($user_info)){
            OutputServerMessageException("未登录");
        }
        // 地址验证
        $address_resp = $this->checkAddress();
        if(!$address_resp['status']){
            OutputServerMessageException($address_resp['msg']);
        }
        $address_info = $address_resp['data'];


        $params = $check['data'];
        $params['order'] = $params['order'] ?? [];
        $car_ids = array_column($params['order'],'cart_id');
        $checkout_service = new CheckoutService();
        $coupon_id = request()->coupon_id ?? 0;
        // 订单结算api参数
        $params = $checkout_service->setParams($params);
        $params = $checkout_service->setParams([
            'coupon_id' => $coupon_id,
        ]);
        // 循环生成订单 多个商家则生成多个订单
        try {
            DB::beginTransaction();
            $order_source = $params['order_source'] ?? 'common';
            switch ($order_source) {
                case 'common':
                    $store_goods_list = $this->getCheckoutOrderGoodsList($params);
                    break;
                case 'bargain':
                    $checkout_service->setOrderSource([
                        'source' => 'bargain',
                        'source_id' => $params['bargain_task_id'],
                    ]);
                    $checkout_service->setCheckoutRule([
                        'is_coupon' => false,        // 优惠券抵扣
                        'is_full_reduction' => false,
                        'is_seckill' => false,
                        'is_collective' => false,
                    ]);
                    $bargain_task = BargainTask::detail($params['bargain_task_id']);
                    $bargain_task_service = new BargainTaskService();
                    $store_goods_list = $bargain_task_service->getBargainTaskGoods($params['bargain_task_id']);
                    break;
            }
            $create_order_data = $checkout_service->onCheckout($user_info, $store_goods_list);
            $resp_data = $checkout_service->createOrder($create_order_data,$address_info);
            // 执行成功则删除购物车
            $this->delCart($car_ids);
            // 结束砍价
            isset($bargain_task) && $bargain_task ? $bargain_task->setBargainTaskEnd() : '';

            DB::commit();
            return $resp_data;
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug('createOrder:'.json_encode($e->getMessage()));
            DB::rollBack();
            OutputServerMessageException(__('orders.error'));
        }

    }

    // 如果是购物车订单，则删除购物车
    private function delCart($car_ids){
        if(count($car_ids) > 0){
            $cart_model = new Cart();
            try{
                $cart_model->whereIn('id',$car_ids)->delete();
            }catch(\Exception $e){
                throw new \Exception(__('orders.order_cart_del_error'));
            }
        }
    }


    // 创建订单后处理
    public function createOrderAfter(){
        $check = $this->base64Check();
        if(!$check['status']){
            OutputServerMessageException($check['msg']);
        }
        $params = $check['data'];
        $order_model = new Order;
        $list = $order_model->whereIn('id',$params['order_id'])->with('order_goods')->get();

        return $this->format(new CreateOrderAfterCollection($list));
    }

    // 销量消减增加 is_type 0 减少  1增加
    public function orderSale($goods_id,$num,$is_type=0){

        try{
            $goods_model = new Goods;
            if(empty($is_type)){
                $goods_model->where('id',$goods_id)->decrement('goods_sale',$num);
            }else{
                $goods_model->where('id',$goods_id)->increment('goods_sale',$num);
            }
        }catch(\Exception $e){
            throw new \Exception(__('base.error').' - stock');
        }

    }

    /**
     * // 支付订单 function
     *
     * @param string $order_id 如：10,12,13
     * @param string $payment_name 如：wechat_scan|balance|wechat_h5
     * @param string $pay_password 如：123456 （非必填,payment_name=balance则需要填写)
     * @param string $recharge 如：1 （非必填）
     * @return void
     * @Description
     *
     */
    public function payOrder(){
        $order_id = request()->order_id;
        $payment_name = request()->payment_name??'';

        // 检查支付方式是否传过来
        if(empty($payment_name)){
            OutputServerMessageException(__('orders.empty_payment'));
        }

        // 判断订单号是否为空
        if(empty($order_id)){
            OutputServerMessageException(__('orders.error').' - pay');
        }
        $order_arr = explode(',',$order_id); // 转化为数组
        $order_str = implode('',$order_arr); // 转化为字符串生成支付订单号

        // 获取用户信息
        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();
        if(empty($user_info)){
            OutputServerMessageException(__('user.no_token'));
        }

        // 判断是否订单是该用户的并且订单是否有支付成功过
        $order_model = new Order();
        // 判断是否存在 指定订单
        if(!$order_model->whereIn('id',$order_arr)->where('user_id',$user_info['id'])->exists()){
            OutputServerMessageException(__('orders.error').' - pay2');
        }
        // 判断是否已经支付过了
        $order_list = $order_model->whereIn('id',$order_arr)->where('user_id',$user_info['id'])->where('pay_status',PayStatus::PENDING)->get();
        if($order_list->isEmpty()){
            OutputServerMessageException(__('orders.order_pay'));
        }
        $collective_orders =  $order_model->whereIn('id',$order_arr)->where('user_id',$user_info['id'])->where('order_source','collective')->get();

        if($collective_orders)
        {
            foreach ($collective_orders as $key => $order)
            {
                if($order['collective_active_id'] > 0) {
                    $collective_active = CollectiveActive::where('id', $order['collective_active_id'])->first();
                    // 验证当前拼单是否允许加入新成员
                    if (!$collective_active->checkAllowJoin()) {
                        OutputServerMessageException($collective_active->error);
                    }
                }
            }
        }

        // 十秒钟不能重复支付 设计订单支付号 当前时间到秒的十位+用户ID+订单ID号
        $second = substr(date('YmdHis'),0,13);
        $pay_no = $second.$user_info['id'].$order_str; // 订单支付号
        $rs = $this->createPayOrder($user_info,$pay_no,$order_list);

        // 创建支付订单失败
        if(!$rs['status']){
            OutputServerMessageException($rs['msg']);
        }

        // 获取支付信息,调取第三方支付
        $payment_model = new PayMentService();
        $rs = $payment_model->pay($payment_name,$rs['data']);
        return $rs['status']?$this->format($rs['data']):$this->format_error($rs['msg']);

    }

    // 订单，创建支付订单
    // @param string $pay_no 支付订单号
    protected function createPayOrder($user_info,$pay_no='',$order_list=[]){
        // 创建支付订单
        $create_data = [];
        $order_ids = [];
        $total_price = 0;
        $order_balance = 0;
        foreach($order_list as $v){
            $order_ids[] = $v['id'];
            $total_price += $v['total_price'];
            $order_balance += $v['order_balance'];
        }
        $create_data = [
            'user_id'                   =>  $user_info['id'],
            'pay_no'                    =>  $pay_no,
            'order_ids'                 =>  implode(',',$order_ids),
            'pay_type'                  =>  'o',
            'total_price'               =>  $total_price, // 订单总金额
            'order_balance'             =>  $order_balance, // 余额支付金额
        ];

        $order_pay_model = new OrderPay();

        try{
            $order_pay_info = $order_pay_model->create($create_data);
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug($e->getMessage());
            OutputServerMessageException(__('orders.payment_failed'));
        }

        return $this->format($order_pay_info);

    }


    /**
     * 取消订单
     *
     * @param $order_id
     * @param $user_info
     * @return bool|mixed
     */
    public function cancel($order_id,$user_info)
    {
        $order_model = new Order;
        $order = $order_model->where('id',$order_id)->where('user_id',$user_info['id'])->first();
        if(empty($order)){
            OutputServerMessageException(__('users.error_token'));
        }
        if ($order['delivery_status'] == 20) {
            OutputServerMessageException("已发货订单不可取消，请申请售后");
        }
        // 订单是否已支付
        $isPay = $order['pay_status'] == PayStatus::SUCCESS;
        if($order['order_source'] == 'collective')
        {
            if($isPay)
            {
                $collective_active = $order->collective_active;
                if($collective_active['status'] == 'collecting')
                {
                    OutputServerMessageException("拼团中，取消失败。拼团失败会自动取消退款，或拼团成功后申请退款。");
                }
            }
        }
        try {
            DB::beginTransaction();
            // 未付款的订单
            if ($isPay == false) {
                // 回退商品库存
                $og_model = new OrderGoods();
                $og_list = $og_model->select('goods_id','sku_id','buy_num')->where('order_id',$order_id)->get();
                foreach($og_list as $v){
                    $this->orderStock($v['goods_id'],$v['sku_id'],$v['buy_num'],1);
                }
                // 回退用户优惠券 如果有优惠券则修改优惠券
                $coupon_log_model = new CouponLog();
                $coupon_log_model->where('order_id',$order_id)->update(['status'=>0,'order_id'=>0]);
            }
            $order->order_status = $isPay ? OrderStatus::APPLY_CANCEL : OrderStatus::CANCELLED;
            // 更新订单状态
            $order->save();
            DB::commit();
            return true;
        }catch(\Exception $e){
            DB::rollBack();
            Log::channel('afanti_log')->debug($e->getMessage());
            OutputServerMessageException("订单取消失败");
        }

    }

    //收货
    public function receipt($order_id,$user_info)
    {
        $order_model = new Order;
        $order = $order_model->where('id',$order_id)->where('user_id',$user_info['id'])->first();
        if(empty($order)){
            OutputServerMessageException(__('users.error_token'));
        }
        // 验证订单是否合法
        // 条件1: 订单必须已发货
        // 条件2: 订单必须未收货
        if ($order['delivery_status'] != DeliveryStatus::DELIVERED || $order['receipt_status']!= ReceiptStatus::UNRECEIVED) {
            OutputServerMessageException("该订单不合法");
        }
        try {
            DB::beginTransaction();
            // 订单是否已支付
            $order->receipt_status = ReceiptStatus::RECEIVED;
            $order->receipt_time = now();
            $order->order_status = OrderStatus::COMPLETED;
            $order->save();

            $order_complete_service = new OrderCompleteService();
            $order_complete_service->complete([$order]);
            DB::commit();
            return true;
        }catch(\Exception $e){
            DB::rollBack();
            Log::channel('afanti_log')->debug($e->getMessage());
            OutputServerMessageException("订单操作失败");
        }
    }

    // 地址验证
    public function checkAddress(){
        $id = request()->address_id??0;
        if(empty($id)){
            OutputServerMessageException(__('orders.no_address'));
        }
        $address_model = new Address();
        $address_info = $address_model->find($id);

        if(empty($address_info)){
            OutputServerMessageException(__('orders.no_address').'2');
        }

        return $this->format($address_info);
    }


}
