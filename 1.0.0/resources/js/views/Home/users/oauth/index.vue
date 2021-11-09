<template>
    <div class="safe">
        <div class="user_main">
            <div class="block_title">
                账号绑定
            </div>
            <div class="x20"></div>
            <div class="safe_block" >
                <ul>
                    <li>
                        <div class="safe_icon"><a-font type="iconweixin" /></div>
                        <div class="safe_text">微信绑定<p>绑定后可直接使用微信登录，方便快捷。</p></div>
                        <div class="safe_btn2" v-if="user_info.wechat_check">已经绑定</div>
                        <div class="safe_btn" v-else  @click="wechat_login()">立即绑定</div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          user_info:{},
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_user_info(){
            this.$get(this.$api.homeUser+'/info').then(res=>{
                this.user_info = res.data;
            })
        },
        wechat_login(){
            var vm = this;
            //window.open('/api/oauth/weixinweb', 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
            window.open('/api/oauth/callback/weixinweb', 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
            window.addEventListener('message', function (e) {
                console.log(e.data);
                //已经注册且绑定用户
                vm.$put(vm.$api.homeUser+'/bind_oauth',{'oauth_name':'weixinweb','oauth_data':e.data.oauth_data}).then(res=>{
                    if(res.code == 200)
                    {
                        vm.$message.success(res.msg)
                        vm.user_info.wechat_check = true
                    }else{
                        vm.$message.error(res.msg)
                    }

                })
            }, false)

        },
    },
    created() {
        this.get_user_info();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.safe_block{
    min-height: 600px;
    li{clear:both;border-bottom: 1px solid #f1f1f1;}
    ul li:after{
        clear:both;
        display: block;
        content:'';
    }
    &:after{
        clear:both;
        display: block;
        content:'';
    }
    .safe_icon{
        line-height: 90px;
        margin-right: 40px;
        margin-left: 15px;
        float: left;
        i{
            font-size: 34px;
            color:#333;
        }
        &.success i{
            color: #42b983;
        }
    }
    .safe_text{
        float: left;
        font-size: 16px;
        font-weight: bold;
        padding-top: 10px;
        line-height: 25px;
        p{
            font-size: 14px;
            color: #666;
            font-weight: normal;
        }
    }
    .safe_btn{
        border: 1px solid #efefef;
        width: 100px;
        line-height: 30px;
        background: #fff;
        text-align: center;
        float: right;
        margin-top: 28px;
        margin-right: 15px;
        cursor: pointer;
        &:hover{
            color:#ca151e;
            border-color: #ca151e;
        }
    }
    .safe_btn2{
        border: 1px solid #efefef;
        width: 100px;
        line-height: 30px;
        background: #fff;
        text-align: center;
        float: right;
        margin-top: 28px;
        margin-right: 15px;
        color:#ca151e;
        border-color: #ca151e;
      
    }
}
</style>