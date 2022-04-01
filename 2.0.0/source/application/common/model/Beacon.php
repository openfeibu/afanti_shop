<?php

namespace app\common\model;

use think\Db;

/**
 * 信标模型
 * Class Comment
 * @package app\common\model
 */
class Beacon extends BaseModel
{
    protected $name = 'beacon';
    protected $createTime = false;
    protected $updateTime = false;

    public function beaconShowroom()
    {
        return $this->hasOne('BeaconShowroom')->order(['id' => 'asc']);
    }
    public static function detail($beacon_id)
    {
        return static::get($beacon_id);
    }
}