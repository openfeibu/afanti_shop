<?php
namespace App\Services;

use App\Models\Order;
use App\Models\OrderRefund;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderRefundService extends BaseService{
    /**
     * 新增售后单记录
     * @param $user_info
     * @param $order_goods
     * @return bool
     * @throws \Exception
     */
    public function apply($user_info, $order_goods)
    {
        try {
            DB::beginTransaction();

            $order_refund_model = new OrderRefund();
            $images = request()->images??'';
            $refund_type = request()->refund_type??10;
            $apply_desc = request()->apply_desc??'';

            $order_refund_model->user_id = $user_info['id'];
            $order_refund_model->order_goods_id = $order_goods['id'];
            $order_refund_model->order_id =  $order_goods['order_id'];
            $order_refund_model->refund_type = $refund_type;
            $order_refund_model->images = $images;
            $order_refund_model->apply_desc = $apply_desc;
            $order_refund_model->is_agree = 0;
            $order_refund_model->status = 0;
            $order_refund_model->save();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::channel('qwlog')->debug($e->getMessage());
            OutputServerMessageException("订单操作失败");
        }
    }

    public function getOrderRefunds()
    {
        $order_refund_model = new OrderRefund();

        $order_refund_model = $order_refund_model->with(['user'=>function($q){
            return $q->select('id','username');
        },'order_goods','order']);

        // 用户ID
        $user = User::getAuthUserInfo();
        $order_refund_model = $order_refund_model->where('user_id',$user['id']);

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
        $user = User::getAuthUserInfo();
        $order_refund = OrderRefund::where('user_id',$user['id'])->with(['user'=>function($q){
            return $q->select('id','username');
        },'order_goods','order'])
        ->where('id',$id)
        ->first();
        if(!$order_refund)
        {
            OutputServerMessageException("售后订单不存在");
        }
        return $order_refund;
    }
}