<?php

namespace app\api\controller;

use app\api\model\Beacon as BeaconModel;

/**
 * 蓝牙信标控制器
 * Class Article
 * @package app\api\controller
 */
class Beacon extends Controller
{
    public function lists()
    {
        // 获取列表数据
        $model = new BeaconModel;
        $list = $model->getList();
        return $this->renderSuccess(compact('list'));
    }
}