<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BargainTask extends Model
{
    public function bargain(){
        return $this->belongsTo("App\Models\Bargain",'bargain','id');
    }

    /**
     * 获取用户是否正在参与改砍价活动，如果已参与则返回$bargain_task_id
     * @param $bargain_id
     * @param $user_id
     * @return bool|int
     */
    public static function getHandByUser($bargain_id, $user_id)
    {
        $bargain_task_id = self::where('bargain_id', $bargain_id)
            ->where('user_id', $user_id)
            ->where('end_time', '>', now())
            ->where('status', 1)
            ->value('id');
        return $bargain_task_id ?: 0;
    }
}
