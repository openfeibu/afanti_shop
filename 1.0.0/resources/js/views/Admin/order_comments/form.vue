<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            评论详细
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-divider orientation="left">
                评论
            </a-divider>
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="评论内容">
                        {{params.content}}
                </a-form-model-item>

                <a-form-model-item label='综合评分'>
                    <a-rate disabled style="font-size:14px;line-height: 16px;" v-model="params.score" :tooltips="desc" />
                    <span class="ant-rate-text">{{ desc[params.score-1] }}分</span>
                </a-form-model-item>
                <a-form-model-item label='描述相符'>
                    <a-rate disabled style="font-size:14px;line-height: 16px;" v-model="params.agree" :tooltips="desc" />
                    <span class="ant-rate-text">{{ desc[params.agree-1] }}分</span>
                </a-form-model-item>
                <a-form-model-item label='服务态度'>
                    <a-rate disabled style="font-size:14px;line-height: 16px;" v-model="params.service" :tooltips="desc" />
                    <span class="ant-rate-text">{{ desc[params.service-1] }}分</span>
                </a-form-model-item>
                <a-form-model-item label='发货速度'>
                    <a-rate disabled style="font-size:14px;line-height: 16px;" v-model="params.speed" :tooltips="desc" />
                    <span class="ant-rate-text">{{ desc[params.speed-1] }}分</span>
                </a-form-model-item>
                <a-form-model-item label="图片">
                    <div class="goods_image"  v-if="params.image.length>0">
                        <div class="item" v-if="params.image.length>0">
                            <div class="item_img" v-for="(v,k) in params.image" :key="k" >
                                <img width="160px" style="margin-right:15px;border:1px solid #efefef;float:left;" :src="v" />
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="item noimg" v-else><a-font type="iconphoto" /></div>
                    </div>
                </a-form-model-item>
                <a-divider orientation="left">
                    审核&回复
                </a-divider>
                <a-form-model-item label="回复内容">
                    <a-textarea placeholder="输入评论内容..." :rows="4" allow-clear v-model="params.reply" />
                </a-form-model-item>
                <a-form-model-item label="是否显示">
                    <a-switch  v-model="params.active" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>
            
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
              order_id:0,
              score:5,
              agree:5,
              service:5,
              speed:5,
              content:'',
              image:[],
              active:true,
          },
          desc: [1.00, 2.00, 3.00, 4.00, 5.00],
          id:0,

      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){
            this.params.active = this.params.active?1:0;
            this.$put(this.$api.adminOrderComments+'/'+this.id,{reply:this.params.reply,'active':this.params.active}).then(res=>{
                this.$returnInfo(res);
                return this.$router.go(-1);
            })
        },
        get_info(){
            this.$get(this.$api.adminOrderComments+'/'+this.id).then(res=>{
                this.params = res.data;
            })
        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
 
        },
        
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>