<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Services\BargainService;
use Illuminate\Http\Request;

class BargainController extends Controller
{
    public function __construct(BargainService $bargain_service)
    {
        $this->bargain_service = $bargain_service;
    }

    public function index(){
        $rs = $this->bargain_service->getBargains();
        return $this->success($rs['data']);
    }


}
