<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\OrderResource\OrderCollection;
use App\Http\Resources\Admin\OrderResource\OrderResource;
use App\Models\Express;
use App\Models\Order;
use App\Services\Admin\OrderService;
use App\Services\KuaibaoService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(OrderService $order_service,
                                KuaibaoService $kuaibaoService)
    {
        $this->order_service = $order_service;
        $this->kuaibaoService = $kuaibaoService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rs = $this->order_service->getOrders('admin');
        return $rs['status']?$this->success(new OrderCollection($rs['data'])):$this->error($rs['msg']);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rs = $this->order_service->getOrderInfoById($id,'admin');
        return $rs['status']?$this->success(new OrderResource($rs['data'])):$this->error($rs['msg']);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order_model, $id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
        $order_model->destroy($idArray);
        return $this->success(__('base.success'));
    }
    public function delivery(Request $request, $id)
    {
        $rs = $this->order_service->getOrderInfoById($id,'admin');
        $order = $rs['data'];
        $data = [
            'delivery_code' => $request->get('delivery_code',''),
            'delivery_no' =>  $request->get('delivery_no',''),
        ];
        $data['delivery_company'] = Express::where('code',$data['delivery_code'])->value('name');
        $this->order_service->delivery($order,$data);

        return $this->success([],'发货成功');
    }
    public function confirm_cancel(Request $request, $id)
    {
        $rs = $this->order_service->getOrderInfoById($id,'admin');
        $order = $rs['data'];
        $data = [
            'is_cancel' => $request->get('is_cancel',''),
            'delivery_no' =>  $request->get('delivery_no',''),
        ];
        $this->order_service->confirmCancel($order,$data);
        return $this->success([],'审核成功');
    }
    public function delivery_info($id)
    {
        $order = Order::find($id);
        return $this->success([]);
        $list = $this->kuaibaoService->getExpressInfo($order->delivery_no,$order->delivery_code,$order->receive_tel);
        return $this->success($list);
    }
}
