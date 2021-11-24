<?php

namespace App\Http\Controllers\Weapp;

use App\Http\Controllers\Controller;
use App\Services\AdvService;
use App\Services\ArticleService;

class IndexController extends Controller
{
   public function getBanners()
   {
       $adv_service = new AdvService();
       $banners = $adv_service->getAdvList('小程序_首页幻灯片')['data'];
       return $this->success($banners);
   }
   public function getAboutUs()
   {
       $article_service = new ArticleService();
       $about_us = $article_service->getArticleByEnName('about_us');
       return $this->success($about_us['data']);
   }
}
