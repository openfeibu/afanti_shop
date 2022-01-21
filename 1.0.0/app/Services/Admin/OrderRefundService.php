<?php
namespace App\Services\Admin;

use App\Models\Order;
use App\Models\OrderRefund;
use App\Services\BaseService;
use App\Services\MessageService;
use App\Services\PayMentService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderRefundService extends BaseService{

    public function getOrderRefunds()
    {
        $order_refund_model = new OrderRefund();

        $order_refund_model = $order_refund_model->with(['user'=>function($q){
            return $q->select('id','username','avatar');
        },'order_goods']);

        // 用户ID
        $user_id = request()->user_id;
        if(!empty($user_id)){
            $order_refund_model = $order_refund_model->where('user_id',$user_id);
        }
        // 时间
        $created_at = request()->created_at;
        if(!empty($created_at)){
            $order_refund_model = $order_refund_model->whereBetween('created_at',[$created_at[0],$created_at[1]]);
        }

        $order_refund_model = $order_refund_model->orderBy('id','desc')
            ->paginate(request()->per_page??30);

        return $order_refund_model;
    }
    public function getOrderRefundById($id)
    {
        $order_refund = OrderRefund::where('id',$id)->with(['user'=>function($q){
            return $q->select('id','username','avatar');
        },'order_goods','order'])
            ->first();
        if(!$order_refund)
        {
            OutputServerMessageException("售后订单不存在");
        }
        return $order_refund;
    }
    public function audit($order_refund,$data)
    {
        if ($data['is_agree'] == 20 && empty($data['refuse_desc'])) {
            OutputServerMessageException('请输入拒绝原因');
            return false;
        }
        if ($data['is_agree'] == 10 && (empty($data['return_name']) || empty($data['return_phone']) || empty($data['return_address']))) {
            OutputServerMessageException('请完善退货信息');
            return false;
        }
        try {
            DB::beginTransaction();
            // 拒绝申请, 标记售后单状态为已拒绝
            $data['is_agree'] == 20 && $order_refund->status = 10;
            // 同意换货申请, 标记售后单状态为已完成
            $data['is_agree'] == 10 && $order_refund['refund_type'] == 20 && $order_refund->status = 20;
            // 更新退款单状态

            $order_refund->is_agree =  $data['is_agree'];
            $order_refund->refuse_desc =  $data['refuse_desc'] ?? '';

            // 同意售后申请, 记录退货地址
            if ($data['is_agree'] == 10) {
                $order_refund->return_name = $data['return_name'] ?? '';
                $order_refund->return_phone = $data['return_phone'] ?? '';
                $order_refund->return_address = $data['return_address'] ?? '';
            }
            $order_refund->save();
            $message_service = new MessageService();

            $order_no = $order_refund->order['order_no'];
            if($order_refund['refund_type'] == 20)
            {

                if($data['is_agree'] == 10)
                {
                    $content = sprintf(trans('messages.order.return.agree'),$order_no) ;
                }else{
                    $content = sprintf(trans('messages.order.return.reject'),$order_no) ;
                }
            }else{
                if($data['is_agree'] == 10)
                {
                    $content = sprintf(trans('messages.order.refund.agree'),$order_no) ;
                }else{
                    $content = sprintf(trans('messages.order.refund.reject'),$order_no) ;
                }
            }
            $message_service->send($order_refund['user_id'],$content);
            // 订单详情
            // 发送模板消息
            // 事务提交
            DB::commit();
            return true;
        } catch (\Exception $e) {
            Log::channel('afanti_log')->debug('auditOrderRefund:'.json_encode($e->getMessage()));
            DB::rollBack();
            OutputServerMessageException(__('orders.error'));
        }
    }
    public function receipt($order_refund,$data)
    {
        // 订单详情
        $order = $order_refund->order;
        if ($data['refund_money'] > min($order['total_price'], $order_refund['order_goods']['total_pay_price'])) {
            $order_refund->error = '退款金额不能大于商品实付款金额';
            return false;
        }
        DB::beginTransaction();
        // 更新售后单状态
        $order_refund->refund_money = $data['refund_money'];
        $order_refund->is_receipt = 1;
        $order_refund->status = 20;
        $order_refund->save();
        // 消减用户的实际消费金额
        // 条件：判断订单是否已结算
        if ($order['is_settlement'] == true) {

        }
        // 执行原路退款
        $payment_service = new PayMentService();
        $payment_service->refund($order,$data['refund_money']);
        // 发送消息
        $message_service = new MessageService();
        $message_service->send($order['user_id'],sprintf(trans('messages.order.refund.success'),$order['order_no']));
        
        DB::commit();
        return true;
    }
}