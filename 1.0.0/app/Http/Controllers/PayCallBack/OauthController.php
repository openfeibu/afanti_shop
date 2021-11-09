<?php

namespace App\Http\Controllers\PayCallBack;

use App\Http\Controllers\Controller;
use App\Services\ConfigService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use SocialiteProviders\WeixinWeb\Provider;

class OauthController extends Controller
{
    /**
     * 将用户重定向到 第三方 授权页面
     *
     * @return \Illuminate\Http\Response
     */
    public function oauth($oauth_name){
        $config_service = new ConfigService();
        $info = $config_service->getFormatConfig('oauth')[$oauth_name];
        $config = new \SocialiteProviders\Manager\Config($info['client_id'], $info['client_secret'], $info['redirect'], []);
        return Socialite::driver($oauth_name)->setConfig($config)->redirect();
    }


    /**
     * 从 第三方 获取用户信息
     *
     * @return \Illuminate\Http\Response
     */
    public function oauthCallback($oauth_name)
    {
        //$oauth = Socialite::driver($oauth_name)->stateless()->user(); // 无认证状态#
        $oauth['nickname'] = 'G';
        $oauth['avatar'] = 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIwX34ia7XZUKGzFbkHD8RaMo4glz1Gc6Qib4Zo3UbAruxAsC8lemib1tRGriae7skYeTRLAuqdS0AibAg/132';
        $oauth['openid'] = 'oSIRP6Q8nLk40LjUzRAMnzCu4W7k';
        $oauth['unionid'] = 'omuPAwsDeh4cg6p0XOhqD9oBzds1';
        $oauth = (object)$oauth;
        $oauth->user['openid'] = 'oSIRP6Q8nLk40LjUzRAMnzCu4W7k';
        $user_service = new UserService();
        $data = $user_service->oauthLogin($oauth,$oauth_name);

        return view('oauth', [
            'data' => $data,
            //'domain' => "http://afanti.feibu.info",
            'domain' => "http://afanti_shop.g.com",
        ]);

        // $user->token;
    }

}
