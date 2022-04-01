<?php

namespace app\store\model;

use app\common\model\Showroom as ShowroomModel;
use app\store\service\Goods as GoodsService;

/**
 * 展厅模型
 * Class Showroom
 * @package app\store\model
 */
class Showroom extends ShowroomModel
{

    public function add($data)
    {
        if (!$this->validateForm($data)) {
            return false;
        }
        $data['wxapp_id'] = self::$wxapp_id;
        // 开启事务
        $this->startTrans();
        try {
            // 添加商品
            $this->allowField(true)->save($data);
            // 商品图片
            $this->addShowroomSlides($data['slides']);
            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            $this->rollback();
            return false;
        }
    }
    public function edit($data)
    {
        if (!$this->validateForm($data)) {
            return false;
        }
        $data['wxapp_id'] = self::$wxapp_id;
        return $this->transaction(function () use ($data) {
            // 保存
            $this->allowField(true)->save($data);
            // 轮播图
            $this->addShowroomSlides($data['slides']);
            return true;
        });
    }

    public function getList($param)
    {
        // 查询列表数据
        return $this->setListQueryWhere($param)
            ->paginate(20, false, [
                'query' => \request()->request()
            ]);
    }
    /**
     * 获取所有展馆列表
     * @param array $param
     * @return false|\PDOStatement|string|\think\Collection
     */
    public static function getAllList($param = [])
    {
        return (new static)->setListQueryWhere($param)->select();
    }


    /**
     * 设置列表查询条件
     * @param array $param
     * @return $this
     */
    private function setListQueryWhere($param = [])
    {
        // 查询参数
        !empty($param['search']) && $this->where('showroom_name', 'like', "%{$param['search']}%");
        return $this->where('is_delete', '=', '0')->order(['is_store' => 'desc','sort' => 'asc', 'create_time' => 'asc']);
    }

    /**
     * 添加轮播图
     * @param $slides
     * @return int
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    private function addShowroomSlides($slides)
    {
        $this->slide()->delete();
        $data = array_map(function ($image_id) {
            return [
                'image_id' => $image_id,
                'wxapp_id' => self::$wxapp_id
            ];
        }, $slides);
        return $this->slide()->saveAll($data);
    }
    /**
     * 软删除
     * @return false|int
     */
    public function setDelete()
    {
        return $this->save(['is_delete' => 1]);
    }
    /**
     * 表单验证
     * @param $data
     * @return bool
     */
    private function validateForm($data)
    {
        if (!isset($data['face_image_id']) || empty($data['face_image_id'])) {
            $this->error = '请选择展馆门面';
            return false;
        }
        if (!isset($data['slides']) || empty($data['slides'])) {
            $this->error = '请上传展馆轮播图';
            return false;
        }
        return true;
    }

}
