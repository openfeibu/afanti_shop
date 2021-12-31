<?php
namespace App\Services;

use App\Enums\Order\OrderStatus;
use App\Models\Goods;
use App\Models\Order;
use App\Models\OrderSettlement;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderSettlementService extends BaseService{

    /**
     * 订单结算
     *
     * @param boolean $auto 系统处理 | 手动处理
     * @return void
     * @Description
     *
     */
    public function add($auto=true){
        $order_model = new Order();

        $dateString = Carbon::parse('30 days ago')->toDateString(); // 30天前的数据 最多可结算
        $now = now();
        $order_status = OrderStatus::COMPLETED; // 订单完成状态
        $settlement_no = date('YmdHis').mt_rand(1000,9999); // 此处操作结算订单号

        $order_list = $order_model->whereDate('pay_time','>',$dateString)
                                    ->where('order_status',$order_status)
                                    ->where('is_settlement',0) // 未结算的
                                    ->with(['order_goods:order_id,goods_id,buy_num','distribution:id,order_id,commission','refund:id,order_id,refund_type,refund_verify']) // 获取 商品信息 | 分销信息 | 售后信息
                                    ->get();

        // 结算订单为空
        if($order_list->isEmpty()){
            return $this->format_error(__('admins.order_settlement_empty'));
        }

        $distribution_order = []; // 分销订单ID
        $order_settlement_array = []; // 结算信息
        $store_list = []; // 应该结算总金额 
        $order_goods_list = []; // 所有订单商品信息;
        foreach($order_list as $v){

            // 判断是否是售后订单 // 订单为换货的才能结算，退款的不予结算 | 退款状态 处理中不予结算
            if(!empty($v->refund) && ($v->refund->refund_type==1 && $v->refund->refund_verify>0)){
                continue;
            }

            $item = [];
            $item['order_id'] = $v->id;
            $item['user_id'] = $v->user_id;
            $item['settlement_no'] = $settlement_no;
            $item['total_price'] = $v->total_price; // 订单金额
            $item['settlement_price'] = $v->total_price; // 结算金额
            $item['status'] = 1; // 结算状态，暂时不知道什么用先全默认1
            $item['info'] = $auto?__('admins.order_settlement_auto'):__('admins.order_settlement_handle'); // 备注信息
            $item['created_at'] = $now;
            $item['updated_at'] = $now;


            // 如果order_goods 不为空 统计每个商品成功售卖的数量
            if(!empty($v->order_goods)){
                foreach($v->order_goods as $goods){
                    if(isset($order_goods_list[$goods['goods_id']])){
                        $order_goods_list[$goods['goods_id']] += $goods['buy_num'];
                    }else{
                        $order_goods_list[$goods['goods_id']] = $goods['buy_num'];
                    }
                    if (
                        !empty($goods['order_refund'])
                        && $goods['order_refund']['refund_type'] == 10      // 售后类型：退货退款
                        && $goods['order_refund']['is_agree'] == 10  // 商家审核：已同意
                    ) {
                        $item['settlement_price'] -= $goods['refund']['refund_money'];
                    }

                }
            }

            $order_settlement_array[] = $item;
        }

        // 循环进行插入 销售量
        foreach($order_goods_list as $k=>$v){
            Goods::where('id',$k)->increment('goods_sale',$v);
        }

        try{
            DB::beginTransaction();

            // 数据库处理日志
            $os_model = new OrderSettlement();
            $os_model->insert($order_settlement_array); // 插入结算日志数据库

            // 订单修改状态为已经结算
            $order_model->whereIn('id',$order_settlement_array)->update(['is_settlement'=>1]);

            DB::commit();
            return $this->format([]);
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug($e->getMessage());
            DB::rollBack();
            OutputServerMessageException(__('admins.order_settlement_error'));
        }

    }
}
