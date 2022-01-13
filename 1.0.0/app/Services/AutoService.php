<?php
namespace App\Services;

use App\Enums\Order\OrderStatus;
use App\Enums\Order\PayStatus;
use App\Models\CouponLog;
use App\Models\Order;
use App\Models\OrderGoods;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\Common\OrderService;

class AutoService extends BaseService{

    protected $config = [];
    public function __construct()
    {
        $config_service = new ConfigService();
        $this->config = $config_service->getFormatConfig('task');
    }
    
    /**
     * 定时任务
     *
     * @return void
     * @Description
     */
    public function autoTask(){
        try{
            $this->orderCancel(); // 取消
            $this->orderConfirm(); // 确认 
        }catch(\Exception $e){
            Log::channel('afanti_log')->debug($e->getMessage());
            echo 'fail';
        }
    }

    // 取消订单
    public function orderCancel(){

        $order_model = new Order();
        $order_service = new OrderService();

        // 将订单状态为 （未支付）时间在超过 配置时间的订单取消
        $order_list = $order_model->where('pay_status',PayStatus::PENDING)->where('created_at','<',Carbon::parse($this->config['cancel'].' days ago')->toDateTimeString())->get(); //update(['order_status'=>0,'updated_at'=>now()])
        if($order_list->isEmpty()){
            return $this->format_error('order list is empty in autoService');
        }
        $ids = [];
        foreach($order_list as $v){
            try{
                DB::beginTransaction();
                $order_id = $v['id'];
                $order = $order_model->where('id',$order_id)->first();
                $og_model = new OrderGoods();
                $og_list = $og_model->select('goods_id','sku_id','buy_num')->where('order_id',$order_id)->get();
                foreach($og_list as $v){
                    $order_service->orderStock($v['goods_id'],$v['sku_id'],$v['buy_num'],1);
                }
                // 如果有优惠券则修改优惠券
                $coupon_log_model = new CouponLog();
                $coupon_log_model->where('order_id',$order_id)->update(['status'=>0,'order_id'=>0]);

                $order->order_status = OrderStatus::CANCELLED;
                $order->save();

                DB::commit();
    
            }catch(\Exception $e){
                DB::rollBack();
                Log::channel('afanti_log')->debug($e->getMessage());
            }
        }
        
        $this->format([]);
    }

    // 自动确定订单 (并评价)
    public function orderConfirm(){
        $order_model = new Order();
        $oc_service = new OrderCommentService();

        // 将订单状态为 2 等待收货 3 确定收货 自动确认收货并评价
        $order_list = $order_model->select('id')->where([
            ['pay_status','=',20],
            ['delivery_status','=',20],
            ['receipt_status','=',10],
        ])->where('pay_time','<',Carbon::parse($this->config['confirm'].' days ago')->toDateTimeString())->get();
        if($order_list->isEmpty()){
            return $this->format_error('order list is empty in autoService');
            //OutputServerMessageException('order list is empty in autoService');
        }

        $ids = [];
        foreach($order_list as $v){$ids[] = $v['id'];}
        $order_model->whereIn('id',$ids)->update(['order_status'=>30,'receipt_status' => 20, 'receipt_time'=> now()]);
        return $this->success();
        /*
        $rs = $oc_service->systemAdd($ids);
        return $rs['status']?$this->format($rs['data']):$this->format_error($rs['msg']);
        */
    }

    // 自动结算
    public function orderSettlement(){
        $os_service = new OrderSettlementService();
        $rs = $os_service->add();
        return $rs['status']?$this->format($rs['data']):$this->format_error($rs['msg']);
    }
}
