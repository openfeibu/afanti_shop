<?php
namespace App\Services;

use App\Enums\Order\OrderStatus;
use App\Enums\Order\PayStatus;
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
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderService extends BaseService{

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
            OutputServerMessageException(__('base.error').' - order_service');
        }

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
            $resp_data = $checkout_service->createOrder($create_order_data);
            // 执行成功则删除购物车
            $this->delCart($car_ids);
            // 结束砍价
            isset($bargain_task) && $bargain_task ? $bargain_task->setBargainTaskEnd() : '';

            DB::commit();
            return $resp_data;
        }catch(\Exception $e){
            Log::channel('qwlog')->debug('createOrder:'.json_encode($e->getMessage()));
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

    // 库存消减增加 is_type 0 减少  1增加
    public function orderStock($goods_id,$sku_id,$num,$is_type=0){

        try{
            if(empty($sku_id)){
                $goods_model = new Goods;
                if(empty($is_type)){
                    $goods_model->where('id',$goods_id)->decrement('goods_stock',$num);
                }else{
                    $goods_model->where('id',$goods_id)->increment('goods_stock',$num);
                }
            }else{
                $goods_sku_model = new GoodsSku();
                if(empty($is_type)){
                    $goods_sku_model->where('id',$sku_id)->decrement('goods_stock',$num);
                }else{
                    $goods_sku_model->where('id',$sku_id)->increment('goods_stock',$num);
                }
            }
        }catch(\Exception $e){
            throw new \Exception(__('base.error').' - stock');
        }

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
            Log::channel('qwlog')->debug($e->getMessage());
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
            OutputServerMessageException("已发货订单不可取消");
        }
        try {
            DB::beginTransaction();
            // 订单是否已支付
            $isPay = $order['pay_status'] == PayStatus::SUCCESS;
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
            Log::channel('qwlog')->debug($e->getMessage());
            OutputServerMessageException("订单取消失败");
        }

    }


    /**
     * 订单状态修改 function
     *
     * @param [type] $order_id 订单ID
     * @param [type] $order_status 订单状态
     * @param [type] $auth 用户操作还是管理员操作 user|admin
     * @return void
     * @Description
     *
     */
    public function editOrderStatus($order_id,$order_status,$auth="user"){
        $order_model = new Order;
        $order_model = $order_model->where('id',$order_id);
        if($auth == 'user'){
            $user_service = new UserService;
            $user_info = $user_service->getUserInfo();
            if(empty($user_info)){
                OutputServerMessageException(__('users.no_token'));
            }
            // 用户不允许随意操作状态，只能修改 取消订单和确定订单
            if($order_status !=0 && $order_status !=4){
                OutputServerMessageException(__('base.error'));
            }
            $order_model = $order_model->where('user_id',$user_info['id']);
        }
        $order_model = $order_model->first();

        if(empty($order_model)){
            OutputServerMessageException(__('users.error_token'));
        }

        switch($order_status){
            case 0: // 取消订单
                if($order_model->order_status != 1){ // 只有待支付的订单能取消
                    OutputServerMessageException(__('base.error').' - 0');
                }
                $og_model = new OrderGoods();
                $og_list = $og_model->select('goods_id','sku_id','buy_num')->where('order_id',$order_id)->get();
                foreach($og_list as $v){
                    $this->orderStock($v['goods_id'],$v['sku_id'],$v['buy_num'],1);
                }
                // 如果有优惠券则修改优惠券
                $coupon_log_model = new CouponLog();
                $coupon_log_model->where('order_id',$order_id)->update(['status'=>0,'order_id'=>0]);

                // 库存修改
                break;
            case 1: // 等待支付
                break;
            case 2: // 等待发货
                break;
            case 3: // 确认收货
                if(empty($order_model->delivery_no) || empty($order_model->delivery_code)){ // 只有待支付的订单能取消
                    OutputServerMessageException(__('base.error').' - 3');
                }
                break;
            case 4: // 等待评论
                break;
            case 5: // 5售后
                break;
            case 6: // 6订单完成
                break;
        }
        $order_model->order_status = $order_status;
        $order_model->save();
        return $this->format([$order_status],__('base.success'));
    }



    // 计算运费
    // @param mixed $freight_id 运费模版
    // @param mixed $total_weight 总重量
    // @param mixed $store_id 店铺ID
    // @param mixed $area_id 省份ID
    public function sumFreight($freight_id,$total_weight,$area_id){
        $freight_model = new Freight();
        $default_info = $freight_model->where('is_type',0)->first(); // 默认快递模版
        if($freight_id == 0){ // 默认模版
            $info = $default_info;
        }else{
            $info = $freight_model->find($freight_id);
        }

        if(empty($info) || ($info->f_weight==0 && $info->f_price==0)){
            return 0;
        }

        $area = [];
        if(!empty($info->area_id)){
            $area = explode(',',$info->area_id);
        }
        // 如果配送地址不存在 商家配置的地址则走默认的
        if(!in_array($area_id,$area)){
            $info = $default_info;
        }

        // 如果没有设置则为0
        if($info->f_weight==0 && $info->f_price==0){
            return 0;
        }

        // 如果设置了运费，没设置重量则代表无限重量 同一运费
        if($info->f_weight ==0 && $info->f_price>0 ){
            return $info->f_price;
        }

        // 如果首重和首价格设置了
        if(($info->f_weight >0 && $info->f_price>0)){
            // 判断是否重量有超过
            if($info->f_weight>=$total_weight){
                return $info->f_price;
            }else{
                // 超过了则开始分析是否有超出另外计价
                if($info->o_weight==0 && $info->o_price==0){
                    return $info->f_price;
                }
                // 超过了则开始分析是否有配置超出另外计价
                if($info->o_weight==0 && $info->o_price==0){
                    return $info->f_price;
                }
                // 超过了则开始分析是否有超出另外计价
                if($info->o_weight>0 ){
                    $o_num = ceil(($total_weight-$info->f_weight)/$info->o_weight); // 超出的倍数
                    return round($info->f_price+($o_num*$info->o_price),2);
                }
            }
        }

        return 0;
    }

    public function getCheckoutOrderGoodsList($params)
    {
        foreach($params['order'] as $v){
            $goods = Goods::select('id','store_id','goods_name','goods_master_image','goods_price','goods_stock','goods_weight','freight_id','goods_status')->where('id',$v['goods_id'])->first();
            $store = $goods->store()->first(['id','store_name','store_logo']);
            if(!$goods or $goods['goods_status'] != 1)
            {
                throw new OutOfStockException(__('orders.goods_failure'));
            }
            // 判断是否库存足够
            if($v['buy_num']>$goods['goods_stock']){
                throw new OutOfStockException(__('orders.stock_error'));
            }
            if($v['sku_id']>0){
                $goods_sku = GoodsSku::select('id','sku_name','goods_price','goods_stock','goods_weight')->where('goods_id',$v['goods_id'])->where('id',$v['sku_id'])->first();
                $goods['sku_name'] = $goods_sku['sku_name'];
                $goods['goods_price'] = $goods_sku['goods_price'];
                $goods['goods_stock'] = $goods_sku['goods_stock'];
                $goods['goods_weight'] = $goods_sku['goods_weight'];
            }
            $goods['goods_master_image'] = $this->thumb($goods['goods_master_image'],150);
            $goods['total_price'] = round($v['buy_num']*$goods['goods_price'],2);
            $goods['total_weight'] = round($v['buy_num']*$goods['goods_weight'],2);
            $goods['original_price'] = $goods['goods_price'];
            $goods['buy_num'] = $v['buy_num'];
            $goods['coupon_money'] = 0;
            $goods['full_reduction_money'] = 0;

            $store_goods_list[$store['id']]['goods_list'][] = $goods;
            $store_goods_list[$store['id']]['store_info'] = $store;
            if(empty($store_goods_list[$store['id']]['store_total_price'])){
                $store_goods_list[$store['id']]['store_total_price'] = 0;
            }
            $store_goods_list[$store['id']]['store_total_price'] += $goods['total_price'];

        }
        return $store_goods_list;
    }

    // base64 代码验证
    public function base64Check(){
        $base64 = request()->params??'';

        // 如果为空
        if(empty($base64)){
            OutputServerMessageException(__('orders.error'));
        }

        // 判断是否能解析
        try{
            $params = json_decode(base64_decode($base64),true);
        }catch(\Exception $e){
            OutputServerMessageException(__('orders.error').'2');
        }
        return $this->format($params);
    }

    // 获取订单
    public function getOrders($type="user"){
        $order_model = new Order();

        if($type == 'user'){
            $user_service = new UserService;
            $user_info = $user_service->getUserInfo();
            $order_model = $order_model->where('user_id',$user_info['id']);
        }
        if($type == 'seller'){
            $store_id = $this->get_store(true);
            $order_model = $order_model->where('store_id',$store_id);
        }

        $order_model = $order_model->with(['user'=>function($q){
            return $q->select('id','username');
        },'order_goods']);

        // 订单号
        $order_no  = request()->order_no;
        if(!empty($order_no)){
            $order_model = $order_model->where('order_no','like','%'.$order_no.'%');
        }

        // 拼团订单ID查询
        $collective_active_id = request()->collective_active_id;
        if(!empty($collective_active_id)){
            $order_model = $order_model->where('collective_active_id',$collective_active_id);
        }

        // 用户ID
        $user_id = request()->user_id;
        if(!empty($user_id)){
            $order_model = $order_model->where('user_id',$user_id);
        }

        // 店铺ID
        $store_id = request()->store_id;
        if(!empty($store_id)){
            $order_model = $order_model->where('store_id',$store_id);
        }

        // 下单时间
        $created_at = request()->created_at;
        if(!empty($created_at)){
            $order_model = $order_model->whereBetween('created_at',[$created_at[0],$created_at[1]]);
        }

        // 订单状态
        if(isset(request()->order_status) && request()->order_status!=-1){
            $order_model = $order_model->where('order_status',request()->order_status);
        }

        // 获取退款订单
        if(isset(request()->is_refund)){
            $order_model = $order_model->where('order_status',5)->where('refund_status',0);
        }

        // 获取退货订单
        if(isset(request()->is_return)){
            $order_model = $order_model->where('order_status',5)->where('refund_status',1);
        }

        $order_model = $order_model->orderBy('id','desc')
            ->paginate(request()->per_page??30);
        return $this->format($order_model);
    }

    // 获取订单信息通过订单ID 默认是需要用用户
    public function getOrderInfoById($id,$auth='user'){
        $order_model = new Order();

        if($auth=='user'){
            $user_service = new UserService;
            $user_info = $user_service->getUserInfo();
            $order_model = $order_model->where('user_id',$user_info['id']);
        }

        if($auth=='seller'){
            $store_id = $this->get_store(true);
            $order_model = $order_model->where('store_id',$store_id);
        }

        $order_info = $order_model->with('order_goods')->where('id',$id)->first();
        return $this->format($order_info);
    }

    // 获取订单状态

    public function getOrderStatusCn($order_info){

        switch ($order_info['order_source'])
        {
            case 'collective':
                // 付款状态
                if ($order_info['pay_status'] == 10) {
                    return '待付款';
                }
                $collective_active = $order_info->collective_active;
                if(!$collective_active)
                {
                    return "待付款";
                }
                $order_info['active_status'] = $collective_active['status'];
                // 订单状态：已完成
                if ($order_info['order_status'] == 30) {
                    return '已完成';
                }
                // 订单状态：已取消
                if ($order_info['order_status'] == 20) {
                    // 拼单未成功
                    if ($order_info['active_status'] == 30) {
                        return $order_info['is_refund'] ? '拼团未成功，已退款' : '拼团未成功，待退款';
                    }
                    return '已取消';
                }
                // 拼单未成功
                if ($order_info['active_status'] == 'failed-collect') {
                    return $order_info['is_refund'] ? '拼团未成功，已退款' : '拼团未成功，待退款';
                }
                // 拼单中
                if ($order_info['active_status'] == 'collecting') {
                    return '已付款，待成团';
                }
                // 拼单成功
                if ($order_info['active_status'] == 'collected') {
                    if ($order_info['delivery_status'] == 10) {
                        return '拼团成功，待发货';
                    }
                    if ($order_info['receipt_status'] == 10) {
                        return '已发货，待收货';
                    }
                }
                return "未知订单";
                break;
            default:
                // 订单状态
                if (in_array($order_info['order_status'], [20, 30])) {
                    return  __('orders.order_status.'.$order_info['order_status']);
                }
                // 付款状态
                if ($order_info['pay_status'] == 10) {
                    return __('orders.pay_status.'.$order_info['pay_status']);
                }
                // 订单类型：单独购买
                if ($order_info['delivery_status'] == 10) {
                    return __('orders.delivery_status.'.$order_info['delivery_status']);
                }
                if ($order_info['receipt_status'] == 10) {
                    return __('orders.delivery_status.'.$order_info['delivery_status']).', '.__('orders.receipt_status.'.$order_info['receipt_status']);
                }
                break;
        }


        if($order_info['order_source'] == 'collective')
        {
            // 拼单未成功
            if ($order_info['active_status'] == 30) {
                return $order_info['is_refund'] ? '拼团未成功，已退款' : '拼团未成功，待退款';
            }
            // 拼单中
            if ($order_info['active_status'] == 10) {
                return '已付款，待成团';
            }
            // 拼单成功
            if ($order_info['active_status'] == 20) {
                if ($order_info['delivery_status'] == 10) {
                    return '拼团成功，待发货';
                }
                if ($order_info['receipt_status'] == 10) {
                    return '已发货，待收货';
                }
            }
        }

        return "未知订单";

    }

    // 获取支付类型
    public function getOrderPayMentCn($payment_name){
        $cn = '未支付';
        switch($payment_name){
            case 'wechat':
                $cn = __('orders.payment_name.payment_wechat');
                break;
            case 'ali':
                $cn = __('orders.payment_name.payment_ali');
                break;
            case 'money':
                $cn = __('orders.payment_name.payment_money');
                break;
        }
        return $cn;
    }


}
