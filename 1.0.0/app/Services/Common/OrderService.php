<?php
namespace App\Services\Common;

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
use App\Models\Express;
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
use App\Services\BaseService;
use App\Services\UserService;

class OrderService extends BaseService{

    use HelperTrait;

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


    // 获取订单状态

    public function getOrderStatusCn($order_info){
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
            return __('orders.pay_status.'.$order_info['pay_status']).', '.__('orders.delivery_status.'.$order_info['delivery_status']);
            return '已付款，待发货';
        }
        if ($order_info['receipt_status'] == 10) {
            return __('orders.delivery_status.'.$order_info['delivery_status']).', '.__('orders.receipt_status.'.$order_info['receipt_status']);
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
