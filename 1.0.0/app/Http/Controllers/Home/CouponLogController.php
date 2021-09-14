<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\CouponResource\CouponUserCollection;
use App\Models\CouponLog;
use App\Services\CouponService;
use App\Services\UserService;
use Illuminate\Http\Request;

class CouponLogController extends Controller
{
    // 获取自己优惠券的列表
    public function index(CouponLog $coupon_log_model,UserService $user_service){
        $user_info = $user_service->getUserInfo();
        $list = $coupon_log_model->where('start_time','<',now())->where('end_time','>',now())->where('user_id',$user_info['id'])->orderBy('status','asc')->orderBy('id','desc')->get();
        return $this->success(new CouponUserCollection($list));
    }

}
