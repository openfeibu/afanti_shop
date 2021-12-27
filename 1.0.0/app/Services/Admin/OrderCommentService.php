<?php
namespace App\Services\Admin;

use App\Http\Resources\Home\OrderCommentResource\GoodsInfoCommentCollection;
use App\Models\Order;
use App\Models\OrderComment;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;

class OrderCommentService extends BaseService{

    /**
     * 商家回复 function
     *
     * @param string request()->reply|request()->content
     * @return void
     * @Description
     *
     */
    public function edit($id){


        $oc_model = OrderComment::where('id',$id)->first();
        $oc_model->reply = request()->reply??'';
        $oc_model->reply_time = now();
        // 商品上架状态
        if(isset(request()->active)){
            $oc_model->active = abs(request()->active??0);
        }
        $oc_model->save();
        return $this->format([],__('orders.order_comment_success'));

    }
}
