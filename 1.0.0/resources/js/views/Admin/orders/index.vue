<template>
    <div class="afanti">
        <div class="admin_table_page_title"><a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>订单管理</div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div class="admin_table_handle_btn">
            <!-- <a-button @click="$router.push('/Admin/orders/form')" type="primary" icon="plus">添加</a-button>
            <a-button class="admin_delete_btn" type="danger" icon="delete" @click="del">批量删除</a-button> -->
        </div>
        <div class="admin_table_list">
            <a-table :columns="columns" :data-source="list" :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" row-key="id" :scroll="{ x: 1500 }">
                <span slot="name" slot-scope="rows">
                    <div class="admin_pic_txt">
                        <div class="img" style="float: none"><img v-if="rows.order_image" :src="rows.order_image"><a-icon v-else type="picture" /></div>
                        <div class="text">{{rows.order_name}}</div>
                        <div class="clear"></div>
                    </div>
                </span>
                <span slot="user" slot-scope="rows">
                     <a  @click="$router.push('/Admin/users/form/'+rows.user.id)">
                         <a-avatar :src="rows.user.avatar" />
                         {{rows.user.username}}(ID：{{rows.user.id}})
                     </a>
                </span>

                <span slot="total_price" slot-scope="rows">
                    <font color="red">￥{{rows.total_price}}</font>
                </span>
                <span slot="order_status" slot-scope="rows">
                    <a-tag color="orange">{{rows.order_status_cn}}</a-tag>
                </span>
                <span slot="action" slot-scope="rows">
                    <a-space direction="vertical">
                        <a-button icon="read" @click="$router.push('/Admin/orders/form/'+rows.id)">查看详情</a-button>
                        <a-button icon="read" v-if="rows.pay_status==20 && rows.delivery_status==10 && rows.order_status!=20 && rows.order_status!=21" @click="$router.push('/Admin/orders/form/'+rows.id+'/#delivery')">去发货</a-button>
                        <a-button icon="read" v-if="rows.order_status==21" @click="$router.push('/Admin/orders/form/'+rows.id+'/#cancel')">去审核</a-button>
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
          searchConfig:{
              "order_no":{label:'订单号',name:'order_no',type:'text'},
              'created_at':{label:'下单时间',name:'created_at',type:'date_picker'},
              'status':{label:'订单状态',name:'status',type:'select',data:[
                  {label:'全部',value:'all'},
                  {label:'待发货',value:'delivery'},
                  {label:'待收货',value:'receipt'},
                  {label:'待付款',value:'pay'},
                  {label:'已完成',value:'complete'},
                  {label:'已取消',value:'cancel'},
              ]},
              'user_id':{label:'用户ID',name:'user_id',type:'text'},
              //'store_id':{label:'展馆ID',name:'store_id',type:'select',data:[{label:'全部',value:'all'}]},
          },
          selectedRowKeys:[], // 被选择的行
          columns:[
            //   {title:'#',dataIndex:'id',fixed:'left'},
              {title:'订单名称',key:'id',fixed:'left',scopedSlots: { customRender: 'name' }, width: 280},
              {title:'订单号',dataIndex:'order_no', width: 120 },
              {title:'买家',scopedSlots: { customRender: 'user' }, width: 150},
              {title:'订单总额',key:'id',scopedSlots: { customRender: 'total_price' }, width: 100 },
              {title:'下单时间',dataIndex:'created_at', width: 150 },
              {title:'订单状态',fixed:'right',key:'id',scopedSlots: { customRender: 'order_status' }, width: 120 },
              {title:'操作',key:'id',fixed:'right',scopedSlots: { customRender: 'action' }, width: 150 },
          ],
          list:[],
          storeList:[],
      };
    },
    watch: {},
    computed: {},
    methods: {
        search(params){
            let page = this.params.page;
            let per_page = this.params.per_page;

            // 事件需要格式化，后面再看看有没有更好得到办法
            if(!this.$isEmpty(params.created_at) && !this.$isEmpty(params.created_at[0])){
                params.created_at[0] = moment(params.created_at[0]).format('YYYY-MM-DD HH:mm:ss');
                params.created_at[1] = moment(params.created_at[1]).format('YYYY-MM-DD HH:mm:ss');
            }
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
            if(!this.$isEmpty(this.$route.query.is_refund)){
                this.params.is_refund = 1;
            }
            if(!this.$isEmpty(this.$route.query.is_return)){
                this.params.is_return = 1;
            }
            this.$get(this.$api.adminOrders,this.params).then(res=>{
                this.total = res.data.total;
                this.list = res.data.data;
            });

        },
        initSearch(){
            this.$get(this.$api.adminStores).then(res=>{
                this.storeList = res.data.data;
                var store;
                Object.keys(this.storeList).forEach((key) => {
                    //console.log(this.searchConfig[key]) // foo

                    console.log({label:this.storeList[key].store_name,value:this.storeList[key].id});
                    this.searchConfig['store_id'].data.push({label:this.storeList[key].store_name,value:this.storeList[key].id});
                })

            })
        },
    },
    created() {
        this.onload();
        //this.initSearch();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>