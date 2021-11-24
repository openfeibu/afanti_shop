<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function categories(){
        // todo:后台设置
        $categories = ArticleCategory::where('is_show',1)->orderBy('id','asc')->get();
        foreach ($categories as $key => $category)
        {
            $category->articles = Article::where('article_category_id',$category->id)->orderBy('id','asc')->get(['id','name','ename']);
        }
        return $this->success($categories);
    }
    public function show(ArticleService $article_service,$id){
        $info = $article_service->getArticle($id);
        if($info['status']){
            return $this->success($info['data']);
        }else{
            return $this->error($info['msg']);
        }
    }
}
