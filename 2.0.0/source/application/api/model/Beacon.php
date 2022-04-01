<?php

namespace app\api\model;

use app\common\exception\BaseException;
use app\common\model\Beacon as BeaconModel;

/**
 * 商品评价模型
 * Class Article
 * @package app\api\model
 */
class Beacon extends BeaconModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'is_delete',
        'wxapp_id',
        'create_time',
        'update_time'
    ];
    public function getList()
    {
        $beacons = self::order('beacon_id','asc')->select();
        foreach ($beacons as $key => $beacon)
        {
            $beacon->showroom  = $beacon->beaconShowroom->showroom;
        }
        $beaconList = [];
        foreach ($beacons as $key => $beacon)
        {
            $beaconList[$beacon['major_id']] = $beacon;
        }
        return $beaconList;
    }

}