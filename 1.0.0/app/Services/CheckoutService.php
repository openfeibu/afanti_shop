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
use App\Services\Home\OrderService;

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
        'is_full_reduction' => true, //满减
        'is_collective' => true, //默认团购，具体还是根据 collective_active_id
        'is_seckill' => true, //秒杀
    ];

    /**
     * 订单来源
     * @var array
     */
    private $order_source = [
        'source' => 'common',
        'source_id' => 0,
    ];


    private $create_order_data = [
        'total_price' => 0,
        'order_price' => 0,
        'coupon_money' => 0,
        'full_reduction_money' => 0,
        'total_discount' => 0,  //总优惠金额
        'collective_active_id' => 0,
        'discount' => '0', // 不含优惠券 用于前端选择优惠券计算
        'order_source' => 'common', //
        'order_source_id' => 0, //
        'coupon' => [
            'coupon_id' => 0,
            'is_coupon' => false,
            'coupons' => [],
        ],
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


    /**
     * 设置订单来源(普通订单、砍价订单、秒杀订单)
     * @param $data
     * @return $this
     */
    public function setOrderSource($data)
    {
        $this->order_source = array_merge($this->order_source, $data);
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
        $total_weight = 0;

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

        $this->store_goods_list = array_merge($this->store_goods_list,[]);
        $this->create_order_data['list'] = $this->store_goods_list;

        //拼团，不参与秒杀，满减，优惠
        $this->setCollective($this->create_order_data['order_price']);
        //秒杀，不参与拼团，满减，优惠
        $this->setSeckill();

        // 循环查看是否存在优惠券
        $coupon_list = $this->getUserCouponList($this->create_order_data['order_price']);
        $this->setOrderCouponMoney($coupon_list);

        // 满减
        $this->setFullReduction($this->create_order_data['order_price']);

        $this->setOrderGoodsPayPrice();

        $this->create_order_data['total_weight'] = $total_weight;
        return $this->create_order_data;
    }
    public function createOrder($create_order_data,$address_info)
    {
        // 实例化订单表
        $order_model = new Order();
        $order_goods_model = new OrderGoods();
        $order_service = new OrderService();

        $resp_data = [];
        $make_rand = date('YmdHis').$this->user['id'].mt_rand(1000,9999); // 生成订单号

        $order_data = [
            'order_no'                  =>  $make_rand, // 订单号
            'user_id'                   =>  $this->user['id'], // 用户ID
            'order_name'                =>  $create_order_data['order_name'], // 商品ID
            'order_image'               =>  $create_order_data['order_image'], // 商品图片
            'receive_name'              =>  $address_info['receive_name'], // 收件人姓名
            'receive_tel'               =>  $address_info['receive_tel'], // 收件人电话
            'receive_area'              =>  $address_info['area_info'], // 收件人地区
            'receive_address'           =>  $address_info['address'], // 详细地址
            'coupon_id'                 =>  isset($create_order_data['coupon']['coupon_id'])?intval(abs($create_order_data['coupon']['coupon_id'])):0, // 优惠券ID
            'remark'                    =>  request()->remark??'', // 备注
        ];

        $order_info = $order_model->create($order_data); // 订单数据插入数据库

        // 初始化其他费用
        $total_price = 0 ; // 总金额
        $order_price = 0 ; // 订单总金额
        $total_weight = 0; // 总重量
        $freight_money = 0; // 运费
        $coupon_money = 0; // 优惠券 金额

        foreach($create_order_data['list'] as $k=>$v){
            // 循环将订单商品插入
            foreach($v['goods_list'] as $vo){
                $order_goods_data = [
                    'order_id'      =>$order_info->id, // 订单ID
                    'user_id'       =>$order_data['user_id'], // 用户ID
                    'store_id'      =>$vo['store_id'], // 店铺ID
                    'sku_id'        =>$vo['sku_id'] ?: 0, // skuid
                    'goods_id'      =>$vo['id'], // 商品id
                    'goods_name'    =>$vo['goods_name'], // 商品名称
                    'goods_image'   =>$vo['goods_master_image'], // 商品图片
                    'sku_name'      =>$vo['sku_name'] ?: '', // sku名称
                    'buy_num'       =>$vo['buy_num'], // 购买数量
                    'goods_price'   =>$vo['goods_price'], // 商品价格
                    'original_price'   =>$vo['original_price'], // 商品原价
                    'total_price'   =>$vo['total_price'], // 总价格
                    'total_pay_price'   =>$vo['total_pay_price'], // 商品应付价格
                    'total_weight'  =>$vo['total_weight'], // 总重量
                    'coupon_money'   => $vo['coupon_money'], // 优惠券
                    'full_reduction_money'   =>$vo['full_reduction_money'], // 满减
                ];

                /*
                // 秒杀
                $seckill_info = $seckill_service->getSeckillInfoByGoodsId($order_goods_data['goods_id']);
                if($seckill_info){
                    $coupon_money += $order_goods_data['total_price']*($seckill_info['data']['discount']/100);
                }
                */

                $order_goods_model->create($order_goods_data); // 插入订单商品表

                // 开始减去库存
                $order_service->orderStock($order_goods_data['goods_id'],$order_goods_data['sku_id'],$order_goods_data['buy_num']);

                // 将商品总总量加起来
                $total_weight += $order_goods_data['total_weight'];

            }
        }
        $this->useCoupon($order_data['coupon_id'], $order_info->id);

        $freight_money = $order_service->sumFreight( $create_order_data['freight_id'],$total_weight,$address_info['province_id']); // 直接计算运费，如果多个不同的商品取第一个商品的运费

        // 订单总金额做修改，然后保存
        $total_price = $create_order_data['order_price']+$freight_money-$create_order_data['total_discount']; // 暂时总金额等于[订单金额+运费-优惠金额]

        $resp_data['order_id'][] = $order_info->id;
        $resp_data['order_no'][] = $make_rand;
        $order_info->total_price = round($total_price,2);
        $order_info->order_price = $create_order_data['order_price'];
        $order_info->freight_money = $freight_money; // 运费
        $order_info->coupon_money = $create_order_data['coupon_money']; // 优惠金额修改
        $order_info->full_reduction_money = $create_order_data['full_reduction_money']; // 优惠金额修改
        $order_info->total_discount = $create_order_data['total_discount']; // 优惠金额修改
        $order_info->coupon_id = $order_data['coupon_id']; // 优惠券ID修改 ，以免非法ID传入
        $order_info->collective_active_id = $create_order_data['collective_active_id'] ?: 0; // 团购活动ID
        $order_info->order_source = $this->order_source['source']; //普通下单，团购，秒杀，砍价
        $order_info->order_source_id = $this->order_source['source_id'];
        $order_info->save(); // 保存入数据库

        return $this->format($resp_data);

    }

    /**
     * 计算订单商品的实际付款金额
     * @return bool
     */
    private function setOrderGoodsPayPrice()
    {

        // 商品总价 - 优惠券 - 满减
        foreach($this->store_goods_list as $key => &$store_list) {
            foreach ($store_list['goods_list'] as $goods_key => &$goods) {
                // 减去优惠券抵扣金额
                $goods_total_discount = (float)bcadd($goods['coupon_money'], $goods['full_reduction_money'], 2);
                $value = (float)bcsub($goods['total_price'], $goods_total_discount, 2);
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
        if (!$this->checkoutRule['is_collective']) {
            return false;
        }
        $collective_active_id = 0;

        foreach($this->params['order'] as $v){
            // 判断是否是团购
            $collective_active_id = $collective_active_id ?: ($v['collective_active_id'] ?? 0);
        }
        if(!$collective_active_id)
        {
            return false;
        }
        $collective_service = new CollectiveService();
        // 判断是否是拼团 如果是拼团减去他的金额
        $collective_resp = $collective_service->getCollectiveInfoByGoodsId($this->params['order'][0]['goods_id']);
        if($collective_resp['status']){
            $discount = $this->create_order_data['order_price']*($collective_resp['data']['discount']/100);
            $this->create_order_data['total_discount'] += $discount; // 得出拼团减去的钱
            $this->create_order_data['discount'] += $discount;
            $this->create_order_data['collective_active_id'] = $collective_active_id;
            $this->setOrderSource([
                'source' => 'collective',
                'source_id' => $collective_active_id,
            ]);
            $this->setCheckoutRule([
                'is_coupon' => false,        // 优惠券抵扣
                'is_full_reduction' => false,
                'is_seckill' => false,
            ]);
            return true;
        }
        return false;
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
        $this->create_order_data['coupon_money'] = $coupon['money'];
        return true;
    }

    public function useCoupon($coupon_id,$order_id)
    {
        if(!$coupon_id)
        {
            return false;
        }
        $cpli = CouponLog::where('id',$coupon_id)
           ->first();
        if(empty($cpli)){
            return false;
        }
        $cpli->status = 1;
        $cpli->order_id = $order_id;
        $cpli->save();
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
        $this->create_order_data['discount'] += $full_reduction_resp['money'];
        $this->create_order_data['full_reduction_money'] = $full_reduction_resp['money'];
        return true;
    }
    //秒杀
    public function setSeckill()
    {
        // 是否参与秒杀活动
        if (!$this->checkoutRule['is_seckill']) {
            return false;
        }
        // 秒杀
        $seckill_service = new SeckillService();
        $seckill_info = $seckill_service->getSeckillInfoByGoodsId($this->params['order'][0]['goods_id']);
        if(!$seckill_info)
        {
            return false;
        }
        $i=0;
        foreach($this->store_goods_list as $key => &$store_list) {
            foreach ($store_list['goods_list'] as $goods_key => &$goods) {
                $discount = number2($goods['goods_price']*($seckill_info['discount']/100));
                $goods['goods_price'] = number2($goods['goods_price'] - $discount);
                $i++;
                $goods['total_price'] = $goods['goods_price'] * $goods['buy_num'];
                $this->create_order_data['order_price'] = $goods['total_price'];
            }
        }
        $this->setOrderSource([
            'source' => 'seckill',
            'source_id' => $seckill_info['id'],
        ]);
        $this->setCheckoutRule([
            'is_coupon' => false,        // 优惠券抵扣
            'is_full_reduction' => false,
            'is_collective' => false,
        ]);
        return true;
    }

}