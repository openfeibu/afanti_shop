<template>
    <div class="afanti">
        <div class="admin_table_page_title"><a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>售后管理</div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div class="admin_table_list">
            <a-table :columns="columns" :data-source="list" :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" row-key="id" :scroll="{ x: 1300 }">
                <span slot="order_goods" slot-scope="rows">
                    <div class="admin_pic_txt">
                        <div class="img"><img v-if="rows.order_goods.goods_image" :src="rows.order_goods.goods_image"><a-icon v-else type="picture" /></div>
                        <div class="text">{{rows.order_goods.goods_name}}</div>
                        <div class="clear"></div>
                    </div>
                </span>
                <span slot="user" slot-scope="rows">
                     <a  @click="$router.push('/Admin/users/form/'+rows.user.id)">
                         <a-avatar :src="rows.user.avatar" />
                        {{rows.user.username}}(ID：{{rows.user.id}})
                     </a>
                </span>
                <span slot="buy_num" slot-scope="rows">
                     {{rows.order_goods.buy_num}}
                </span>
                <span slot="goods_price" slot-scope="rows">
                    <font color="red">￥{{rows.order_goods.goods_price}}</font>
                </span>
                <span slot="refund_type" slot-scope="rows">
                     <a-tag color="blue">{{rows.refund_type_text}}</a-tag>
                </span>

                <span slot="status" slot-scope="rows">
                    <div v-if="rows.status == 0">
                        <p>
                            商家审核：
                            <a-tag v-if="rows.is_agree == 0">{{ rows.is_agree_text }}</a-tag>
                            <a-tag color="blue" v-else-if="rows.is_agree == 10">{{ rows.is_agree_text }}</a-tag>
                            <a-tag color="orange" v-else-if="rows.is_agree == 20">{{ rows.is_agree_text }}</a-tag>
                        </p>
                        <template v-if="rows.refund_type == 10 && rows.is_agree == 10">
                            <p>
                                用户发货：
                                <a-tag v-if="rows.is_user_send == 0">待发货</a-tag>
                                <a-tag color="blue" v-else>已发货</a-tag>
                            </p>
                        </template>
                        <template v-if="rows.refund_type == 10 && rows.is_agree == 10 && rows.is_user_send == 1 && rows.is_receipt == 0">
                            <p>
                                商家收货：
                                <a-tag>待收货</a-tag>
                            </p>
                        </template>
                    </div>
                    <div v-else-if="rows.status == 20">
                        <a-tag color="blue">{{ rows.status_text}}</a-tag>
                    </div>
                    <div v-else-if="rows.status == 10 || rows.status == 30">
                        <a-tag color="orange">{{ rows.status_text}}</a-tag>
                    </div>
                </span>

                <span slot="action" slot-scope="rows">
                    <a-space direction="vertical">
                        <a-button @click="$router.push('/Admin/order_refunds/form/'+rows.id)">查看详情</a-button>
                        <a-button type="primary" v-if="rows.is_agree==0" @click="$router.push('/Admin/order_refunds/form/'+rows.id+'/#delivery')">去审核</a-button>
                        <a-button type="danger" v-if="rows.refund_type == 10 && rows.is_agree==10 && rows.is_user_send==1&&rows.is_receipt==0" @click="$router.push('/Admin/order_refunds/form/'+rows.id+'/#cancel')">确认收货</a-button>
                    </a-space>


                </span>
            </a-table>
            <div class="admin_pagination" v-if="total>0">
                <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
            </div>
        </div>
    </div>
</template>

<script>
import adminSearch from '@/components/admin/search'
export default {
    components: {adminSearch},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
          },
          total:0, //总页数
          selectedRowKeys:[], // 被选择的行
          searchConfig:{
              "order_no":{label:'订单号',name:'order_no',type:'text'},
              'created_at':{label:'申请时间',name:'created_at',type:'date_picker'},
              'user_id':{label:'用户ID',name:'user_id',type:'text'},
          },
          columns:[
            //   {title:'#',dataIndex:'id',fixed:'left'},
              {title:'商品',key:'id',fixed:'left',scopedSlots: { customRender: 'order_goods' }, width: 280},
              {title:'订单号',dataIndex:'order_no', width: 120 },
              {title:'数量',scopedSlots: { customRender: 'buy_num' }, width: 80},
              {title:'买家',scopedSlots: { customRender: 'user' }, width: 150},
              {title:'付款价',key:'id',scopedSlots: { customRender: 'goods_price' }, width: 100},
              {title:'售后类型',key:'id',scopedSlots: { customRender: 'refund_type' }, width: 100},
              {title:'处理状态',key:'id',scopedSlots: { customRender: 'status' }, width: 180},
              {title:'申请时间',dataIndex:'created_at'},
              {title:'操作',key:'id',fixed:'right',scopedSlots: { customRender: 'action' }},
          ],
          list:[],
      };
    },
    watch: {},
    computed: {},
    methods: {
        search(params){
            let page = this.params.page;
            let per_page = this.params.per_page;

            this.params = params;
            this.params.page = page;
            this.params.per_page = per_page;
            this.onload();
        },
        // 选择框被点击
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        // 选择分页
        onChange(e){
            this.params.page = e;
            this.onload();
        },
        // 删除
        del(){
            if(this.selectedRowKeys.length==0){
                return this.$message.error('未选择数据.');
            }
            this.$confirm({
                title: '你确定要删除选择的数据？',
                content: '确定删除后无法恢复.',
                okText: '是',
                okType: 'danger',
                cancelText: '取消',
                onOk:()=> {
                    let ids = this.selectedRowKeys.join(',');
                    this.$delete(this.$api.adminOrders+'/'+ids).then(res=>{
                        if(res.code == 200){
                            this.onload();
                            this.$message.success('删除成功');
                        }else{
                            this.$message.error(res.msg)
                        }
                    });
                    
                },
            });
        },
 
        onload(){
            this.$get(this.$api.adminOrderRefunds,this.params).then(res=>{
                this.total = res.data.total;
                this.list = res.data.data;
            });
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