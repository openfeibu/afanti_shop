<?php

namespace app\api\model;

use app\api\service\ezviz\BroadcastService;
use app\common\exception\BaseException;
use app\common\model\Showroom as ShowroomModel;
use app\api\model\Setting as SettingModel;
use app\api\model\Goods as GoodsModel;

/**
 * 展馆模型
 * Class Showroom
 * @package app\common\model
 */
class Showroom extends ShowroomModel
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
        // 获取展馆列表数据
        $data = $this->with(['logo','face_image'])->where('is_delete', '=', '0')
            ->where('is_store', '=', '1')
            ->order(['sort' => 'asc', 'create_time' => 'asc'])
            ->paginate(20, false, [
                'query' => \request()->request()
            ]);

        return $data;
    }
    public static function detail($showroom_id)
    {
        if (!$showroom = parent::detail($showroom_id)) {
            throw new BaseException(['msg' => '展馆不存在']);
        }
        $showroom['equipment_url'] = '';
        if(!empty($showroom['monitoring_channel'])) {
            $broadcastService = new BroadcastService();
            $access_token = $broadcastService->getAccessToken();
            $monitoring_sn =  SettingModel::getItem('store')['monitoring']['sn'];
            $showroom['equipment_url'] = $broadcastService->getLiveAddress($access_token, $monitoring_sn, $showroom['monitoring_channel']);
        }
        return $showroom;
    }
    public function getVideoAttr($value, $data)
    {
        return self::$base_url . 'uploads/' . $data['video'];
    }

}