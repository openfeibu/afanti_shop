<?php
namespace App\Services;

use App\Exceptions\OutOfStockException;
use App\Http\Resources\Home\BargainResource\BargainGoodsCollection;
use App\Http\Resources\Home\BargainResource\BargainGoodsIndexCollection;
use App\Http\Resources\Home\BargainTaskResource\BargainTaskCollection;
use App\Models\Bargain;
use App\Models\BargainTask;
use App\Models\BargainTaskHelp;
use App\Models\Goods;
use App\Models\GoodsSku;
use App\Models\User;
use App\Traits\HelperTrait;
use DB, Log;

class BargainTaskService extends BaseService{

    use HelperTrait;

    public function getUserBargainTasks()
    {
        $user = User::getAuthUserInfo();
        $user_bargain_tasks = BargainTask::where('user_id',$user['id'])
            ->orderBy('id','desc')
            ->paginate(request()->per_page??30);
        return $this->format(new BargainTaskCollection($user_bargain_tasks));;
    }

    public function getTaskDetail($id, $user = false)
    {
        $bargain_task = BargainTask::detail($id);
        $bargain_task->surplus_money = $bargain_task->surplus_money;
        $bargain_task->bargain_rate = $bargain_task->bargain_rate;
        if (empty($bargain_task)) {
            OutputServerMessageException('砍价任务不存在');
        }
        $bargain = $bargain_task->bargain()->first(['id','goods_id','floor_price','is_self_cut','is_floor_buy','status']);
        $goods_service = new GoodsService();
        $goods= $goods_service->getGoodsInfo($bargain_task['goods_id'])['data'];
        // 好友助力榜
        $bargain_task_help_list = BargainTaskHelp::getListByBargainTaskId($id);
        // 当前是否为发起人
        $is_creator = $this->isCreator($bargain_task, $user);
        // 当前是否已砍
        $is_cut = $this->isCut($bargain_task_help_list, $user);

        return compact('bargain_task','bargain','goods','bargain_task_help_list','is_creator','is_cut');
    }
    /**
     * 新增砍价任务
     * @param $bargain_id
     * @param $goods_sku_id
     * @return bool
     */
    public function partake($bargain_id, $goods_sku_id)
    {
        $user = User::getAuthUserInfo();
        // 获取活动详情
        $bargain = Bargain::find($bargain_id);
        if (!$bargain) {
            OutputServerMessageException("砍价活动不存在");
        }
        // 验证能否创建砍价任务
        $this->onVerify($bargain, $user['id']);
        try {
            DB::beginTransaction();
            // 获取商品详情
            $goods_service = new GoodsService();
            $goods = $goods_service->getGoodsInfo($bargain['goods_id'])['data'];
            // 商品sku信息
            $goods['goods_sku'] = GoodsSku::select('id','sku_name','goods_price','goods_stock','goods_weight')->where('goods_id',$bargain['goods_id'])->where('id',$goods_sku_id)->first();
            // 创建砍价任务
            $bargain_task = $this->add($user['id'], $bargain, $goods_sku_id, $goods);
            // 发起人自砍一刀
            $bargain['is_self_cut'] && $this->onCutEvent($bargain_task,$user['id'], 1);
            DB::commit();
            return $bargain_task;

         }catch(\Exception $e){
            DB::rollBack();
            Log::channel('qwlog')->debug($e->getMessage());
            OutputServerMessageException("砍价任务创建失败");
        }
    }
    /**
     * 验证能否创建砍价任务
     * @param $bargain
     * @param $user_id
     * @return bool
     */
    private function onVerify($bargain, $user_id)
    {
        // 活动是否开始
        if (!$bargain['is_start']) {
            OutputServerMessageException('很抱歉，当前砍价活动未开始');
        }
        // 活动是否到期合法
        if ($bargain['is_end']) {
            OutputServerMessageException('很抱歉，当前砍价活动已结束');
        }
        // 判断当前用户是否已参加
        $bargain_task_id = BargainTask::getHandByUser($bargain['id'], $user_id);
        if ($bargain_task_id !== false && $bargain_task_id > 0) {
            OutputServerMessageException('很抱歉，当前砍价活动您已参加，无需重复参与');
        }
    }

    /**
     * 创建砍价任务记录
     * @param $user_id
     * @param $bargain
     * @param $goods_sku_id
     * @param $goods
     * @return false|int
     * @throws \Exception
     */
    private function add($user_id, $bargain, $goods_sku_id, $goods)
    {
        // 分配砍价金额区间
        $goods_price = $goods['goods_sku'] ? $goods['goods_sku']['goods_price'] : $goods['goods_price'];
        $section = $this->calcBargainSection(
            $goods_price,
            $bargain['floor_price'],
            $bargain['peoples']
        );
        // 新增记录
        return BargainTask::create([
            'bargain_id' => $bargain['id'],
            'user_id' => $user_id,
            'goods_id' => $bargain['goods_id'],
            'goods_sku_id' => $goods_sku_id,
            'goods_price' => $goods_price,
            'floor_price' => $bargain['floor_price'],
            'peoples' => $bargain['peoples'],
            'cut_people' => 0,
            'section' => $section,
            'cut_money' => 0.00,
            'actual_price' => $goods_price,
            'end_time' => date("Y-m-d H:i:s",strtotime('+'.$bargain['expiry_time'].'hour')),
            'is_buy' => 0,
            'status' => 1,
        ]);
    }

