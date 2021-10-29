<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //

    public function article_category()
    {
        return $this->belongsTo("App\Models\ArticleCategory",'article_category_id','id');
    }
}
