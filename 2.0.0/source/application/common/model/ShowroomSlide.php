<?php

namespace app\common\model;

/**
 * 展馆模型
 * Class ShowroomSlide
 * @package app\common\model
 */
class ShowroomSlide extends BaseModel
{
    protected $name = 'showroom_slide';
    protected $updateTime = false;

    /**
     * 关联文件库
     * @return \think\model\relation\BelongsTo
     */
    public function file()
    {
        return $this->belongsTo('UploadFile', 'image_id', 'file_id')
            ->bind(['file_path', 'file_name', 'file_url']);
    }

}
