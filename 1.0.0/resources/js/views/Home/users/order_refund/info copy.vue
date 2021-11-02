<template>
    <div class="user_user_info">
        <div class="user_main">
            <div class="block_title">
                申请售后
            </div>
            <div class="x20"></div>
                 
            <div class="admin_form">
                <div class="order_info_list ">
                    <a-row>
                        <a-col :span="24">
                            产品详情： 
                            <div class="product-info">
                                <div class="img">
                                    <img v-if="info.order_goods.goods_image" :src="info.order_goods.goods_image"><a-icon v-else type="picture" /></div>
                                <div class="text">{{info.order_goods.goods_name}}</div>
                            </div>
                        </a-col>
                        <a-col :span="24">
                            商品金额：
                            <span class="content">
                                {{info.order_goods.total_pay_price}}
                            </span>
                        </a-col>
                        <a-col :span="24">
                           申请售后状态：
                            <span class="content">
                                {{info.status_text_detail}}
                            </span>
                        </a-col>
                        <a-col :span="24">
                            售后类型：
                            <span class="content">
                                {{info.refund_type_text}}
                            </span>
                        </a-col>
                        <a-col :span="24" v-if="info.status == 20 && info.refund_type == 10" >
                            已退款金额： 
                            <span class="content">
                                {{info.refund_money}}
                            </span>
                        </a-col>
                        <a-col  :span="24">
                            售后原因：
                            <span class="content">
                                {{info.apply_desc}}
                            </span>
                        </a-col>
                        {{info}}


                    </a-row>
                </div>
                <block v-if="info.status == 10 ">
                    <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">拒绝原因</span></div>
                    <div class="unline underm"></div>
                    <div class="order_info_list">
                        <a-row>
                            <a-col :span="24">
                                <span class="content">{{info.refuse_desc||'-'}}</span>
                            </a-col>
                        
                        </a-row>
                    </div>
                </block>
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">快递信息</span></div>
                <div class="unline underm"></div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="24">
                            快递单号：<span class="content">{{info.delivery_no||'-'}}</span>
                        </a-col>
                       
                    </a-row>
                </div>
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">收货人信息</span></div>
                <div class="unline underm"></div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="24">
                            收货人：<span class="content">{{info.receive_name}}</span>
                        </a-col>
                        <a-col :span="24">
                            联系电话：<span class="content">{{info.receive_tel}}</span>
                        </a-col>
                        <a-col :span="24">
                            收货地址：<span class="content">{{info.receive_area+info.receive_address}}</span>
                        </a-col>
                         <a-col :span="24">
                            备注：<span class="content">{{info.remark||'-'}}</span>
                        </a-col>
                    </a-row>
                </div>
                 <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">付款信息</span></div>
                <div class="unline underm"></div>
                <div class="order_info_list">
                    <a-row>
                         <a-col :span="24">
                            支付方式：<span class="content">{{info.payment_name_cn||'-'}}</span>
                        </a-col>
                        <a-col :span="24">
                            支付时间：<span class="content">{{info.pay_time||'-'}}</span>
                        </a-col>
                    </a-row>
                </div>
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">商品信息</span></div>
                <div class="unline underm"></div>

           
      
                <div class="order_item_btn" v-if="info.order_status!= 20">
                    <!-- 未支付取消订单 -->
                    <div class="default_btn" v-if="info.pay_status==10" @click="cancel(info.id)">取消订单</div>
                    <!-- 已支付取消订单 -->
                    <template v-if="info.order_status!= 21">
                        <div class="default_btn" v-if="info.pay_status==20 && info.delivery_status==10" @click="cancel(info.id)">申请取消</div>
                    </template>
                    <template v-else>
                        <div class="default_btn">等待商家确认取消</div>
                    </template>
                    <div class="success_btn" v-if="info.pay_status==10" @click="pay_order(info.id)">立即支付</div>
                    <div class="error_btn" v-if="info.delivery_status ==20 && info.receipt_status == 10" @click="receipt(info.id)">确定收货</div>
                    <div class="gray_btn" v-if="info.order_status ==30 && info.is_comment==0" @click="$router.push('/user/comment/add/'+info.id)">前往评论</div>
                </div>
                

                <template v-if="info.delivery_status==20">
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">快递信息</span></div>
                <div class="unline underm"></div>

                <div class="order_info_kd">
                    <a-timeline v-if="info.delivery_list.length>0">
                        <a-timeline-item  v-for="(v,k) in info.delivery_list" :key="k" :color="k==0?'red':'gray'">
                        <p>{{info.context+' '+info.time}}</p>
                        </a-timeline-item>
                    </a-timeline>
                    <a-empty v-else><span slot="description">暂无物流信息</span></a-empty>
                </div>
                <br>
                </template>
            </div>
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
 .order_info_list{line-height: 28px;background: #f9f9f9;padding:10px 20px}
 .product-info{display: inline-block;vertical-align: middle;}
  .product-info .img{height: 50px;float: left;border-radius: 5px;}
  .product-info .img img{height: 100%;}
  .product-info .text{height: 50px;float: left;line-height: 50px;margin-left: 10px;font-size: 16px;;}
  
</style>