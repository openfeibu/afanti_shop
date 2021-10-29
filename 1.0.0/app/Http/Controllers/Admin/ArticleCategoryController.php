<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ArticleResource\ArticleCategoryCollection;
use Illuminate\Http\Request;
use App\Models\ArticleCategory;

class ArticleCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,ArticleCategory $article_category_model)
    {
        if(!empty($request->name)){
            $article_category_model = $article_category_model->where('name','like','%'.$request->name.'%');
        }
        if(!empty($request->ename)){
            $article_category_model = $article_category_model->where('ename','like','%'.$request->ename.'%');
        }
        $list = $article_category_model->orderBy('id','asc')->get();
        return $this->success($list);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,ArticleCategory $article_category_model)
    {
        $article_category_model->name = $request->name??'';
        $article_category_model->save();
        return $this->success([],__('base.success'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ArticleCategory $article_category_model,$id)
    {
        $info = $article_category_model->find($id);
        return $this->success($info);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,ArticleCategory $article_category_model, $id)
    {
        $article_category_model = $article_category_model->find($id);
        $article_category_model->name = $request->name;
        $article_category_model->save();
        return $this->success([],__('base.success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ArticleCategory $article_category_model,$id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });
        $article_category_model->destroy($idArray);
        return $this->success([],__('base.success'));
    }
}
