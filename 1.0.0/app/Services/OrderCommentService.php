<?php
namespace App\Services;

use App\Http\Resources\Home\OrderCommentResource\GoodsInfoCommentCollection;
use App\Models\Order;
use App\Models\OrderComment;
use App\Models\OrderGoods;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class OrderCommentService extends BaseService{
    
    /**
     * 添加评论 function
     *
     * @param mixed request()->order_id
     * @param mixed request()->score
     * @param mixed request()->agree
     * @param mixed request()->service
     * @param mixed request()->speed
     * @param mixed request()->content
     * @param mixed request()->image
     * @return void
     * @Description
     *
     */
    public function add(){
        // 判断订单是否已经评论过了
        $order_model = new Order();
        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();
        $order_id = request()->order_id;
        $goods_id = request()->goods_id;
        $order_goods = OrderGoods::where('order_id',$order_id)->where('goods_id',$goods_id)->first();
        if(!$order_goods)
        {
            throw new ModelNotFoundException('数据不存在');
        }
        if($order_goods['is_comment'] != 0)
        {
            OutputServerMessageException("请勿重复评论");
        }


        $data = [];
        $score = request()->score??5.00;
        $agree = request()->agree??5.00;
        $service = request()->service??5.00;
        $speed = request()->speed??5.00;
        $content = request()->content??'非常好！';
        $image = request()->image??[];

        $comment = [];
        $comment['user_id'] = $user_info['id'];
        $comment['goods_id'] = $order_goods['goods_id'];
        $comment['order_id'] = $order_goods['order_id'];
        $comment['store_id'] = $order_goods['store_id'];
        $comment['score'] = $score;
        $comment['agree'] = $agree;
        $comment['service'] = $service;
        $comment['service'] = $speed;
        $comment['content'] = $content;
        if(is_array($image)){
            $comment['image'] = empty($image)?'':implode(',',$image);
        }else{
            $comment['image'] = $image;
        }
        $comment['created_at'] = now();
        $data[] = $comment;

        $order_goods->update(['is_comment'=>1,'comment_time'=>now()]);

        $rs = OrderComment::insert($data);
        return $this->format($rs,__('orders.order_comment_success'));
    }

    // 定时任务系统添加评论
    public function systemAdd($ids=[]){
        $order_model = new Order();
        $order_list = $order_model->with('order_goods')->whereIn('id',$ids)->get();
        if($order_list->isEmpty()){
            OutputServerMessageException('order_list is empty obj systemAdd.');
        }
        $data = [];
        $score = 5.00;
        $agree = 5.00;
        $service = 5.00;
        $speed = 5.00;
        $content = '非常好！';
        $image = [];
        foreach($order_list as $v){
            foreach($v['order_goods'] as $vo){
                $comment = [];
                $comment['user_id'] = $v['user_id'];
                $comment['goods_id'] = $vo['goods_id'];
                $comment['order_id'] = $v['id'];
                $comment['store_id'] = $v['store_id'];
                $comment['score'] = $score;
                $comment['agree'] = $agree;
                $comment['service'] = $service;
                $comment['service'] = $speed;
                $comment['content'] = $content;
                $comment['image'] = empty($image)?'':implode(',',$image);
                $comment['created_at'] = now();
                $data[] = $comment;
            }
        }
        $rs = OrderComment::insert($data);
        $order_model->whereIn('id',$ids)->update(['comment_time'=>now()]);
        return $this->format($rs);
    }

    /**
     * 商家回复 function
     *
     * @param string request()->reply|request()->content
     * @return void
     * @Description
     *
     */
    public function edit($id){

        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();
        $oc_model = OrderComment::where('id',$id)->where('user_id',$user_info['id'])->first();
        $score = request()->score;
        $agree = request()->agree;
        $service = request()->service;
        $speed = request()->speed;
        $content = request()->content;
        $image = request()->image;
        $oc_model->score = $score;
        $oc_model->agree = $agree;
        $oc_model->service = $service;
        $oc_model->speed = $speed;
        $oc_model->content = $content;
        $oc_model->image = empty($image)?'':implode(',',$image);
        $oc_model->save();
        return $this->format([],__('orders.order_comment_success'));

    }

    // 获取评论信息
    public function getList($goods_id){
        $oc_model = new OrderComment();
        $oc_model = $oc_model->select(DB::raw("*,(score+agree+speed+service) as sum_rate"))->with('user')->where('goods_id',$goods_id)->where('active',1)->orderBy('id','desc');
        if(request('is_type')==1){
            $oc_model = $oc_model->having('sum_rate','>=',15);
        }
        if(request('is_type')==2){
            $oc_model = $oc_model->having('sum_rate','<',15)->having('sum_rate','>',10);
        }
        if(request('is_type')==3){
            $oc_model = $oc_model->having('sum_rate','<=',10);
        }
        $list = $oc_model->paginate(request()->per_page??30);
        return $this->format(new GoodsInfoCommentCollection($list));
    }

    // 获取评论类型数量
    public function getCommentStatistics($goods_id){
        $oc_model = new OrderComment();
        $oc_model = $oc_model->where('active',1);
        $count = $oc_model->where('goods_id',$goods_id)->count();
        $good_count = $oc_model->whereRaw('(score+agree+speed+service)>=15')->where('goods_id',$goods_id)->count();
        $commonly_count = $oc_model->whereRaw('(score+agree+speed+service)<15')->whereRaw('(score+agree+speed+service)>10')->where('goods_id',$goods_id)->count();
        $bad_count = $oc_model->whereRaw('(score+agree+speed+service)<=10')->where('goods_id',$goods_id)->count();
        return $this->format([
            'all'=>$count,
            'good'=>$good_count??0,
            'commonly'=>$commonly_count??0,
            'bad'=>$bad_count??0,
            'rate'=>$count==0?100:round((($good_count??0)/$count)*100,2),
        ]);
    }
}
