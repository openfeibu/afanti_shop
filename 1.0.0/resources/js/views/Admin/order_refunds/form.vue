<template>
    <div class="qingwu">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            订单详情
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <div class="order_info_list">
                <a-row>
                    <a-col :span="8">
                        订单号：<span class="content">{{info.order.order_no}}</span>
                    </a-col>
                    <a-col :span="8">
                        买家：
                        <span class="content">
                            {{info.user.username}} (用户ID：{{info.user.id}})
                        </span>
                    </a-col>
                    <a-col :span="8">
                        <span class="content">
                            <a-button @click="$router.push('/Admin/order/form/'+info.order.id)">订单详情</a-button>
                        </span>
                    </a-col>
                </a-row>
            </div>
            
            <div class="order_info_list">
                <a-row>
                    <a-col :span="8">
                        售后类型：<span class="content">{{info.refund_type_text||'-'}}</span>
                    </a-col>
                    <a-col :span="8">
                        <div v-if="info.status == 0">
                            <p>
                                商家审核：
                                <a-tag v-if="info.is_agree == 0">{{ info.is_agree_text }}</a-tag>
                                <a-tag color="blue" v-else-if="info.is_agree == 10">{{ info.is_agree_text }}</a-tag>
                                <a-tag color="orange" v-else-if="info.is_agree == 20">{{ info.is_agree_text }}</a-tag>
                            </p>
                            <template v-if="info.refund_type == 10 && info.is_agree == 10">
                                <p>
                                    用户发货：
                                    <a-tag v-if="info.is_user_send == 0">待发货</a-tag>
                                    <a-tag color="blue" v-else>已发货</a-tag>
                                </p>
                            </template>
                            <template v-if="info.refund_type == 10 && info.is_agree == 10 && info.is_user_send == 1 && info.is_receipt == 0">
                                <p>
                                    商家收货：
                                    <a-tag>待收货</a-tag>
                                </p>
                            </template>
                        </div>
                        <div v-else-if="info.status == 20">
                            <a-tag color="blue">{{ info.status_text}}</a-tag>
                        </div>
                        <div v-else-if="info.status == 10 || info.status == 30">
                            <a-tag color="orange">{{ info.status_text}}</a-tag>
                        </div>
                    </a-col>
                    <a-col :span="8">

                    </a-col>
                </a-row>
            </div>


            <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">商品信息</span></div>
            <div class="unline underm"></div>

            <div class="admin_table_list">
                <a-table :columns="columns" :data-source="order_goods" :pagination="false"  >
                    <span slot="name" slot-scope="rows">
                        <div class="admin_pic_txt">
                            <div class="img"><img v-if="rows.goods_image" :src="rows.goods_image"><a-icon v-else type="picture" /></div>
                            <div class="text">{{rows.goods_name}}</div>
                            <div class="clear"></div>
                        </div>
                    </span>
                    <span slot="goods_price" slot-scope="rows">
                        <font color="#ca151e">￥{{rows.total_pay_price}}</font>
                    </span>
                    <span slot="buy_num" slot-scope="rows">
                         {{rows.buy_num}}
                    </span>
                    <span slot="total_pay_price" slot-scope="rows">
                        <font color="#ca151e">￥{{rows.total_pay_price}}</font>
                    </span>
                </a-table>
            </div>

            <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">用户申请原因</span></div>
            <div class="unline underm"></div>
            <div class="order_info_list">
                <a-row>
                    <a-col :span="8">
                        <span class="content">{{info.apply_desc||'-'}}</span>
                    </a-col>
                    <a-col :span="8">

                    </a-col>
                    <a-col :span="8">

                    </a-col>
                </a-row>
            </div>
            <template v-if="info.is_agree == 0">
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">商家审核</span></div>
                <div class="unline underm"></div>
                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-model-item label="售后类型" >
                        {{ info.refund_type_text }}
                    </a-form-model-item>
                    <a-form-model-item label="审核状态" :rules="{ required: true}">
                        <a-radio-group :options="is_agree_options" v-model=is_agree  @change="onChangeIsAgree" />
                    </a-form-model-item>
                </a-form-model>

                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" v-show="is_agree==10">
                    <a-form-model-item label="收货人" >
                        <a-input v-model="info.return_name" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item label="收货手机号码" >
                        <a-input v-model="info.return_phone" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item label="收货地址" >
                        <a-input v-model="info.return_address" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" @click="auditSubmit">确认审核</a-button>
                    </a-form-model-item>
                </a-form-model>
                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" v-show="is_agree==20">
                    <a-form-model-item label="拒绝原因" >
                        <a-textarea :auto-size="{ minRows: 2, maxRows: 6 }" v-model="info.refuse_desc" />
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" @click="auditSubmit">确认审核</a-button>
                    </a-form-model-item>
                </a-form-model>
            </template>
            <template v-if="info.is_agree == 10">
            <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">退货地址</span></div>
            <div class="unline underm"></div>
            <div class="order_info_list">
                <a-row>
                    <a-col :span="8">
                        收货人：<span class="content">{{info.return_name||'-'}}</span>
                    </a-col>
                    <a-col :span="8">
                        收货手机号码：<span class="content">{{info.return_phone||'-'}}</span>
                    </a-col>
                    <a-col :span="8">
                        收货地址：<span class="content">{{info.return_address||'-'}}</span>
                    </a-col>
                </a-row>
            </div>
            </template>
            <template v-if="info.is_agree == 20">
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">商家拒绝原因</span></div>
                <div class="unline underm"></div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="8">
                            <span class="content">{{info.refuse_desc||'-'}}</span>
                        </a-col>
                        <a-col :span="8">

                        </a-col>
                        <a-col :span="8">

                        </a-col>
                    </a-row>
                </div>
            </template>
            <!-- 用户发货信息 -->
            <template v-if="info.refund_type==10 && info.is_agree==10 && info.is_user_send==1">
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">用户发货信息</span></div>
                <div class="unline underm"></div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="8">
                            快递公司：<span class="content">{{info.delivery_company||'-'}}</span>
                        </a-col>
                        <a-col :span="8">
                            快递单号：<span class="content">{{info.delivery_no||'-'}}</span>
                        </a-col>
                        <a-col :span="8">

                        </a-col>
                    </a-row>

                </div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="8">
                            商家收货状态：
                            <a-tag v-if="info.is_receipt == 1" color="blue">已收货</a-tag>
                            <a-tag v-if="info.is_receipt == 0">待收货</a-tag>
                        </a-col>
                        <a-col :span="8">
                            退款金额：¥{{ info.refund_money||'-'}}
                        </a-col>
                        <a-col :span="8">

                        </a-col>
                    </a-row>
                </div>
            </template>
            <!-- 确认收货并退款 -->
            <template v-if="info.refund_type==10 && info.is_agree==10 && info.is_user_send==1 && info.is_receipt==0">
                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">确认收货并退款</span></div>
                <div class="unline underm"></div>
                <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" v-show="is_agree==10">
                    <a-form-model-item label="售后类型" >
                        {{ info.refund_type_text }}
                    </a-form-model-item>
                    <a-form-model-item label="退款金额" extra="退款最大金额：">
                        <a-input-number v-model="info.refund_money" placeholder="" :max="info.refund_money"/>
                    </a-form-model-item>

                    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" @click="receiptSubmit">确认收货并退款</a-button>
                    </a-form-model-item>
                </a-form-model>
            </template>
        </div>
    </div>
