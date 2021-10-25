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
                        订单号：<span class="content">{{info.order_no}}</span>
                    </a-col>
                    <a-col :span="8">
                        状态：
                        <span class="content">
                            <a-tag color="red" v-if="info.order_status==0">{{info.order_status_cn}}</a-tag>
                            <a-tag color="orange" v-if="info.order_status==1">{{info.order_status_cn}}</a-tag>
                            <a-tag color="blue" v-if="info.order_status>1&&info.order_status<6">{{info.order_status_cn}}</a-tag>
                            <a-tag color="cyan" v-if="info.order_status==6">{{info.order_status_cn}}</a-tag>
                            <a-tag color="green" v-if="info.order_status>=7">{{info.order_status_cn}}</a-tag>
                        </span>
                    </a-col>
                    <a-col :span="8">

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

            <div style="margin-top:40px"><span style="font-size: 14px;font-weight: bold;">物流地址</span></div>
            <div class="unline underm"></div>

            <div class="order_info_list">
                <a-row>
                    <a-col :span="8">
                        用户：<span class="content">{{info.receive_name}}</span>
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
                            <div class="text">{{rows.goods_name}}</div>
                            <div class="clear"></div>
                        </div>
                    </span>
                    <span slot="buy_num" slot-scope="rows">
                        x {{rows.buy_num}}
                    </span>
                    <span slot="goods_price" slot-scope="rows">
                        <font color="#ca151e">￥{{rows.goods_price}}</font>
                    </span>
                </a-table>
            </div>


            <div class="order_info_right_price">总计：￥ {{info.total_price}}<span data-v-01d38243="">（运费：{{info.freight_money}}）</span></div>

            <div style="margin-top:40px" id="delivery"><span style="font-size: 14px;font-weight: bold;">快递信息</span></div>
            <div class="unline underm"></div>
            <template v-if="info.pay_status==20 && info.order_status!=20 && info.order_status!=21">
                <template v-if="info.delivery_status==10">
                    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-form-model-item label="物流公司" :rules="{ required: true}">
                            <a-select style="width: 25%" v-model="info.delivery_code">
                                <a-select-option :value="v.code" v-for="(v,k) in express" :key="k">{{v.name}}</a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="物流单号" :rules="{ required: true}">
                            <a-input placeholder="输入快递单号发货" v-model="info.delivery_no" />
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                            <a-button type="primary" @click="deliverySubmit">提交</a-button>
                        </a-form-model-item>
                    </a-form-model>

                </template>
                <template v-else>
                    <div class="order_info_list">
                        <a-row>
                            <a-col :span="6">
                                物流公司：<span class="content">{{info.delivery_company}}</span>

                            </a-col>
                            <a-col :span="6">
                                快递单号：<span class="content">{{info.delivery_no}}</span>
                            </a-col>
                            <a-col :span="6">
                                发货时间：<span class="content">{{info.delivery_time}}</span>
                            </a-col>
                            <a-col :span="6">
                                <a-button type="primary" size="small" @click="edit_express()"><a-icon type="edit"  />修改</a-button>
                            </a-col>
                        </a-row>
                    </div>

                </template>
            </template>
            <div class="order_info_kd">
                <a-timeline v-if="delivery_list.length>0">
                    <a-timeline-item  v-for="(v,k) in delivery_list" :key="k" :color="k==0?'red':'gray'">
                        <p>{{v.context+' '+v.time}}</p>
                    </a-timeline-item>
                </a-timeline>
                <a-empty v-else><span slot="description">暂无物流信息</span></a-empty>
            </div>
            <br>
            <!-- <a-button type="primary" @click="handleSubmit">提交</a-button> -->
        </div>
        <!-- 修改物流 -->
        <a-modal v-model="visible" title="编辑物流" ok-text="确认" cancel-text="取消" @ok="deliverySubmit">
            <a-input-group compact>
                <a-select style="width: 25%" v-model="info.delivery_code">
                    <a-select-option :value="v.code" v-for="(v,k) in express" :key="k">{{v.name}}</a-select-option>
                </a-select>
                <a-input style="width: 75%" placeholder="输入快递单号发货" v-model="info.delivery_no" />
            </a-input-group>
        </a-modal>
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
          },
          delivery_list:[],
          id:0,
          express:[],
          columns:[
            //   {title:'#',dataIndex:'id',fixed:'left'},
              {title:'商品名称',key:'id',fixed:'left',scopedSlots: { customRender: 'name' }},
              {title:'规格属性',dataIndex:'sku_name'},
              {title:'购买数量',key:'id',scopedSlots: { customRender: 'buy_num'}},
              {title:'商品价格',key:'id',scopedSlots: { customRender: 'goods_price'} },
          ],
          loading:false,
          visible:false,
      };
    },
    watch: {},
    computed: {},
    methods: {
        deliverySubmit(){
            let api = this.$apiHandle(this.$api.adminOrders);
            this.$put(api.url+'/delivery/'+this.id,{delivery_code:this.info.delivery_code,delivery_no:this.info.delivery_no}).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.get_info();
                    this.visible = false;
                }else{
                    return this.$message.error(res.msg)
                }
            })
        },
        handleSubmit(){

            // 验证代码处
            // if(this.$isEmpty(this.info.name)){
            //     return this.$message.error('分类名不能为空');
            // }
            let api = this.$apiHandle(this.$api.adminOrders,this.id);
            if(api.status){
                this.$put(api.url,this.info).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        return this.$router.back();
                    }else{
                        return this.$message.error(res.msg)
                    }
                })
            }else{
                this.$post(api.url,this.info).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        return this.$router.back();
                    }else{
                        return this.$message.error(res.msg)
                    }
                })
            }
   
            
        },
        get_info(){
            this.$get(this.$api.adminOrders+'/'+this.id).then(res=>{
                this.info = res.data;
                if(res.data.delivery_no != ''){
                    this.get_delivery();
                }
            })
        },
        edit_express(e){
            this.visible = true;
            this.get_express();
        },
        get_express(){
            this.$get(this.$api.adminAllExpresses).then(res=>{
                this.express = res.data;
            })
        },
        // 获取物流信息
        get_delivery(){
            this.$get(this.$api.adminOrders+'/delivery_info/'+this.id).then(res=>{
                this.delivery_list = res.data;
            })
        },
        // 获取菜单列表
        onload(){

            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
            this.get_express();

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