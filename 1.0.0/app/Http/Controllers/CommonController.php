<?php

namespace App\Http\Controllers;

use App\Models\GoodsAttr;
use Illuminate\Http\Request;
use App\Http\Resources\Common\GoodsAttrResource\GoodsAttrCollection;

class CommonController extends Controller
{
    public function goods_attrs(Request $request,GoodsAttr $goods_attr_model)
    {
        $list = $goods_attr_model->with('specs')->orderBy('id','desc')->paginate($request->per_page??30);
        return $this->success(new GoodsAttrCollection($list));
    }
}
