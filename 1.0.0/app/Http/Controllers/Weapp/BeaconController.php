<?php

namespace App\Http\Controllers\Weapp;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\BeaconResource\BeaconCollection;
use App\Http\Resources\Home\StoreResource\StoreResource;
use App\Models\Beacon;
use App\Models\BeaconStore;
use App\Models\Store;


class BeaconController extends Controller
{
   public function getBeacons()
   {
       $beacons = Beacon::orderBy('id','asc')->get();
       foreach ($beacons as $key => $beacon)
       {
           $beacon_store = BeaconStore::where('beacon_id',$beacon->id)->first();
           $store = $beacon_store ? Store::where('id',$beacon_store->store_id)->first() : [];
           $beacon->store = $store ? new StoreResource($store) : [];
       }
       $beacons = new BeaconCollection($beacons);
       $data = [];
       foreach ($beacons as $key => $beacon)
       {
           $data[$beacon['major_id']] = $beacon;
       }
       return $this->format(new BeaconCollection($data)['data']);
   }
}
