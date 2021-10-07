<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BargainTask extends Model
{
    protected $guarded = [];

    public function bargain(){
        return $this->belongsTo("App\Models\Bargain",'bargain_id','id');
    }
    public function goods()
    {
        return $this->belongsTo("App\Models\Goods",'goods_id','id');
    }
    public function user()
    {
        return $this->belongsTo("App\Models\User",'user_id','id');
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
    public static function detail($id)
    {
        $bargain_task = self::with(['user'=>function($q){
            return $q->select('id','username','avatar');
        }])->where('id',$id)->first(['id','bargain_id','user_id','goods_id','goods_sku_id','goods_price','floor_price','peoples','cut_people','cut_money','actual_price','actual_price','end_time','status']);
        // 标识砍价任务过期
        if (!empty($bargain_task) && $bargain_task['status'] == 1 && $bargain_task->end_time <= now()) {
            $bargain_task->status = 0;
            $bargain_task->save();
        }
        return $bargain_task;
    }

    /**
     * 获取器：砍价金额区间
     * @param $value
     * @return mixed
     */
    public function getSectionAttribute($value)
    {
        return json_decode($value, true);
    }

    /**
     * 修改器：砍价金额区间
     * @param $value
     * @return string
     */
    public function setSectionAttribute($value)
    {
        $this->attributes['section'] = json_encode($value);
    }

}
