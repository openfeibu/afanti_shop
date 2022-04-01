<?php

namespace app\common\model;

use think\Db;

/**
 * 信标-展馆模型
 * Class Comment
 * @package app\common\model
 */
class BeaconShowroom extends BaseModel
{
    protected $name = 'beacon_showroom';
    protected $createTime = false;
    protected $updateTime = false;

    /**
     * 关联展馆
     * @return \think\model\relation\BelongsTo
     */
    public function showroom()
    {
        return $this->belongsTo('Showroom')
            ->bind(['showroom_name', 'showroom_id']);
    }

}