    /**
     * 帮砍一刀
     * @param $bargain_task
     * @param $user
     * @return bool|false|int
     */
    public function helpCut($bargain_task,$user)
    {
        // 好友助力榜
        $helpList = BargainTaskHelp::getListByBargainTaskId($bargain_task['id']);
        // 当前是否已砍
//        if ($this->isCut($helpList, $user)) {
//            OutputServerMessageException("您已参与砍价，请不要重复操作");
//        }
        // 帮砍一刀事件
        try {
            DB::beginTransaction();
            $status = $this->onCutEvent($bargain_task,$user['id'],$this->isCreator($bargain_task, $user));
            DB::commit();
            return $status;
        }catch(\Exception $e){
            DB::rollBack();
            Log::channel('qwlog')->debug($e->getMessage());
            OutputServerMessageException("砍价任务创建失败");
        }
    }

    /**
     * 帮砍一刀事件
     * @param $bargain_task
     * @param $user_id
     * @param $is_creator
     * @return bool
     */
    private function onCutEvent($bargain_task,$user_id, $is_creator = 0)
    {
        // 砍价金额
        $cut_money = $bargain_task['section'][$bargain_task['cut_people']];
        // 砍价助力记录
        $bargainTaskHelpService = new BargainTaskHelpService();
        $bargainTaskHelpService->add($bargain_task, $user_id, $cut_money, $is_creator);
        // 实际购买金额
        $actualPrice = bcsub($bargain_task['actual_price'], $cut_money);

        // 更新砍价任务信息
        $bargain_task->cut_people += 1;
        $bargain_task->cut_money += $cut_money;
        $bargain_task->actual_price = $actualPrice;
        $bargain_task->is_floor = bcequal($actualPrice, $bargain_task['floor_price']);
        $bargain_task->save();
        return true;
    }

    
    /**
     * 分配砍价金额区间
     * @param $goodsPrice
     * @param $floorPrice
     * @param $peoples
     * @return mixed
     * @throws \Exception
     */
    private function calcBargainSection($goodsPrice, $floorPrice, $peoples)
    {
        $AmountService = new BargainAmountService(bcsub($goodsPrice, $floorPrice), $peoples);
        return $AmountService->handle()['items'];
    }



    /**
     * 当前是否为发起人
     * @param $bargain_task
     * @param $user
     * @return bool
     */
    private function isCreator($bargain_task, $user)
    {
        if ($user === false) return 0;
        return $user['id'] == $bargain_task['user_id'] ? 1 : 0;
    }

    /**
     * 当前是否已砍
     * @param $bargain_task_help_list
     * @param $user
     * @return bool
     */
    private function isCut($bargain_task_help_list, $user)
    {
        if ($user === false) return false;
        foreach ($bargain_task_help_list as $item) {
            if ($item['user_id'] == $user['id']) return true;
        }
        return false;
    }


    /**
     * 获取砍价任务的商品列表（用于订单结算）
     * @param $bargain_task_id
     * @return array|bool
     */
    public function getBargainTaskGoods($bargain_task_id)
    {
        // 砍价任务详情
        $task = BargainTask::detail($bargain_task_id);
        if (empty($task) || !$task['status']) {
            OutputServerMessageException("砍价任务不存在或已结束");
        }
        if ($task['is_buy']) {
            OutputServerMessageException("该砍价商品已购买");
        }
        if(!$task['is_floor'])
        {
            OutputServerMessageException("未砍到最低价，请继续邀请好友砍价");
        }
        // 砍价商品详情
        $goods = Goods::select('id','store_id','goods_name','goods_master_image','goods_price','goods_stock','goods_weight','freight_id','goods_status')->where('id',$task['goods_id'])->first();
        $store = $goods->store()->first(['id','store_name','store_logo']);
        if(!$goods or $goods['goods_status'] != 1)
        {
            throw new OutOfStockException(__('orders.goods_failure'));
        }
        // 判断是否库存足够
        if($goods['goods_stock'] < 1){
            throw new OutOfStockException(__('orders.stock_error'));
        }
        if($task['goods_sku_id']>0){
            $goods_sku = GoodsSku::select('id','sku_name','goods_price','goods_stock','goods_weight')->where('goods_id',$task['goods_id'])->where('id',$task['goods_sku_id'])->first();
            $goods['sku_name'] = $goods_sku['sku_name'];
            $goods['goods_price'] = $goods_sku['goods_price'];
            $goods['goods_stock'] = $goods_sku['goods_stock'];
            $goods['goods_weight'] = $goods_sku['goods_weight'];
        }
        $goods['goods_master_image'] = $this->thumb($goods['goods_master_image'],150);
        $goods['original_price'] = $goods['goods_price'];
        $goods['goods_price'] =  $task['actual_price'];
        $goods['total_price'] =  $task['actual_price'];
        $goods['total_weight'] = $goods['goods_weight'];
        $goods['buy_num'] = 1;
        $goods['coupon_money'] = 0;
        $goods['full_reduction_money'] = 0;
        $store_goods_list[$store['id']]['goods_list'][] = $goods;
        $store_goods_list[$store['id']]['store_info'] = $store;

        return $store_goods_list;
    }

}
