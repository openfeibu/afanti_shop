<?php
namespace App\Services;

use App\Http\Resources\Home\ArticleResource\ArticleResource;
use App\Models\Article;

class ArticleService extends BaseService{
    // 获取文章内容
    public function getArticle($id){
        $article_model = new Article();
        $info = $article_model->where('id',$id)->first();

        // 添加阅读量
        $article_model->where('id',$id)->increment('click_num');

        if(empty($info)){
            OutputServerMessageException(__('admins.agreement_not_defined'));
        }
        return $this->format(new ArticleResource($info));
    }
    // 获取文章内容
    public function getArticleByEnName($ename){
        $article_model = new Article();
        $info = $article_model->where('ename',$ename)->first();

        // 添加阅读量
        $article_model->where('ename',$ename)->increment('click_num');

        if(empty($info)){
            OutputServerMessageException(__('admins.agreement_not_defined'));
        }
        return $this->format(new ArticleResource($info));
    }
}
