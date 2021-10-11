<?php
namespace App\Services;

use App\Exceptions\OutOfStockException;
use App\Http\Resources\Home\OrderResource\CreateOrderAfterCollection;
use App\Models\Address;
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
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckoutService extends BaseService{

    /* $model Order 订单模型 */
    public $model;

    /* @var UserModel $user 当前用户信息 */
    private $user;

    // 订单结算商品列表
    private $store_goods_list = [];

    /**
     * 订单结算api参数
     * @var array
     */
    private $params = [

    ];
    /**
     * 订单结算的规则
     * @var array
     */
    private $checkoutRule = [
        'is_default_coupon' => false,        // 默认优惠券, 只有显示列表，才true，提交默认false
        'is_coupon' => true,        // 优惠券抵扣
        'is_full_reduction' => true,
        'is_default_collective' => true, //默认团购，具体还是根据 collective_active_id
    ];

    private $create_order_data = [
        'total_price' => 0,
        'order_price' => 0,
        'total_discount' => 0,  //总优惠金额
    ];
    /**
     * 构造函数
     * Checkout constructor.
     */
    public function __construct()
    {
        $this->model = new Order();
    }
    /**
     * 设置结算台请求的参数
     * @param $params
     * @return array
     */
    public function setParams($params)
    {
        $this->params = array_merge($this->params, $params);
        return $this->getParams();
    }

    /**
     * 获取结算台请求的参数
     * @return array
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * 订单结算的规则
     * @param $data
     * @return $this
     */
    public function setCheckoutRule($data)
    {
        $this->checkoutRule = array_merge($this->checkoutRule, $data);
        return $this;
    }

    public function onCheckout($user, $store_goods_list)
    {
        $this->user = $user;
        $this->store_goods_list = $store_goods_list;
        // 订单确认-立即购买
        return $this->checkout();
    }

    // 根据订单ID获取商品数据并格式化
    private function checkout(){
        $this->cartId = []; // 购物车ID 初始化
        $collective_active_id = 0;
        $total_weight = 0;
        $discount = 0;

        foreach($this->store_goods_list as $key => $store_list)
        {
            foreach ($store_list['goods_list'] as $key => $goods)
            {
                $this->create_order_data['order_image'] = $this->create_order_data['order_image'] ?? $goods['goods_master_image'];
                $this->create_order_data['order_name'] = $this->create_order_data['order_name'] ?? $goods['goods_name'];
                $this->create_order_data['freight_id'] = isset($this->create_order_data['freight_id']) ? $this->create_order_data['freight_id'] : $goods['freight_id'];
                $this->create_order_data['order_price'] += $goods['total_price'];
                $total_weight += $goods['total_weight'];
            }
        }

        $this->create_order_data['collective_active_id'] = $collective_active_id;

        $this->store_goods_list = array_merge($this->store_goods_list,[]);
        $this->create_order_data['list'] = $this->store_goods_list;

        // 循环查看是否存在优惠券
        $coupon_list = $this->getUserCouponList($this->create_order_data['order_price']);
        $this->setOrderCouponMoney($coupon_list);

        //满减
        $this->setFullReduction($this->create_order_data['order_price']);

        $this->setOrderGoodsPayPrice();

        $this->setCollective($this->create_order_data['order_price']);

        $this->create_order_data['total_weight'] = $total_weight;
        return $this->create_order_data;
    }
    /**
     * 计算订单商品的实际付款金额
     * @return bool
     */
    private function setOrderGoodsPayPrice()
    {
        // 商品总价 - 优惠抵扣
        foreach($this->store_goods_list as $key => &$store_list) {
            foreach ($store_list['goods_list'] as $goods_key => &$goods) {
                // 减去优惠券抵扣金额
                $value = bcsub($goods['total_price'], $goods['coupon_money']);
                $goods['total_pay_price'] = number2($value);
            }
        }

        return true;
    }


    /**
     * 团购
     * @param $orderTotalPrice
     * @return mixed
     */
    private function setCollective($orderTotalPrice)
    {
        // 是否开启优惠券折扣
        if (!$this->checkoutRule['is_default_collective']) {
            return false;
        }
        $collective_active_id = 0;

        foreach($this->params['order'] as $v){
            // 判断是否是团购
            $collective_active_id = $collective_active_id ?: ($v['collective_active_id'] ?? 0);
        }

        $this->create_order_data['collective_active_id'] = $collective_active_id;
        if(!$collective_active_id)
        {
            return false;
        }
        $collective_service = new CollectiveService();
        // 判断是否是拼团 如果是拼团减去他的金额
        if($this->create_order_data['collective_active_id'] != 0){
            $collective_resp = $collective_service->getCollectiveInfoByGoodsId($this->params['order'][0]['goods_id']);
            if($collective_resp['status']){
                $this->create_order_data['total_discount'] +=  $this->create_order_data['order_price']*($collective_resp['data']['discount']/100); // 得出拼团减去的钱
            }
        }
        return true;

    }

    /**
     * 当前用户可用的优惠券列表
     * @param $orderTotalPrice
     * @return mixed
     */
    private function getUserCouponList($orderTotalPrice)
    {
        // 是否开启优惠券折扣
        if (!$this->checkoutRule['is_coupon']) {
            return [];
        }
        return CouponLog::select('id','money','name')->where('user_id',$this->user['id'])
            ->where('use_money','<=',$orderTotalPrice)
            ->where('status',0)
            ->get();
    }

    /**
     * 设置订单优惠券抵扣信息
     * @param array $coupon_list 当前用户可用的优惠券列表
     * @return bool
     */
    private function setOrderCouponMoney($coupon_list)
    {
        // 是否开启优惠券折扣
        if (!$this->checkoutRule['is_coupon']) {
            return false;
        }
        if(isset($this->params['coupon_id'])){
            $coupon_id = $this->params['coupon_id'] ?: 0;
        } else {
            if(!$this->checkoutRule['is_default_coupon'])
            {
                return false;
            }
            $coupon_id = $coupon_list->isEmpty() ? 0 : $coupon_list[0]['id'];
        }

        // 如果没有可用的优惠券，直接返回
        if ($coupon_id <= 0 || empty($coupon_list)) {
            return false;
        }
        // 获取优惠券信息
        $coupon = getArrayItemByColumn($coupon_list, 'id', $coupon_id);
        if ($coupon == false) {
            OutputServerMessageException('未找到优惠券信息');
        }
        // 计算订单商品优惠券抵扣金额
        $columns = ['total_price'];
        $goodsListTemp = [];
        foreach($this->store_goods_list as $key => $store_list) {
            foreach ($store_list['goods_list'] as $goods_key => $goods) {
                $temp = [];
                foreach ($columns as $index) {
                    $temp[$index] = $goods[$index];
                }
                $goodsListTemp[] = $temp;
            }
        }

        $deductMoney = new CouponGoodsDeductService();
        $completed = $deductMoney->setGoodsCouponMoney($goodsListTemp, $coupon['money']);

        // 分配订单商品优惠券抵扣金额
        $i=0;
        foreach($this->store_goods_list as $key => &$store_list) {
            foreach ($store_list['goods_list'] as $goods_key => &$goods) {
                $goods['coupon_money'] = $completed[$i]['coupon_money'] / 100;
                $i++;
            }
        }

        // 记录订单优惠券信息
        $this->create_order_data['coupon']['is_coupon'] = $coupon_list->isEmpty() ? false : true;
        $this->create_order_data['coupon']['coupons'] = $coupon_list;
        $this->create_order_data['coupon']['coupon_id'] = $coupon_id;
        $this->create_order_data['total_discount'] += $coupon['money'];
        return true;
    }

    /**
     * 满减
     * @param $orderTotalPrice
     * @return mixed
     */
    private function setFullReduction($orderTotalPrice)
    {
        // 是否开启优惠券折扣
        if (!$this->checkoutRule['is_full_reduction']) {
            return false;
        }
        $full_reduction_service = new FullReductionService();
        // 满减
        $full_reduction_resp = $full_reduction_service->getFullReductionInfo($orderTotalPrice);
        if(!$full_reduction_resp)
        {
            return false;
        }

        // 计算订单商品优惠券抵扣金额
        $columns = ['total_price'];
        $goodsListTemp = [];
        foreach($this->store_goods_list as $key => $store_list) {
            foreach ($store_list['goods_list'] as $goods_key => $goods) {
                $temp = [];
                foreach ($columns as $index) {
                    $temp[$index] = $goods[$index];
                }
                $goodsListTemp[] = $temp;
            }
        }

        $deductMoney = new CouponGoodsDeductService();
        $completed = $deductMoney->setGoodsCouponMoney($goodsListTemp, $full_reduction_resp['money']);

        // 分配订单商品满减抵扣金额
        $i=0;
        foreach($this->store_goods_list as $key => &$store_list) {
            foreach ($store_list['goods_list'] as $goods_key => &$goods) {
                $goods['full_reduction_money'] = $completed[$i]['coupon_money'] / 100;
                $i++;
            }
        }
        $this->create_order_data['total_discount'] += $full_reduction_resp['money'];
        return true;
    }
}