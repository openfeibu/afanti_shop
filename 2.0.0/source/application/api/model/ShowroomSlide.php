<?php

namespace app\api\model;

use app\common\exception\BaseException;
use app\common\model\ShowroomSlide as ShowroomSlideModel;


/**
 * 展馆模型
 * Class Showroom
 * @package app\common\model
 */
class ShowroomSlide extends ShowroomSlideModel
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

}