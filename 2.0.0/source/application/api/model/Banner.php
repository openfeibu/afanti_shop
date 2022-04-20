<?php

namespace app\api\model;

use app\api\service\ezviz\BroadcastService;
use app\common\exception\BaseException;
use app\common\model\Banner as BannerModel;
use app\api\model\Setting as SettingModel;
use app\api\model\Goods as GoodsModel;

/**
 * 轮播图模型
 * Class Banner
 * @package app\common\model
 */
class Banner extends BannerModel
{
    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'wxapp_id',
        'create_time',
        'update_time'
    ];

    public function getAllList()
    {
        $data = $this->with(['image'])
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->select();

        return $data;
    }
}