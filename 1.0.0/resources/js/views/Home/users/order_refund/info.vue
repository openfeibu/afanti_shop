<template>
    <div class="user_user_info">
        <div class="user_main">
            <div class="block_title">
                申请售后
            </div>
            <div class="x20"></div>
            <div class="uif_block" >
                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

                    <a-form-model-item label="商品详情">
                        <div class="admin_pic_txt">
                            <div class="img"><img v-if="info.order_goods.goods_image" :src="info.order_goods.goods_image"><a-icon v-else type="picture" /></div>
                            <div class="text">{{info.order_goods.goods_name}}</div>
                            <div class="clear"></div>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="商品金额">
                        {{info.order_goods.total_pay_price}}
                    </a-form-model-item>
                    <a-form-model-item label="申请售后状态">
                        {{ info.status_text_detail }}
                    </a-form-model-item>
                    <a-form-model-item label="售后类型">
                        {{info.refund_type_text}}
                    </a-form-model-item>

                    <a-form-model-item v-if="info.status == 20 && info.refund_type == 10" class="detail-order b-f row-block dis-flex flex-x-end flex-y-center">
                        <text class="">已退款金额：</text>
                        <text class="col-m">￥{{ info.refund_money }}</text>
                    </a-form-model-item>

                    <a-form-model-item label="售后原因">
                        {{info.refund_remark}}
                    </a-form-model-item>
                    <!-- 售后信息 -->
                    <a-form-model-item v-if="info.status == 10 " label="拒绝原因">
                        <span>{{ info.refuse_desc }}</span>
                    </a-form-model-item>

                    <a-divider orientation="退货地址" >
                        <a-form-model-item label="收货人">
                            {{info.address.name}}
                        </a-form-model-item>
                        <a-form-model-item label="联系电话">
                            {{info.address.phone}}
                        </a-form-model-item>
                        <a-form-model-item label="详细地址">
                            {{info.address.detail}}
                        </a-form-model-item>
                    </a-divider>
                    
                    <a-form-model-item label="填写寄回物流" v-if="info.refund_type==1 && info.refund_verify==1 ">
                        <a-input style="width: 75%" placeholder="输入快递单号发货" v-model="info.delivery_no" />
                    </a-form-model-item>

                    <a-form-model-item label="拒绝原因" v-if="info.refund_verify==2">
                        {{info.refuse_remark}}
                    </a-form-model-item>

                    <!-- <a-form-model-item label="用户寄回单号" v-if="info.delivery_no !=''">
                        {{info.delivery_no}}
                    </a-form-model-item> -->

                    <a-form-model-item label="重新发货单号" v-if="info.re_delivery_no !=''">
                        {{info.re_delivery_no}}
                    </a-form-model-item>
                    
                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }"  v-if="info.refund_step==0 && info.refund_type==1 && info.refund_verify==1">
                        <div class="submit_btn" @click="handleSubmit">确定提交</div>
                    </a-form-model-item>

                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }" v-if="info.refund_step==2">
                        <div class="submit_btn" @click="handleSubmit2">完成售后</div>
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
              refund_type:0,
              order_id:0,
              delivery_no:'',
              delivery_code:'yd',
          },
          params:{},
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){
            this.$put(this.$api.homeOrderRefunds+'/'+this.info.order_id,{delivery_no:this.info.delivery_no}).then(res=>{
                this.$returnInfo(res)
                return this.get_info();
            })
        },
        handleSubmit2(){
            this.$put(this.$api.homeOrderRefunds+'/'+this.info.order_id,{refund_step:3}).then(res=>{
                this.$returnInfo(res)
                return this.get_info();
            })
        },
        get_info(){
            this.$get(this.$api.homeOrderRefunds+'/'+this.info.order_id).then(res=>{
                this.info = res.data;
            })
        }
      
    },
    created() {
        this.info.order_id= this.$route.params.id;
        this.get_info();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>