</template>

<script>
import wangEditor from "@/components/wangeditor"
export default {
    components: {wangEditor},
    props: {},
    data() {
      return {
          info:{
              order:[],
              user:[],
              order_goods:[],
          },
          delivery_list:[],
          id:0,
          columns:[
            //   {title:'#',dataIndex:'id',fixed:'left'},
              {title:'商品名称',key:'id',fixed:'left',scopedSlots: { customRender: 'name' }},
              {title:'规格属性',dataIndex:'sku_name'},
              {title:'单价',key:'id',scopedSlots: { customRender: 'goods_price'} },
              {title:'购买数量',key:'id',scopedSlots: { customRender: 'buy_num'}},
              {title:'付款价',key:'id',scopedSlots: { customRender: 'total_pay_price'} },
          ],
          loading:false,
          order_goods:[],
          is_agree_options: [
              { label: '同意', value: '10' },
              { label: '拒绝', value: '20' },
          ],
          is_agree:'10',
      };
    },
    watch: {},
    computed: {},
    methods: {
        auditSubmit(){
            let api = this.$apiHandle(this.$api.adminOrderRefunds);
            this.$put(api.url+'/audit/'+this.id,{is_agree:this.is_agree,refuse_desc:this.info.refuse_desc,return_name:this.info.return_name,return_phone:this.info.return_phone,return_address:this.info.return_address}).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.get_info();
                }else{
                    return this.$message.error(res.msg)
                }
            })
        },
        receiptSubmit(){
            let api = this.$apiHandle(this.$api.adminOrderRefunds);
            this.$put(api.url+'/receipt/'+this.id,{refund_money:this.info.refund_money}).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.get_info();
                }else{
                    return this.$message.error(res.msg)
                }
            })
        },
        get_info(){
            this.$get(this.$api.adminOrderRefunds+'/'+this.id).then(res=>{
                this.info = res.data;
                this.info.refund_money = Math.min(this.info.order.total_price,this.info.order_goods.total_pay_price);
                this.order_goods = [this.info.order_goods];
            })
        },
        onChangeIsAgree(e){
            this.is_agree = e.target.value;
        },
        // 获取菜单列表
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
.admin_editor_span{
    margin-right: 10px;
    border:1px solid #efefef;
    line-height: 30px;
    padding: 4px 10px;
    border-radius: 3px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
        border-color: #ccc;
    }
    &.check{
        border-color: #ccc;
    }
}
</style>