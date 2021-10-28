<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\BargainTask;
use App\Models\User;
use App\Services\BargainService;
use App\Services\BargainTaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Cache\RedisLock;

class BargainTaskController extends Controller
{
    public function __construct(
        BargainService $bargain_service,
        BargainTaskService $bargain_task_service
    )
    {
        $this->bargain_service = $bargain_service;
        $this->bargain_task_service = $bargain_task_service;
    }
    public function index()
    {
        $user_bargain_tasks = $this->bargain_task_service->getUserBargainTasks();
        return $this->success($user_bargain_tasks['data']);
    }
    public function show($id)
    {
        $user = User::getAuthUserInfo();
        $detail = $this->bargain_task_service->getTaskDetail($id,$user);
        return $this->success($detail);
    }

    /**
     * 创建砍价任务
     * @param $request
     * @return array
     */
    public function partake(Request $request)
    {
        $bargain_id = $request->bargain_id ?? 0;
        $goods_sku_id = $request->goods_sku_id ?? 0;
        if(!$bargain_id)
        {
            OutputServerMessageException('bargain_id 参数错误');
        }
        // 创建砍价任务
        $bargain_task = $this->bargain_task_service->partake($bargain_id,$goods_sku_id);
        return $this->success(['bargain_task_id' => $bargain_task['id']],"参与砍价成功");
    }

    /**
     * 帮砍一刀
     * @param $bargain_task_id
     * @return array
     */
    public function helpCut($bargain_task_id)
    {
        $user = User::getAuthUserInfo();
        $bargain_task = BargainTask::where('id',$bargain_task_id)->first();
        if(!$bargain_task) {
            OutputServerMessageException("砍价任务不存在");
        }
        $redis = Redis::connection();
        $key = "bargain_help_cut_{$bargain_task_id}";
        //获取redis锁实例
        $redisLock = new RedisLock($redis, $key, 10);
        // 加阻塞锁, 防止并发
        if ($redisLock->get()) {

            $cut_money = $bargain_task['section'][$bargain_task['cut_people']];
            // 帮砍一刀事件
            $status = $this->bargain_task_service->helpCut($bargain_task,$user);
            //释放锁
            $redisLock->release();
            if ($status == true) {
                return $this->success(compact('cut_money'), '砍价成功');
            }
        }else{
            OutputServerMessageException("砍价火热，请稍后重试");
        }

    }
}
