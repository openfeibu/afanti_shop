<?php
namespace App\Services;

use App\Http\Resources\Home\BargainResource\BargainGoodsCollection;
use App\Models\Bargain;
use App\Models\BargainTask;
use App\Models\Goods;

class BargainService extends BaseService{
    public function getBargains()
    {
        $goods_model = new Goods;
        $list = $goods_model->where(['goods_status'=>1,'goods_verify'=>1])
            ->with(['goods_sku'=>function($q){
                return $q->select('goods_id','goods_price','goods_stock','goods_market_price')->orderBy('goods_price','asc');
            }])
            ->whereHas('bargain',function($q){
                $q->where('start_time','<=',now())->where('end_time','>',now())->where('status',1);
            })
            ->paginate(request()->per_page??30);
        return $this->format(new BargainGoodsCollection($list));
    }


    // 根据商品ID 获取秒杀 详情
    public function getBargainInfoByGoodsId($goods_id){
        $info = Bargain::select('id','floor_price','start_time','end_time')->where('goods_id',$goods_id)->where('start_time','<=',now())->where('end_time','>=',now())->first();

        return $this->format($info);
    }

    // 获取首页秒杀产品
    public function getIndexBargainAndGoods($num=4){
        $goods_model = new Goods();
        $list = $goods_model->where(['goods_status'=>1,'goods_verify'=>1])
            ->with(['goods_sku'=>function($q){
                return $q->select('goods_id','goods_price','goods_stock','goods_market_price')->orderBy('goods_price','asc');
            }])
            ->whereHas('bargain',function($q){
                $q->where('start_time',now()->format('Y-m-d H').':00');
            })
            ->take($num)->get();
        return $this->format(new BargainGoodsIndexCollection($list));
    }
    /**
     * 获取用户是否正在参与改砍价活动，如果已参与则返回task_task_id
     * @param $bargain_id
     * @param bool $user
     * @return bool|int
     */
    public function getWhetherPartake($bargain_id, $user = false)
    {
        if ($user === false) {
            return false;
        }
        return BargainTask::getHandByUser($bargain_id, $user['user_id']);
    }
}
