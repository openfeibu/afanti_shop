<?php

namespace app\api\model;

use think\Db;
use app\common\model\BeaconShowroom as BeaconShowroomModel;
/**
 * 信标-展馆模型
 * Class Comment
 * @package app\common\model
 */
class BeaconShowroom extends BeaconShowroomModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'wxapp_id',
    ];
    /**
     * 关联展馆
     * @return \think\model\relation\BelongsTo
     */
    public function showroom()
    {
        return $this->belongsTo('Showroom')->with(['logo','face_image']);
    }
}