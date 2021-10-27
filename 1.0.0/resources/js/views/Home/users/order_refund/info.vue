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
                            <div class="img">
                                <img v-if="info.order_goods.goods_image" :src="info.order_goods.goods_image"><a-icon v-else type="picture" /></div>
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
                </a-form-model>
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">退货地址</span></div>
                <div class="unline underm"></div>
                <template v-if="info.is_agree==10" >
                    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
                        <a-form-model-item label="收货人">
                            {{info.return_name}}
                        </a-form-model-item>
                        <a-form-model-item label="联系电话">
                            {{info.return_phone}}
                        </a-form-model-item>
                        <a-form-model-item label="详细地址">
                            {{info.return_address}}
                        </a-form-model-item>
                    </a-form-model>
                </template>
                <template v-if="info.refund_type == 10 && info.is_agree == 10 && info.is_user_send == 0">
                    <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">退货操作</span></div>
                    <div class="unline underm"></div>
                    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
                        <a-form-model-item label="物流公司" :rules="{ required: true}">
                            <a-select style="width: 25%" v-model="info.delivery_code">
                                <a-select-option :value="v.code" v-for="(v,k) in express" :key="k">{{v.name}}</a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="物流单号" :rules="{ required: true}">
                            <a-input placeholder="输入快递单号发货" v-model="info.delivery_no" />
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                            <a-button type="primary" @click="deliverySubmit">确定发货</a-button>
                        </a-form-model-item>
                    </a-form-model>
                </template>
                <template v-if="info.refund_type == 10 && info.is_agree == 10 && info.is_user_send == 1">
                    <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">发货信息</span></div>
                    <div class="unline underm"></div>
                    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
                        <a-form-model-item label="物流公司" >
                            {{ info.delivery_company }}
                        </a-form-model-item>
                        <a-form-model-item label="物流单号">
                            {{ info.delivery_no }}
                        </a-form-model-item>
                    </a-form-model>
                </template>
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
          express:[],
          params:{},
      };
    },
    watch: {},
    computed: {},
    methods: {
        deliverySubmit(){
            this.$put(this.$api.homeOrderRefunds+'/delivery/'+this.info.id,{delivery_code:this.info.delivery_code,delivery_no:this.info.delivery_no}).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.get_info();
                }else{
                    return this.$message.error(res.msg)
                }
            })
        },
        get_express(){
            this.$get(this.$api.homeAllExpresses).then(res=>{
                this.express = res.data;
            })
        },
        get_info(){
            this.$get(this.$api.homeOrderRefunds+'/'+this.info.id).then(res=>{
                this.info = res.data;
            })
        }
      
    },
    created() {
        this.info.id= this.$route.params.id;
        this.get_info();
        this.get_express();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>