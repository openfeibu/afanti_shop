<template>
    <div class="user_user_info">
        <div class="user_main">
            <div class="block_title">
                修改登陆密码
            </div>
            <div class="x20"></div>
            <div class="uif_block" >
                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-model-item label="旧手机号码"><span style="background:#efefef;padding:0 20px;">{{info.phone||'-'}}</span></a-form-model-item>
                    <a-form-model-item label="手机号码">
                        <a-input  v-model="params.phone" />
                    </a-form-model-item>
                    <a-form-model-item label="确认手机">
                        <a-input v-model="params.re_phone" />
                    </a-form-model-item>
                    
                    <a-form-model-item label="短信验证">
                        <a-input style="width: 200px" v-model="params.code" />
                        <span :class="math>0?'yzmbtn dis':'yzmbtn'" @click="send_sms">{{code_text}}</span>
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                        <div class="submit_btn" @click="handleSubmit">确定提交</div>
                    </a-form-model-item>
                </a-form-model>
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
          info:{
              
          },
          params:{},
          code_text:'发送验证码',
          timeObj:null,
          math:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        // 发送短信
        send_sms(){
            if(this.info.phone == ''){
                return this.$message.error('手机不能为空.');
            }
            if(this.math>0){
                return this.$message.error('不要频繁发送短信.');
            }

            // 发送
            this.$get(this.$api.homeSendSms,{phone:this.info.phone,name:'edit_user'}).then(res=>{
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
        get_user_info(){
            this.$get(this.$api.homeUser+'/info').then(res=>{
                this.info = res.data;
            })
        },
        handleSubmit(){
            if(this.params.phone != this.params.re_phone){
                return this.$message.error('两次手机不相符.');
            }
            this.$put(this.$api.homeUser+'/edit_user',this.params).then(res=>{
                this.$returnInfo(res);
            })
        },
      
    },
    created() {
        this.get_user_info()
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.yzmbtn{
    cursor: pointer;
    width: 140px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    background: #333;
    margin-left: 20px;
    color:#fff;
    &.dis{
        background: #ccc;
        color:#666;
    }
}
</style>