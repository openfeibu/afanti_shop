<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ArticleResource\ArticleCollection;
use App\Models\BeaconStore;
use App\Models\Store;
use Illuminate\Http\Request;
use App\Models\Beacon;

class BeaconController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,Beacon $beacon_model)
    {
        if(!empty($request->major_id)){
            $beacon_model = $beacon_model->where('major_id','like','%'.$request->major_id.'%');
        }
        $beacons = $beacon_model->orderBy('id','desc')->paginate($request->per_page??30);
        foreach ($beacons as $key => $beacon)
        {
            $beacon_store = BeaconStore::where('beacon_id',$beacon->id)->first();
            $beacon->store_id = $beacon_store ? $beacon_store->store_id : 0;
            $beacon->store_name = $beacon_store ?  Store::where('id',$beacon->store_id)->value('store_name'): '';
        }
        return $this->success($beacons);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Beacon $beacon_model
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,Beacon $beacon_model)
    {
        $beacon_model->major_id = $request->major_id??'';
        $beacon_model->save();

        if($request->store_id)
        {
            BeaconStore::create([
                'beacon_id' => $beacon_model->id,
                'store_id' => $request->store_id,
            ]);
        }
        return $this->success([],__('base.success'));
    }

    /**
     * Display the specified resource.
     *
     * @param Beacon $beacon_model
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Beacon $beacon_model,$id)
    {
        $info = $beacon_model->find($id);
        $beacon_store = BeaconStore::where('beacon_id',$id)->first();
        $info->store_id = $beacon_store ? $beacon_store->store_id : 0;
        return $this->success($info);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Beacon $beacon_model
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Beacon $beacon_model, $id)
    {
        $beacon_model = $beacon_model->find($id);
        $beacon_model->major_id = $request->major_id??'';
        $beacon_model->save();
        if($request->store_id)
        {
            $beacon_store = BeaconStore::where('beacon_id',$id)->first();
            if($beacon_store)
            {
                $beacon_store->store_id = $request->store_id;
                $beacon_store->save();
            }else{
                BeaconStore::create([
                    'beacon_id' => $beacon_model->id,
                    'store_id' => $request->store_id,
                ]);
            }

        }
        return $this->success([],__('base.success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Beacon $beacon_model
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Beacon $beacon_model,$id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
        $beacon_model->destroy($idArray);
        return $this->success([],__('base.success'));
    }
}
