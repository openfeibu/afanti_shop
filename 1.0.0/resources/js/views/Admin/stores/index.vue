<template>
    <div class="afanti">
        <div class="admin_table_page_title">展馆管理</div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div class="admin_table_handle_btn">
            <a-button style="margin-right:20px" @click="$router.push('/Admin/stores/form')" type="primary" icon="plus">添加展馆</a-button>
            <a-button class="admin_delete_btn" type="danger" icon="delete" @click="del">批量删除</a-button>
        </div>
        <div class="admin_table_list">
            <a-table :columns="columns" :data-source="list" :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" row-key="id">
                <span slot="status" slot-scope="rows">
                    <a-icon type="check" style="color:blue" v-if="rows.is_store==1" />
                    <a-icon type="close" style="color:red" v-else/>
                </span>
                <span slot="name" slot-scope="rows">
                    <div class="admin_pic_txt">
                        <div class="img"><img v-if="rows.store_logo" :src="rows.store_logo"><a-icon v-else type="picture" /></div>
                        <div class="text">{{rows.store_name}}</div>
                        <div class="clear"></div>
                    </div>
                </span>
                <span slot="action" slot-scope="rows">
                    <a-button icon="read" @click="$router.push({path:'/Admin/stores/configs',query:{'id':rows.id}})">配置</a-button>
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
              store_verify:3,
          },
          total:0, //总页数
          searchConfig:[
              //{label:'展馆名称',name:'store_name',type:'text'},
          ],
          selectedRowKeys:[], // 被选择的行
          columns:[
              {title:'ID',dataIndex:'id',fixed:'left'},
              {title:'展馆名称',key:'id',fixed:'left',scopedSlots: { customRender: 'name' }},
              {title:'是否线上',key:'id',fixed:'left',scopedSlots: { customRender: 'status' }},
              {title:'创建时间',fixed:'right',dataIndex:'created_at'},
              {title:'操作',key:'id',fixed:'right',scopedSlots: { customRender: 'action' }},
          ],
          list:[],
          count:[],
      };
    },
    watch: {
        '$route'(to,from) {
            // eslint-disable-next-line no-console
            console.log(to,from)
            this.onload();
        },
        '$route' (to, from) {
            console.log(to,from)            
        }
    },
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
                    this.$delete(this.$api.adminStores+'/'+ids).then(res=>{
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
            this.$get(this.$api.adminStores,this.params).then(res=>{
                this.list = res.data.data;
                this.count = res.data.count;
                this.total = res.data.total;
            });
        },
        to_nav(e){
            this.params.store_verify = e;
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