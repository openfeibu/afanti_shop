<?php

namespace app\store\controller\showroom;

use app\store\controller\Controller;
use app\store\model\Beacon as BeaconModel;
use app\store\model\Showroom as ShowroomModel;

/**
 * 商品管理控制器
 * Class Goods
 * @package app\store\controller
 */
class Beacon extends Controller
{
    public function index()
    {
        // 获取全部商品列表
        $model = new BeaconModel;
        $list = $model->getList($this->request->param());
        // 商品分类
        return $this->fetch('index', compact('list'));
    }
    public function add()
    {
        if (!$this->request->isAjax()) {
            $showroomList = ShowroomModel::getAllList();
            return $this->fetch('add',compact('showroomList'));
        }
        $model = new BeaconModel;
        if ($model->add($this->postData('beacon'))) {
            return $this->renderSuccess('添加成功', url('showroom.beacon/index'));
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    public function edit($beacon_id)
    {
        $model = BeaconModel::detail($beacon_id);
        if (!$this->request->isAjax()) {
            $showroomList = ShowroomModel::getAllList();
            return $this->fetch('edit', compact('model','showroomList'));
        }
        // 新增记录
        if ($model->edit($this->postData('beacon'))) {
            return $this->renderSuccess('更新成功', url('showroom.beacon/index'));
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }
    public function delete($beacon_id)
    {
        // 门店详情
        $model = BeaconModel::detail($beacon_id);
        if (!$model->delete()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}