<?php

namespace app\store\model;

use app\common\model\Beacon as BeaconModel;

/**
 * 信标模型
 * Class Beacon
 * @package app\store\model
 */
class Beacon extends BeaconModel
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
            $this->commit();
            $this->addBeaconShowroom($data['showroom_id']);
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
            $this->addBeaconShowroom($data['showroom_id']);
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
       // !empty($param['search']) && $this->where('showroom_name', 'like', "%{$param['search']}%");
        return $this->order(['major_id' => 'asc']);
    }
    private function addBeaconShowroom($showroom_id)
    {
        if($showroom_id)
        {
            //$this->beaconShowroom()->delete();
            $data = [
                'showroom_id' => $showroom_id,
                'wxapp_id' => self::$wxapp_id
            ];
            if($this->beaconShowroom)
            {
                return $this->beaconShowroom->isUpdate(true)->save($data);
            }else{
                return $this->beaconShowroom()->save($data);
            }
        }
        return true;
    }
    private function validateForm($data)
    {
        if (!isset($data['major_id']) || empty($data['major_id'])) {
            $this->error = 'Major ID 不能为空';
            return false;
        }
//        if (!isset($data['showroom_id']) || empty($data['showroom_id'])) {
//            $this->error = '请选择展馆';
//            return false;
//        }
        return true;
    }

}