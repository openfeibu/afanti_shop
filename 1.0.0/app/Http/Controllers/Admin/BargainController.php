<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BargainResource\BargainCollection;
use App\Http\Resources\Admin\BargainResource\BargainGoodsCollection;
use App\Http\Resources\Admin\BargainResource\BargainResource;
use App\Models\Bargain;
use App\Models\Goods;
use Illuminate\Http\Request;

class BargainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Bargain $bargain_model)
    {
        $list = $bargain_model->with(['goods'=>function($q){
            $q->select('id','goods_name','goods_master_image');
        }])->orderBy('id','desc')->paginate(request()->per_page??30);
        return $this->format(new BargainCollection($list));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Bargain $bargain_model)
    {
        $goods_id = intval($request->goods_id);
        $goods = Goods::find($goods_id);
        $bargain_model->goods_id = $goods_id;
        $bargain_model->expiryt_time = intval($request->expiryt_time);
        $bargain_model->floor_price = $request->floor_price;
        $bargain_model->peoples = intval($request->peoples);
        $bargain_model->is_self_cut = abs(request()->is_self_cut)??0;
        $bargain_model->is_floor_buy = abs(request()->is_floor_buy)??0;
        $bargain_model->status = abs(request()->status)??0;
        $bargain_model->start_time = empty($request->times)?now():$request->times[0];
        $bargain_model->end_time = empty($request->times)?now():$request->times[1];

        $bargain_model->save();
        return $this->success([],__('base.success'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Bargain $bargain_model,$id)
    {
        $info = $bargain_model->find($id);
        return $this->success(new BargainResource($info));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bargain $bargain_model,$id)
    {
        $goods_id = intval($request->goods_id);
        $bargain_model = $bargain_model->find($id);
        $bargain_model->goods_id = $goods_id;
        $goods = Goods::find($goods_id);
        $bargain_model->expiryt_time = intval($request->expiryt_time);
        $bargain_model->floor_price = $request->floor_price;
        $bargain_model->peoples = intval($request->peoples);
        $bargain_model->is_self_cut = abs(request()->is_self_cut)??0;
        $bargain_model->is_floor_buy = abs(request()->is_floor_buy)??0;
        $bargain_model->status = abs(request()->status)??0;
        $bargain_model->start_time = empty($request->times)?now():$request->times[0];
        $bargain_model->end_time = empty($request->times)?now():$request->times[1];
        $bargain_model->save();
        return $this->success([],__('base.success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bargain $bargain_model,$id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
        $bargain_model->whereIn('id',$idArray)->delete();
        return $this->success([],__('base.success'));
    }

    // 获取商品
    public function get_bargain_goods(){
        $goods_model = new Goods();
        if(isset(request()->goods_name) && !empty(request()->goods_name)){
            $goods_model = $goods_model->where('goods_name','like','%'.request()->goods_name.'%');
        }
        $list = $goods_model->with(['bargain'=>function($q){
            $q->select('goods_id');
        }])->paginate(request()->per_page??30);
        
        return $this->success(new BargainGoodsCollection($list));
    }
}
