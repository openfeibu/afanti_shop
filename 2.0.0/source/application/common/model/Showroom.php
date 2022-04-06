<?php

namespace app\common\model;

use think\Cache;
use app\common\enum\Setting as SettingEnum;
use app\common\enum\DeliveryType as DeliveryTypeEnum;

/**
 * 展馆模型
 * Class Showroom
 * @package app\common\model
 */
class Showroom extends BaseModel
{
    protected $name = 'showroom';

    public function slide()
    {
        return $this->hasMany('ShowroomSlide')->order(['id' => 'asc']);
    }
    /**
     * 关联logo
     * @return \think\model\relation\HasOne
     */
    public function logo()
    {
        $module = self::getCalledModule() ?: 'common';
        return $this->hasOne("app\\{$module}\\model\\UploadFile", 'file_id', 'logo_image_id');
    }
    /**
     * 关联门面
     * @return \think\model\relation\HasOne
     */
    public function faceImage()
    {
        $module = self::getCalledModule() ?: 'common';
        return $this->hasOne("app\\{$module}\\model\\UploadFile", 'file_id', 'face_image_id');
    }
    /**
     * 展馆详情
     * @param $showroom_id
     * @return static|null
     * @throws \think\exception\DbException
     */
    public static function detail($showroom_id)
    {
        return static::get($showroom_id, ['logo','face_image','slide.file']);
    }

    public function getVideoPathAttr($value, $data)
    {
        return self::$base_url . 'uploads/' . $data['video'];
    }
}