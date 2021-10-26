<?php
namespace App\Services\Admin;

use App\Models\Order;
use App\Models\OrderRefund;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderRefundService extends BaseService{

    public function getOrderRefunds()
    {
        $order_refund_model = new OrderRefund();

        $order_refund_model = $order_refund_model->with(['user'=>function($q){
            return $q->select('id','username');
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
}