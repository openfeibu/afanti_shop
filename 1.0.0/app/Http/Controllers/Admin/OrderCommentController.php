<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderCommentResource\OrderCommentCollection;
use App\Http\Resources\Admin\OrderCommentResource\OrderCommentResource;
use App\Models\OrderComment;
use App\Services\Admin\OrderCommentService;
use Illuminate\Http\Request;

class OrderCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $oc_model = new OrderComment();
        $list = $oc_model->orderBy('id','desc')->paginate($request->per_page??30);
        return $this->success(new OrderCommentCollection($list));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(OrderComment $oc_model,$id)
    {
        $info = $oc_model->find($id);
        return $this->success(new OrderCommentResource($info));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $oc_service = new OrderCommentService();
        $rs = $oc_service->edit($id);
        return $rs['status']?$this->success($rs['data'],$rs['msg']):$this->error($rs['msg']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderComment $oc_model,$id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
   
        $oc_model->destroy($idArray);
        return $this->success([],__('base.success'));
    }
}
