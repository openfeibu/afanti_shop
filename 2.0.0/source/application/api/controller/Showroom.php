<?php

namespace app\api\controller;

use app\api\model\Showroom as ShowroomModel;
use app\api\model\Goods as GoodsModel;

/**
 * 展馆控制器
 * Class Article
 * @package app\api\controller
 */
class Showroom extends Controller
{
    public function lists()
    {
        // 获取列表数据
        $model = new ShowroomModel;
        $list = $model->getList();
        return $this->renderSuccess(compact('list'));
    }
    public function detail($showroom_id)
    {
        $detail = ShowroomModel::detail($showroom_id);
        $goodsModel = new GoodsModel;
        $detail['goodsList'] = $goodsModel->getList([
            'showroom_id' => $showroom_id,
            'listRows' => 6
        ], $this->getUser(false));
        return $this->renderSuccess(compact('detail'));
    }
}