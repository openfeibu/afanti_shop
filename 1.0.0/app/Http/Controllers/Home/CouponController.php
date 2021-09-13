<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\CouponResource\CouponCollection;
use App\Models\Coupon;
use App\Models\CouponLog;
use App\Services\CouponService;
use App\Services\UserService;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function __construct(CouponService $coupon_service)
    {
        $this->coupon_service = $coupon_service;
    }

    // 获取优惠券的列表
    public function index(){
        $list = Coupon::where('stock','>',0)->where('start_time','<',now())->where('end_time','>',now())->orderBy('id','desc')->paginate(request()->per_page??30);
        return $this->success(new CouponCollection($list));

    }

    // 领取优惠券
    public function receive_coupon(Request $request,CouponService $coupon_service){
        $id = $request->id;
        $rs = $this->coupon_service->receive($id);
        return $rs['status']?$this->success([],__('markets.coupon_receive_success')):$this->error($rs['msg']);
    }
}
