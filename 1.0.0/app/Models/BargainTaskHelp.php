<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BargainTaskHelp extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo("App\Models\User",'user_id','id');
    }
    public function bargain(){
        return $this->belongsTo("App\Models\Bargain",'bargain_id','id');
    }
    public function bargain_task(){
        return $this->belongsTo("App\Models\BargainTask",'bargain_task_id','id');
    }
    /**
     * 获取助力列表记录
     * @param $bargain_task_id
     * @return Collection
     */
    public static function getListByBargainTaskId($bargain_task_id)
    {
        // 获取列表数据
        $helps = self::with(['user'=>function($q){
                return $q->select('id','username','avatar');
            }])
            ->where('bargain_task_id', $bargain_task_id)
            ->orderBy('created_at','desc')
            ->get();
        // 隐藏会员昵称
        foreach ($helps as $key => $help) {
            $help->user->username = formatTrueName2($help->user->username);
        }
        return $helps;
    }
}
