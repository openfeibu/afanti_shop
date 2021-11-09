<?php
namespace App\Services;
use App\Http\Resources\Admin\AdminResource\Admin as AdminResource;
use App\Http\Resources\Home\UserResource\UserCheckLogin;
use App\Models\Admin;
use App\Models\SmsLog;
use App\Models\Store;
use App\Models\User;
use App\Models\UserWechat;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService{

    // login
    public function login($username='username',$auth='user'){
        $credentials = request([$username, 'password']);
        if (! $token = auth($auth)->attempt($credentials)) {
            OutputServerMessageException(__('auth.error'));
        }

        if(!$userInfo = $this->getUserInfo($auth)){
            OutputServerMessageException(__('auth.user_error'));
        }

        // 登陆成功修改时间和ip
        if($auth=='admin'){
            $admin_model = Admin::find($userInfo['id']);
            $admin_model->login_time = now();
            $admin_model->last_login_time = $userInfo['login_time'];
            $admin_model->ip = request()->getClientIp();
            $admin_model->save();
        }
        if($auth=='user'){
            $oauth_name = request()->get('oauth_name','');
            switch ($oauth_name)
            {
                case 'weixinweb':
                    $oauth_data = request()->get('oauth_data');
                    $uw_model = new UserWechat();
                    // 插入第三方表
                    $uw_model->create([
                        'openid'        =>  $oauth_data['openid'],
                        'nickname'      =>  $oauth_data['nickname'],
                        'user_id'       =>  $userInfo['id'],
                        'unionid'       =>  $oauth_data['unionid'],
                        'headimgurl'    =>  $oauth_data['avatar'],
                    ]);
                    break;
            }
            $user_model = User::find($userInfo['id']);
            $user_model->login_time = now();
            $user_model->last_login_time = $userInfo['login_time'];
            $user_model->ip = request()->getClientIp();
            $user_model->save();
            // 登录送积分
            $config_service = new ConfigService();
            $config_service->giveIntegral('login');
        }

        $data = [
            'token' => $token,
            'user_info'=>$userInfo,
        ];

        return $this->format($data);
    }

    // 第三方登录
    /*
    public function oauthLogin($oauth,$oauth_name="weixinweb"){
        $user_model = new User();
        $auth = 'user';
        
        try{
            DB::beginTransaction();
            
            // 判断是否存在该ID
            if($oauth_name == 'weixinweb' || empty($oauth_name)){
                $uw_model = new UserWechat();
                $uwInfo = $uw_model->where('unionid',$oauth->unionid)->first();
                
                // 不存在则开始创建
                if(!$uwInfo){
                    $userInsertData = [];
                    $userInsertData['username'] = 'wx'.date('Ymd').mt_rand(100,999);
                    $userInsertData['nickname'] = $oauth->nickname;
                    $userInsertData['avatar'] = $oauth->avatar;
                    $userInsertData['ip'] = request()->getClientIp();
                    $userInsertData['inviter_id'] = request()->inviter_id??0;
                    $userInsertData['password'] = Hash::make('123456');
                    $userInsertData['pay_password'] = Hash::make('123456');
                    $user_id = $user_model->create($userInsertData)->id;
                    
                    // 插入第三方表
                    $uw_model->create([
                        'openid'        =>  $oauth->user['openid'],
                        'nickname'      =>  $oauth->nickname,
                        'user_id'       =>  $user_id,
                        'unionid'       =>  $oauth->unionid,
                        'headimgurl'    =>  $oauth->avatar??'',
                    ]);
                }else{
                    $user_id = $uwInfo->user_id;
                }
 
            }

            $user_info = $user_model->where('id',$user_id)->first();
            $user_info->login_time = now();
            $user_info->last_login_time = $user_info['login_time'];
            $user_info->save();
           
            if (! $token = auth($auth)->login($user_info)) {
                OutputServerMessageException(__('auth.error'));
            }
            
            if(!$userInfo = $this->getUserInfo($auth)){
                OutputServerMessageException(__('auth.user_error'));
            }

            // 登录送积分
            $config_service = new ConfigService();
            $config_service->giveIntegral('login');

            $data = [
                'token' => $token,
                'user_info'=>$userInfo,
            ];

            // 提交事务
            DB::commit();
            return $this->format($data);
        }catch(\Exception $e){
            OutputServerMessageException($e->getMessage());
        }
        
        
    }
    */
    public function oauthLogin($oauth,$oauth_name="weixinweb"){
        $user_model = new User();
        $auth = 'user';
        $is_user =  0;
        $token = '';
        $oauth_data = [];
        // 判断是否存在该ID
        if($oauth_name == 'weixinweb' || empty($oauth_name)){
            $oauth_data['nickname'] = $oauth->nickname;
            $oauth_data['avatar'] = $oauth->avatar ?? '';
            $oauth_data['openid'] = $oauth->user['openid'];
            $oauth_data['unionid'] = $oauth->unionid;

            $uw_model = new UserWechat();
            $uwInfo = $uw_model->where('unionid',$oauth->unionid)->first();

            if($uwInfo && $uwInfo->user_id)
            {
                //已注册用户直接登录返回token
                $user_id = $uwInfo->user_id;
                $is_user =  1;
                $user_model = $user_model->where('id',$user_id)->first();
                $user_model->login_time = now();
                $user_model->last_login_time = $user_model['login_time'];
                $user_model->save();
                $token = auth($auth)->login($user_model);
                $user_info = $this->getUserInfo($auth)->toArray();
                // 登录送积分
                /*
                $config_service = new ConfigService();
                $config_service->giveIntegral('login');
                */
            }else{
                $user_info = [];
            }

        }

        $data = [
            'token' => $token,
            'is_user'=> $is_user,
            'user_info' => $user_info,
            'oauth_data' => $oauth_data

        ];

        return $data;
    }

    // 绑定微信
    public function bindWechat($oauth){
        $user_id = auth()->id();
        $uw_model = new UserWechat();
        $uwInfo = $uw_model->where('unionid',$oauth['unionid'])->first();
        // 不存在则开始创建
        if($uwInfo){
            OutputServerMessageException("已经绑定，无需重复");
        }
        // 插入第三方表
        $uw_model->create([
            'openid'        =>  $oauth['openid'],
            'nickname'      =>  $oauth['nickname'],
            'user_id'       =>  $user_id,
            'unionid'       =>  $oauth['unionid'],
            'headimgurl'    =>  $oauth['avatar']??'',
        ]);
        return true;
    }

    // 注册
    public function register($username='username',$auth='user'){
        $credentials = request([$username, 'password','re_password','code']);
        $user_model = new User();
        if($user_model->where($username,$credentials[$username])->exists()){
            OutputServerMessageException(__('auth.user_exists'));
        }
        $sms_service = new SmsService();
        $smsRes = $sms_service->checkSms(request()->phone,request()->code);
        if(!$smsRes['status']){
            OutputServerMessageException($smsRes['msg']);
        }
        $config_service = new ConfigService();
        $randNickName = $credentials[$username].'_'.mt_rand(100,999);
        $user_model->username = $randNickName;
        $user_model->phone = $credentials[$username];
        $user_model->nickname = $randNickName;
        $user_model->ip = request()->getClientIp();
        $user_model->inviter_id = request()->inviter_id??0;
        $user_model->password = Hash::make($credentials['password']);
        $user_model->pay_password = Hash::make('123456');
        $user_model->avatar = $config_service->getFormatConfig()['user_avatar'];
        $user_model->save();

        $oauth_name = request()->get('oauth_name','');
        switch ($oauth_name)
        {
            case 'weixinweb':
                $oauth_data = request()->get('oauth_data');
                $uw_model = new UserWechat();
                // 插入第三方表
                $uw_model->create([
                    'openid'        =>  $oauth_data['openid'],
                    'nickname'      =>  $oauth_data['nickname'],
                    'user_id'       =>  $user_model->id,
                    'unionid'       =>  $oauth_data['unionid'],
                    'headimgurl'    =>  $oauth_data['avatar'],
                ]);
                break;
        }

        if (! $token = auth($auth)->login($user_model)) {
            OutputServerMessageException(__('auth.error'));
        }
        
        if(!$userInfo = $this->getUserInfo($auth)){
            OutputServerMessageException(__('auth.user_error'));
        }


        // 登录送积分
        $config_service = new ConfigService();
        $config_service->giveIntegral('login');

        $data = [
            'token' => $token,
            'user_info'=>$userInfo,
        ];

        return $this->format($data);
    }

    // 找回密码
    public function forgetPassword($username='username',$auth='user'){
        $credentials = request([$username, 'password','re_password','code']);
        $user_model = new User();
        if(!$user_model->where($username,$credentials[$username])->exists()){
            OutputServerMessageException(__('auth.user_not_exists'));
        }

        $sms_service = new SmsService();
        $smsRes = $sms_service->checkSms(request()->phone,request()->code);
        if(!$smsRes['status']){
            OutputServerMessageException($smsRes['msg']);
        }

        $user_model = $user_model->where($username,$credentials[$username])->first();
        $user_model->ip = request()->getClientIp();
        $user_model->password = Hash::make($credentials['password']);
        $user_model->save();
        
        // $credentials2 = request([$username, 'password']);
        if (! $token = auth($auth)->login($user_model)) {
            OutputServerMessageException(__('auth.error'));
        }
        
        if(!$userInfo = $this->getUserInfo($auth)){
            OutputServerMessageException(__('auth.user_error'));
        }

        $data = [
            'token' => $token,
            'user_info'=>$userInfo,
        ];

        return $this->format($data);
    }

    // 获取用户信息
    public function getUserInfo($auth='user'){
        try{
            $info = auth($auth)->user();
            if($auth == 'admin'){
                return new AdminResource($info);
            }
            return auth($auth)->user();
        }catch(\Exception $e){
            return false;
        }
    }

    // 检测用户是否登陆
    public function checkLogin($auth='user',$seller = false){

        // 查看是否携带token
        if(!auth($auth)->parser()->setRequest(request())->hasToken()){
            OutputServerMessageException(__('auth.no_token'));
        }

        try{
            $id = auth($auth)->payload()->get('sub');
            if(!auth($auth)->byId($id)){ // 判断是否失效
                OutputServerMessageException(__('auth.no_token'));
            }
        }catch(\Exception $e){
            OutputServerMessageException(__('auth.error_token'));
        }

        if($seller){
            $stores_model = new Store();
            $store_info = $stores_model->select('id','store_name','store_logo')->where('user_id',auth($auth)->id())->first();
            if(!$store_info){
                OutputServerMessageException(__('auth.error_token'));
            }
            return $this->format($store_info);
        }

        return $this->format(new UserCheckLogin($this->getUserInfo($auth)));
        
    }

    /**
     * 修改用户资料 function
     *
     * @param string $auth 前端允许修改和后台允许修改
     * @return void
     * @Description
     *
     */
    public function editUser($auth='user'){
        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();

        $config_service = new ConfigService;
        $sms = $config_service->getFormatConfig('alisms');

        $user_model = User::find($user_info['id']);

        // 微信绑定
        /*
        if(isset(request()->oauth)){
            try{
                $oauth = json_decode(request()->oauth,true);
            }catch(\Exception $e){
                OutputServerMessageException("绑定失败");
            }

            $bindRes = $this->bindWechat($oauth);
            if(!$bindRes['status']){
                OutputServerMessageException($bindRes['msg']);
            }
            return $this->format([]);
        }
        */
        // 昵称
        if(isset(request()->nickname)){
            $user_model->nickname = request()->nickname;
        }
        // 头像
        if(isset(request()->avatar)){
            $user_model->avatar = request()->avatar;
        }
        // 用户名
        if(isset(request()->username)){
            $user_model->username = request()->username;
        }
        // 性别
        if(isset(request()->sex)){
            $user_model->sex = abs(intval(request()->sex));
        }

        // 密码
        if(
            (isset(request()->password) && !empty(request()->password)) ||
            (isset(request()->pay_password) && !empty(request()->pay_password)) ||
            (isset(request()->phone) && !empty(request()->phone))
        ){
            // 判断
            if($auth == 'user'){

                // 如果并没有配置则直接提示未配置，不再做任何操作
                if(empty($sms['key']) || empty($sms['secret'])) {
                    $this->format_error(__('sms.sms_config_not_fond'));
                }

                if(!isset(request()->code) || empty(request()->code)){
                    OutputServerMessageException(__('users.edit_code_error'));
                }

                $sms_service = new SmsService();
                $smsRes = $sms_service->checkSms($user_model['phone'],request()->code);
                if(!$smsRes['status']){
                    OutputServerMessageException($smsRes['msg']);
                }
            }
            
            if(isset(request()->password) || !empty(request()->password)){
                $user_model->password = Hash::make(request()->password);
            }
            if(isset(request()->pay_password) || !empty(request()->pay_password)){
                if(strlen(request()->pay_password)!=6){
                    OutputServerMessageException(__('users.pay_password_len'));
                }
                $user_model->pay_password = Hash::make(request()->pay_password);
            }
            if(isset(request()->phone) || !empty(request()->phone)){
                $sms_service = new SmsService();
                $phone_check = $sms_service->check_phone(request()->phone);
                if(!$phone_check){
                    OutputServerMessageException(__('sms.phone_error'));
                }

                $user_model->phone = request()->phone;
            }

        }
        $user_model->save();
        return $this->format([]);
    }
    
}
