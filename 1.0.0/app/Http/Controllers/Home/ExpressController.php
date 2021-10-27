<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Express;
use Illuminate\Http\Request;

class ExpressController extends Controller
{

    public function all_expresses(Request $request,Express $express_model)
    {
        $list = $express_model->orderBy('id','asc')->get();
        return $this->success($list);
    }

}
