<?php
namespace App\Services;

use App\Http\Resources\Home\CollectiveActiveResource\CollectiveActiveGoodsCollection;
use App\Http\Resources\Home\CollectiveLogResourcee\CollectiveLogGoodsCollection;
use App\Models\Collective;
use App\Models\CollectiveActive;
use App\Models\CollectiveActiveUser;
use App\Models\CollectiveLog;
use App\Models\Order;
use App\Models\OrderGoods;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CollectiveService extends BaseService{
    // 根据商品ID 获取拼团 详情
    public function getCollectiveInfoByGoodsId($goods_id){
        $collective_model = new Collective();
        $info = $collective_model->where('goods_id',$goods_id)->first();

        if(!$info){
            OutputServerMessageException('collective empty');
        }

        return $this->format($info);
    }
    // 根据商品ID获取当前的正在操作的团
    public function getCollectiveActiveByGoodsId($goods_id){
        $collective_active_model = new CollectiveActive();
        $list = $collective_active_model->where('goods_id',$goods_id)->whereIn('status',['un-collect','collecting'])->where('end_time','>',date('Y-m-d H:i:s'))->with('user')->get();
        return $this->success(new CollectiveActiveGoodsCollection( $list));
    }

    // 弃用 根据商品ID获取当前的正在操作的团
    public function getCollectiveLogByGoodsId($goods_id){
        $collective_log_model = new CollectiveLog();
        $list = $collective_log_model->where('goods_id',$goods_id)->where('status',2)->withCount('orders')->with('user')->get();
        return $this->success(new CollectiveLogGoodsCollection( $list));
    }

    // 弃用 根据ID 和订单ID创建日志 collective_id 是日志ID collective_resp 团信息 order_goods 订单商品信息
    public function createCollectiveLog($collective_id,$collective_resp,$order_goods){
        try{
            DB::beginTransaction();
            if($collective_id>0){
                $collective_log_model = new CollectiveLog();
                $cli = $collective_log_model->where('id',$collective_id)->withCount('orders')->first();
                if($cli->orders_count>=$cli->need){ // 满了
                    throw new \Exception(__('markets.collective_is_full'));
                }
                if($cli->orders_count+1 == $cli->need){
                    $collective_log_model->status=1;
                    $collective_log_model->save();
                }
            }
            if($collective_id<0){
                $collective_log_model = new CollectiveLog();
                $data = [
                    'user_id' => $order_goods['user_id'],
                    'store_id' => $order_goods['store_id'],
                    'goods_id' => $order_goods['goods_id'],
                    'collective_id' => $collective_resp['data']['id'],
                    'discount' => $collective_resp['data']['discount'],
                    'need' => $collective_resp['data']['need'],
                    'status' => 2,
                ];
                $collective_log_info = $collective_log_model->create($data);
                $collective_id = $collective_log_info->id;
            }
            DB::commit();
            return $collective_id;
        }catch(\Exception $e){
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }
        
    }

    // 根据ID 和订单ID创建日志 collective_id 是日志ID collective_resp 团信息 order_goods 订单商品信息
    public function saveCollectiveActive($oid_arr){


            $order = Order::whereIn('id',$oid_arr)->first();
            $order_goods = OrderGoods::where('order_id',$order->id)->first();

            // 新增/更新拼单记录
            if ($order['order_type'] != 'group') {
                return false;
            }
            if($order['collective_active_id'] > 0)
            {
                $collective_active = CollectiveActive::where('id',$order['collective_active_id'])->first();
                $collective_active_id = $collective_active['id'];
                // 验证当前拼单是否允许加入新成员
                if (!$collective_active->checkAllowJoin()) {
                    return false;
                }
                // 新增拼单成员记录
                CollectiveActiveUser::create([
                    'collective_active_id' => $collective_active['id'],
                    'order_id' => $order['id'],
                    'user_id' => $order['user_id'],
                    'store_id' => $order_goods['store_id'],
                    'is_creator' => 0,
                ]);
                $collective_active->actual_people += 1;
                $status = $collective_active->actual_people >= $collective_active->people ? 'collected' : 'collecting';
                $collective_active->status = $status;
                $collective_active->save();
            }else{
                $collective_resp = $this->getCollectiveInfoByGoodsId($order_goods['goods_id']);
                $data = [
                    'creator_id' => $order_goods['user_id'],
                    'store_id' => $order_goods['store_id'],
                    'goods_id' => $order_goods['goods_id'],
                    'collective_id' => $collective_resp['data']['id'],
                    'discount' => $collective_resp['data']['discount'],
                    'people' => $collective_resp['data']['need'],
                    'actual_people' => 1,
                    'status' => 'un-collect',
                    'end_time' => date('Y-m-d H:i:s',time() + ($collective_resp['data']['group_time'] * 60 * 60))
                ];
                $collective_active = CollectiveActive::create($data);
                $collective_active_id = $collective_active->id;
                // 新增拼单成员记录
                CollectiveActiveUser::create([
                    'collective_active_id' => $collective_active_id,
                    'order_id' => $order['id'],
                    'user_id' => $order_goods['user_id'],
                    'store_id' => $order_goods['store_id'],
                    'is_creator' => 1,
                ]);

            }
            return $collective_active_id;


    }

}
