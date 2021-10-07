<?php
namespace App\Services;

use App\Models\BargainTaskHelp;

class BargainTaskHelpService extends BaseService
{
    /**
     * 新增记录
     * @param $bargain_task
     * @param $user_id
     * @param $cut_money
     * @param $is_creator
     * @return false|int
     */
    public function add($bargain_task, $user_id, $cut_money, $is_creator = 0)
    {
        return BargainTaskHelp::create([
            'bargain_id' => $bargain_task['bargain_id'],
            'bargain_task_id' => $bargain_task['id'],
            'user_id' => $user_id,
            'cut_money' => $cut_money,
            'is_creator' => $is_creator,
        ]);
    }

}
