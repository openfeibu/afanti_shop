<template>
    <div class="home_login" :style="'background: url('+ require('@/asset/login/user_login__bgs.png') +');'">
        <div class="login_block w1200" v-if="isUser">
            <div class="login_item">
                <div class="login_title">
                    <ul>
                        <li class="red">帐号登录</li>
                        <li>|</li>
                        <li @click="$router.push('/user/register')">注册账号</li>
                    </ul>
                </div>
                <div class="login_input">
                    <div class="input_block"><input type="text" v-model="username" placeholder="手机" @keyup.enter="login"></div>
                    <div class="input_block"><input type="password" v-model="password" placeholder="密码" @keyup.enter="login"></div>
                </div>

                <div class="login_btn" @click="login">登 录</div>

                <div class="login_btn_b">
                    <router-link to="/user/forget_password">忘记密码？</router-link>
                </div>

                <a-divider>其他登录方式</a-divider>
                <div class="other_login_block" @click="wechat_login()">
                    <a-font type="iconweixin" />
                    <p>微信登录</p>
                </div>
            </div>
        </div>
         <div class="login_binding w1200" v-else>
            <div class="login_item">
                <div class="login_title">
                    <ul>
                        <li :class="{red:tag==1}" @click="changeTag(1)">绑定已有账号</li>
                        <li>|</li>
                        <li :class="{red:tag==2}"  @click="changeTag(2)">注册账号</li>
                    </ul>
                </div>
                <div class="login_user">
                    <div class="img"><img :src="oauth_data.avatar" alt=""></div>
                    <div class="name">{{oauth_data.nickname}}</div>
                </div>
                <div class="login_binding_login" v-if="tag==1">
                    <div class="login_input">
                        <div class="input_block"><input type="text" v-model="bindingusername" placeholder="手机" ></div>
                        <div class="input_block"><input type="password" v-model="bindingpassword" placeholder="密码" @keyup.enter="login"></div>
                    </div>

                    <div class="login_btn" @click="login('weixinweb')">绑 定</div>
                </div>
                <div class="login_binding_reg" v-if="tag==2">
                    <div class="login_input">
                        <div class="input_block"><input type="text" v-model="regusername" placeholder="手机" @keyup.enter="register"></div>
                        <div class="input_block"><input type="password" v-model="regpassword" placeholder="密码" @keyup.enter="register"></div>
                        <div class="input_block"><input type="password" v-model="regre_password" placeholder="确认密码" @keyup.enter="register"></div>
                        <div class="input_block">
                            <input class="yzm" type="code" v-model="regcode" placeholder="验证码" @keyup.enter="register">
                            <span :class="math>0?'yzmbtn dis':'yzmbtn'" @click="send_sms">{{code_text}}</span>
                        </div>
                    </div>

                    <div class="login_btn" @click="register('weixinweb')">注 册</div>

                </div>
            </div>
        </div>
        <loading v-if="isLoading" />  
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                bindingusername: "",
                bindingpassword: "",
                username: "",
                password: "",
                regusername: "",
                regpassword: "",
                regre_password: "",
                regcode: "",
                code_text:'发送验证码',
                timeObj:null,
                math:0,
                oauth_data:{},
                isUser:1,
                tag:1,
                 code_text:'发送验证码',
                 isLoading:false,
            };
        },
        watch: {},
        computed: {},
        methods: {
            // 登录
            login: function(from) {
                this.isLoading = true;
                // 重新赋值vm使 axios可用vue实例
                var vm = this;
                var from = from || '';
                 var params = {};
                 if(from == 'weixinweb'){
                      if (this.bindingusername == "" || this.bindingpassword == "") {
                        this.$message.error("用户名和密码不能为空！");
                        return;
                    }
                    params.oauth_data = vm.oauth_data;
                    params.oauth_name = 'weixinweb';
                    params.phone = this.bindingusername;
                    params.password = this.bindingpassword;
                }else{
                    if (this.username == "" || this.password == "") {
                        this.$message.error("用户名和密码不能为空！");
                        return;
                    }
                    params = {
                        phone: this.username,
                        password: this.password
                    }
                }
                this.$post(this.$api.homeLogin, params).then(function(res) {
                      vm.isLoading = false;
                    if (res.code == 200) {
                        // console.log(res);
                        // 存储用户的token
                        localStorage.setItem("token", res.data.token);
                        vm.$store.dispatch('homeLogin/login',res);
                        vm.$message.success('登录成功！');
                        vm.$router.push({ name: "home_user_default" });
                    }else{
                        vm.$message.error(res.msg);
                    }
                  
                });
            },
            wechat_login(){
                var vm = this;
                //window.location.href="/api/oauth/weixinweb"
                //关键 方法打开一个新页面请求这个地址 其实 process.env.GITEE_CLIENT_ID 和process.env.REDIRECT_URI 写在配置文件中
                window.open('/api/oauth/weixinweb', 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
               // window.open('/api/oauth/callback/weixinweb', 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
                //监听回调方法 方法文档地址：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
                window.addEventListener('message', function (e) {
                    console.log(e.data);
                    vm.isUser = e.data.is_user;
                    //已经注册且绑定用户
                    if(e.data.is_user)
                    {
                        localStorage.setItem("token", e.data.token);
                        var res = {'data':{'token':'','user_info':{}}};
                        res['data']['token'] = e.data.token;
                        res['data']['user_info'] = e.data.user_info;
                         console.log(res);
                        vm.$message.success('登录成功！');
                        vm.$store.dispatch('homeLogin/login',res);
                        vm.$router.push({ name: "home_user_default" });
                        //window.location.href="/user";
                    }else{
                        //已注册，调用登录接口绑定；未注册，调用注册接口绑定。 接口加多字段oauth_data（e.data.oauth_data）,oauth_name: 'weixinweb'
                        vm.oauth_data = e.data.oauth_data;

                    }

                }, false)

            },
            changeTag(tag){
                this.tag = tag;
            },
              // 发送短信
        send_sms(){
            if(this.username == ''){
                return this.$message.error('手机不能为空.');
            }
            if(this.math>0){
                return this.$message.error('不要频繁发送短信.');
            }

            // 发送
            this.$get(this.$api.homeSendSms,{phone:this.username,name:'register'}).then(res=>{
                if(res.code == 200){
                    this.math = 60;
                    this.timeObj = setInterval(()=>{
                        this.math--;
                        this.code_text = this.math+'s'
                        if(this.math<=0){
                            this.code_text = '发送验证码'
                            clearInterval(this.timeObj);
                        }
                    },1000);
                }
                return this.$returnInfo(res);
            })

            
        },
        // 注册新账号
        register: function() {
            // 重新赋值vm使 axios可用vue实例
            this.isLoading = true;
            var vm = this;
             var from = from || '';
            if (this.regusername == "" || this.regpassword == "") {
                this.$message.error("用户名和密码不能为空！");
                return;
            }
             var params = {
                    phone: this.regusername,
                    password: this.regpassword,
                    re_password: this.regre_password,
                    code: this.regcode,
                    oauth_data:vm.oauth_data,
                    oauth_name: 'weixinweb'
                }
            this.$post(this.$api.homeRegister, params).then(function(res) {
                  vm.isLoading = false;
                if (res.code == 200) {
                    // console.log(res);
                    // 存储用户的token
                    localStorage.setItem("token", res.data.token);
                    vm.$store.dispatch('homeLogin/login',res);
                    vm.$message.success('注册成功！');
                    vm.$router.push({ name: "home_user_default" });
                }else{
                    vm.$message.error(res.msg);
                }
                
            });
        },
        },
        created: function() {
            var _this = this;
            // 判断token是否失效
            this.$get(this.$api.homeCheckLogin).then(function(res) {
                // console.log(res);
                if (res.code == 200) {
                    _this.$router.push({ name: "home_user_default" });
                }
                
            });
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>
    .login_block{
        text-align: right;
        .login_btn_b{
            text-align: right;
            font-size: 12px;
            margin-top: 15px;
            margin-bottom: 40px;
        a{
            margin:0 8px;
            color:#999;
        }
        }
        .other_login_block{
            cursor: pointer;
            text-align: center;
            line-height: 30px;
            i{
                font-size: 30px;
            }
        }
        .login_item{
            width: 400px;
            background: #fff;
            height: 450px;
            float: right;
            box-sizing: border-box;
            padding: 40px;
            margin-top: 50px;
            text-align: left;
        .login_btn{
            cursor: pointer;
            color:#fff;
            background: #ca151e;
            line-height: 35px;
            width: 100%;
            text-align: center;
            font-size: 16px;
        }
        .login_input{
            margin-top: 30px;
            .input_block{
                margin: 15px auto;
                width: 320px;
                input{
                    width: 100%;
                    border:1px solid #e1e1e1;
                    height: 35px;
                    text-indent: 6px;
                    outline: none;
                }
            }
        }
        .login_title{
        ul{
            margin-left: 55px;
        &:after{
            content:'';
            display: block;
            clear:both;
        }
        }
        ul li{
            cursor: pointer;
            float: left;
            margin-right: 20px;
            font-size: 20px;
        &.red{
            color:#ca151e;
        }
        &:hover{
            color:#ca151e;
        }
        }
        }
    }
    }
    .home_login{
        height: 550px;
    }
     .login_binding{
        text-align: center;
        overflow: hidden;
        .login_btn_b{
            text-align: center;
            font-size: 12px;
            margin-top: 15px;
            margin-bottom: 40px;
        a{
            margin:0 8px;
            color:#999;
        }
        }
        .other_login_block{
            cursor: pointer;
            text-align: center;
            line-height: 30px;
            i{
                font-size: 30px;
            }
        }
        .login_item{
            width: 600px;
            background: #fff;
            height: 450px;
            box-sizing: border-box;
            padding: 40px;
        
            text-align: left;
            margin:50px auto 0 auto;
            .login_title{
                text-align: center;
            }
            .login_btn{
                cursor: pointer;
                color:#fff;
                background: #ca151e;
                line-height: 35px;
                width: 320px;
                text-align: center;
                font-size: 16px;
                margin:30px auto 0 auto;
            }
            .login_input{
             
            .input_block{
                margin: 15px auto;
                width: 320px;
            .yzmbtn{
                    cursor: pointer;
                    width: 140px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    text-align: center;
                    background: #333;
                    color:#fff;
                    &.dis{
                        background: #ccc;
                        color:#666;
                    }
                }
                input{
                    width: 100%;
                    border:1px solid #e1e1e1;
                    height: 35px;
                    text-indent: 6px;
                    outline: none;
                    &.yzm{
                        width: 50%;
                        margin-right: 5%;
                    }
                }
            }
            }
            .login_title{
            ul{

            }
            ul li{
                cursor: pointer;
                display: inline-block;
                *display: inline-block;
                margin-right: 20px;
                font-size: 20px;
            &.red{
                color:#ca151e;
            }
            &:hover{
                color:#ca151e;
            }
            }
            }
            .login_binding_login{
                margin-top: 30px;
            }
            .login_user{
                margin-top: 30px;
                height: 50px;
                .img{float: left;width: 50px;height: 50px;border-radius: 50%;margin-left: 100px;overflow: hidden;}
                img{width: 100%;height: 100%;}
                .name{line-height: 50px;margin-left: 170px;font-size: 20px;}
            }
        }
    }
</style>