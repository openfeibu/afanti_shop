<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Services\Ezviz\BroadcastService;

class EzvizController extends Controller
{
    public function __construct(BroadcastService $broadcastService )
    {
        $this->broadcastService = $broadcastService;
    }

    public function getEquipments()
    {
        $access_token =  $this->broadcastService->getAccessToken();
        $equipment_sn = 'G40811583';
        $channels = [];
        $equipments = [];
        $j=0;
        for ($i=15;$i<=28;$i++)
        {
            $equipments[$j] = 'ezopen://jgbz123456@open.ys7.com/'.$equipment_sn.'/'.$i.'.live';
            $j++;
        }
        $data['access_token'] = $access_token;
        $data['equipments'] = $equipments;
        return $this->format($data);
    }
}