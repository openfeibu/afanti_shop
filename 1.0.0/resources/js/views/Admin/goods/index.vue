<template>
    <div class="afanti">
        <div class="admin_table_page_title">商品管理</div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div class="admin_table_handle_btn">
            <a-button style="margin-right:20px" @click="$router.push('/Admin/goods/form')" type="primary" icon="plus">添加商品</a-button>
            <a-button class="admin_delete_btn" type="danger" icon="delete" @click="del">批量删除</a-button>
        </div>
        <div class="admin_table_list">
            <a-table :columns="columns" :data-source="list" :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" row-key="id">
                <span slot="name" slot-scope="rows">
                    <div class="admin_goods_pic_txt">
                        <div class="img"><img v-if="rows.goods_master_image" :src="rows.goods_master_image"><a-icon v-else type="picture" /></div>
                        <div class="block">
                            <div class="text" :title="rows.goods_name">{{rows.goods_name}}</div>
                            <!-- <div class="tag">标签：
                                <a-tag color="orange">推荐</a-tag>
                                <a-tag color="red">HOT</a-tag>
                                <a-tag color="green">团购</a-tag>
                                <a-tag color="cyan">秒杀</a-tag>
                                <a-tag color="purple">劵</a-tag>
                            </div> -->
                        </div>
                        
                        <div class="clear"></div>
                    </div>
                </span>
                <span slot="goods_status" slot-scope="rows">
                    <a-icon type="check" style="color:blue" v-if="rows.goods_status==1" />
                    <a-icon type="close" style="color:red" v-else/>
                </span>
                <span slot="action" slot-scope="rows">
                    <a-space direction="vertical">
                        <a-button icon="read" @click="$router.push('/goods/'+rows.id)">前往</a-button>
                        <a-button icon="edit" @click="$router.push('/Admin/goods/form/'+rows.id)">编辑</a-button>
                        <a-button icon="edit" @click="$router.push({path:'/Admin/goods/form/'+rows.id,query: { copy: 1 }})">复制</a-button>
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
    components: {adminSearch,},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
          },
          total:0, //总页数
          searchConfig:[
              {label:'商品名称',name:'goods_name',type:'text'},
            //   {label:'商品编号',name:'goods_no',type:'text'},
              {label:'上架状态',name:'goods_status',type:'select',data:[{label:'全部',value:''},{label:'上架',value:1},{label:'下架',value:0}]},
          ],
          selectedRowKeys:[], // 被选择的行
          columns:[
              {title:'ID',dataIndex:'id'},
              {title:'商品名称',key:'id',scopedSlots: { customRender: 'name' }},
              {title:'商品编号',dataIndex: 'goods_no'},
              {title:'上架状态',key:'id',scopedSlots: { customRender: 'goods_status' }},
              {title:'品牌',dataIndex:'brand_name'},
              {title:'价格',dataIndex:'goods_price'},
              {title:'库存',dataIndex:'goods_stock'},
              {title:'销量',dataIndex:'goods_sale'},
              {title:'修改时间',dataIndex:'updated_at'},
              {title:'操作',key:'id',scopedSlots: { customRender: 'action' }},
          ],
          list:[],
          categoryList:[],
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
                    this.$delete(this.$api.adminGoods+'/'+ids).then(res=>{
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
            this.$get(this.$api.adminGoods,this.params).then(res=>{
                this.list = res.data.data;
                this.total = res.data.total;
            });
            this.$get(this.$api.adminGoodsClasses,{}).then(res=>{
                this.categoryList = res.data;
            });

        },
        onChange(e){
            this.params.page = e;
            this.onload();
        },
        to_nav(e){
            this.params.page = 1;
            this.onload();
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