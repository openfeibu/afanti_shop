<template>
    <div class="user_order_info">
        <div class="user_main">
            <div class="block_title">
                订单详情
            </div>
            <div class="x20"></div>

            
            <div class="admin_form">
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="12">
                            订单号：<span class="content">{{info.order_no||'-'}}</span>
                        </a-col>
                        <a-col :span="12">
                            状态：
                            <span class="content">
                                <a-tag color="red" v-if="info.order_status==20 || info.order_status==21">{{info.order_status_cn}}</a-tag>
                                <a-tag color="orange" v-if="info.order_status==10">{{info.order_status_cn}}</a-tag>
                                <a-tag color="green" v-if="info.order_status==30">{{info.order_status_cn}}</a-tag>
                            </span>
                        </a-col>
                    </a-row>
                </div>
                
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="8">
                            支付方式：<span class="content">{{info.payment_name_cn||'-'}}</span>
                        </a-col>
                        <a-col :span="8">
                            支付时间：<span class="content">{{info.pay_time||'-'}}</span>
                        </a-col>
                        <a-col :span="8">
                            快递单号：<span class="content">{{info.delivery_no||'-'}}</span>
                        </a-col>
                    </a-row>
                </div>
                <div class="order_info_list">
                    <a-row>
                        <a-col :span="24">
                            备注：<span class="content">{{info.remark||'-'}}</span>
                        </a-col>
                    </a-row>
                </div>

                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">收货人信息</span></div>
                <div class="unline underm"></div>

                <div class="order_info_list">
                    <a-row>
                        <a-col :span="8">
                            收货人：<span class="content">{{info.receive_name}}</span>
                        </a-col>
                        <a-col :span="8">
                            联系电话：<span class="content">{{info.receive_tel}}</span>
                        </a-col>
                        <a-col :span="8">
                            取货地址：<span class="content">{{info.receive_area+info.receive_address}}</span>
                        </a-col>
                    </a-row>
                </div>

                <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">商品信息</span></div>
                <div class="unline underm"></div>

                <div class="admin_table_list">
                    <a-table :columns="columns" :data-source="info.order_goods" :pagination="false"  >
                        <span slot="name" slot-scope="rows">
                            <div class="admin_pic_txt">
                                <div class="img"><img v-if="rows.goods_image" :src="rows.goods_image"><a-icon v-else type="picture" /></div>
                                <div class="text" style="max-width:475px;line-height:20px">{{rows.goods_name}}</div>
                                <div class="clear"></div>
                            </div>
                        </span>
                        <span slot="buy_num" slot-scope="rows">
                            x {{rows.buy_num}}
                        </span>
                        <span slot="goods_price" slot-scope="rows">
                            <font color="#ca151e">￥{{rows.goods_price}}</font>
                        </span>
                        <span slot="actions" slot-scope="rows">
                             <div class="m-top20 dis-flex flex-x-end">
                                 <span v-if="rows.order_refund" >已申请售后</span>
                                 <a-button type="danger" size="small"  v-else-if="info.isAllowRefund" @click="$router.push('/user/order_refund/form/'+rows.id)">
                                     申请售后
                                 </a-button>
                             </div>
                        </span>

                    </a-table>
                </div>

                <div class="order_info_right_price">总计：￥ {{info.total_price}}<span data-v-01d38243="">（运费：{{info.freight_money}}）</span></div>

                <div class="order_item_btn" v-if="info.order_status!= 20">
                    <!-- 未支付取消订单 -->
                    <div class="default_btn" v-if="info.pay_status==10" @click="cancel(info.id)">取消订单</div>
                    <!-- 已支付取消订单 -->
                    <template v-if="info.order_status!= 21">
                        <div class="default_btn" v-if="info.pay_status==20 && info.delivery_status==10" @click="cancel(info.id)">申请取消</div>
                    </template>
                    <template v-else>
                        <div class="default_btn">取消申请中</div>
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
            
            
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          id:0,
          info:{},
          columns:[
            //   {title:'#',dataIndex:'id',fixed:'left'},
              {title:'商品名称',key:'id',fixed:'left',scopedSlots: { customRender: 'name' }},
              {title:'规格属性',dataIndex:'sku_name'},
              {title:'购买数量',key:'id',scopedSlots: { customRender: 'buy_num'}},
              {title:'商品价格',key:'id',scopedSlots: { customRender: 'goods_price'} },
              {title:'操作',key:'id',scopedSlots: { customRender: 'actions'} },
          ],
          list:[],
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_info(){
            this.$get(this.$api.homeOrder+'/get_order_info/'+this.id).then(res=>{
                this.info = res.data;
            })
        },
        // 获取菜单列表
        onload(){

            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }

        },
        pay_order(order_id){
            let str = window.btoa(JSON.stringify({order_id:[order_id]}));
            this.$router.push("/order/order_pay/"+str);
        },
        cancel(id){
            this.$put(this.$api.homeOrder+'/'+'cancel',{id:id}).then(res=>{
                this.onload();
                return this.$returnInfo(res)
            })
        },
        receipt(id){
            this.$put(this.$api.homeOrder+'/'+'receipt',{id:id}).then(res=>{
                this.onload();
                return this.$returnInfo(res)
            })
        },
        apply_refund(order_goods_id){
            this.$put(this.$api.homeRefunds+'/'+'apply',{order_goods_id:order_goods_id}).then(res=>{
                this.onload();
                return this.$returnInfo(res)
            })
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