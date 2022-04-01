<?php
namespace app\api\service\ezviz;

use app\common\exception\BaseException;
use think\Cache;
use GuzzleHttp\Client;

class BroadcastService{
    //萤石云 appKey
    protected $appKey = "e2db4c6264904ad9957be8b8ffe34990";

    //萤石云 appSecret
    protected $appSecret = "ac656ac967f456ca2a1f7fa41c6a396e";

    //请求头部
    protected $header=['Content-Type: application/x-www-form-urlencoded'];

    protected $live_url = 'https://open.ys7.com/api/lapp/v2/live/address/get';
    /**
     * 获取授权的accessToken
     */
    public function getAccessToken()
    {
        $url = 'https://open.ys7.com/api/lapp/token/get';
        //$request_data = "appKey=$this->appKey&appSecret=$this->appSecret";
        $request_data = [
            'appKey' => $this->appKey,
            'appSecret' => $this->appSecret
        ];
        $accessToken = Cache::get('accessToken');
        if(!$accessToken || $accessToken['expireTime'] < getUnixTimestamp()){// 缓存 不存在 或者 缓存 accessToken 已过期
            $accessToken = $this->httpPost($url,$this->header,$request_data);
            Cache::set('accessToken',$accessToken['data']);
            return $accessToken['data']['accessToken'];
        }
        return $accessToken['accessToken'];

    }
    public function getLiveAddress($accessToken,$deviceSerial,$channelNo)
    {
        $request_data = [
            'accessToken' => $accessToken,
            'deviceSerial' => $deviceSerial,
            'channelNo' => $channelNo,
            'protocol' => 2,
            'quality' => 2,
        ];
        $live_address_data = $this->httpPost($this->live_url,$this->header,$request_data);

        if(!$live_address_data || $live_address_data['code'] != '200')
        {
            return '';
        }
        return $live_address_data['data']['url'];
    }

    public function httpPost($url,$header ,$request_data=array())
    {
        $client = new Client();
        $res = $client->request('POST', $url, [
            'headers' => $header,
            'form_params' => $request_data
        ]);
        $res->getStatusCode(); // 获得接口反馈状态码
        $body = $res->getBody(); //获得接口返回的主体对象
        $content =$body->getContents(); //获得主体内容

        $res = json_decode($content, true);
        if(!$res || $res['code'] != '200')
        {
            throw new BaseException($res['msg'].' 请联系管理员。');
        }
        return $res;
    }

}