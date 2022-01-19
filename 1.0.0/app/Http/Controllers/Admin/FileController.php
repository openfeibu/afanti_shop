<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\FileResource\FileCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Models\File;
use Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $list = File::orderBy('id', 'desc')->paginate($request->per_page??30);
        return $this->success(new FileCollection($list));
    }

    /**
     * Remove the specified resource from storage.
     * @param $file_model
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file_model, $id)
    {
        $file = File::find($id);
        if(!$file)
        {
            throw new ModelNotFoundException("未找到相关数据");
        }
        Storage::disk($file->disk)->delete($file->path);
        $file->delete();
        return $this->success([],__('base.success'));
    }

}