<?php
namespace App\Services;

use App\Http\Resources\Home\FullReductionResource\FullReductionCollection;
use App\Models\FullReduction;

class FullReductionService extends BaseService{
    // 根据店铺ID 获取满减 列表
    public function getFullReduction(){
        $fr_model = new FullReduction();
        $list = $fr_model->where('start_time','<=',now())->where('end_time','>=',now())->get();

        return $this->format(new FullReductionCollection($list));
    }

    // 获取满减 详情
    public function getFullReductionInfo($total_price){
        $fr_model = new FullReduction();
        $info = $fr_model->where('start_time','<',now())->where('end_time','>',now())->where('use_money','<=',$total_price)->orderBy('use_money','asc')->first();

        return $this->format($info);
    }
}
