<?php

namespace app\store\controller;

use app\store\model\Showroom as ShowroomModel;
/**
 * 商品管理控制器
 * Class Goods
 * @package app\store\controller
 */
class Showroom extends Controller
{
    public function index()
    {
        // 获取全部商品列表
        $model = new ShowroomModel;
        $list = $model->getList($this->request->param());
        // 商品分类
        return $this->fetch('index', compact('list'));
    }
    public function add()
    {
        if (!$this->request->isAjax()) {
            return $this->fetch('add');
        }
        $model = new ShowroomModel;
        if ($model->add($this->postData('showroom'))) {
            return $this->renderSuccess('添加成功', url('showroom/index'));
        }
        return $this->renderError($model->getError() ?: '添加失败');
    }

    public function edit($showroom_id)
    {
        // 门店详情
        $model = ShowroomModel::detail($showroom_id);
        if (!$this->request->isAjax()) {
            return $this->fetch('edit', compact('model'));
        }
        // 新增记录
        if ($model->edit($this->postData('showroom'))) {
            return $this->renderSuccess('更新成功', url('showroom/index'));
        }
        return $this->renderError($model->getError() ?: '更新失败');
    }
    public function delete($showroom_id)
    {
        // 门店详情
        $model = ShowroomModel::detail($showroom_id);
        if (!$model->setDelete()) {
            return $this->renderError($model->getError() ?: '删除失败');
        }
        return $this->renderSuccess('删除成功');
    }
}