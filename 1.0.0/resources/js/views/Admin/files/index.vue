<template>
    <div class="afanti">
        <div class="admin_table_page_title">文章管理</div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div class="admin_table_list">
            <a-table :columns="columns" :data-source="list" :pagination="false" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" row-key="id">
                <span slot="file" slot-scope="rows">
                    <a :href="rows.url" target="_blank">{{ rows.name }}</a>
                </span>
                <span slot="action" slot-scope="rows">
                    <a-button type="danger" icon="delete" @click="del(rows.id)">删除</a-button>
                </span>
            </a-table>
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

          ],
          selectedRowKeys:[], // 被选择的行
          columns:[
              {title:'ID',fixed:'left',dataIndex:'id'},
              {title:'文件名称',fixed:'left',key:'id',scopedSlots: { customRender: 'file' }},
              {title:'存储方式',dataIndex:'disk'},
              {title:'文件大小',dataIndex:'size'},
              {title:'文件后缀',dataIndex:'extension'},
              {title:'创建时间',dataIndex:'created_at'},
              {title:'操作',key:'id',fixed:'right',scopedSlots: { customRender: 'action' }},
          ],
          list:[],
          files:[],
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
        get_files(){
            this.$get(this.$api.adminFiles,this.params).then(res=>{
                this.files = res.data;
            });
        },
        // 删除
        del(id){
            if(id<=0){
                return this.$message.error('未选择数据.');
            }
            this.$confirm({
                title: '你确定要删除选择的数据？',
                content: '确定删除后无法恢复.',
                okText: '是',
                okType: 'danger',
                cancelText: '取消',
                onOk:()=> {
                    this.$delete(this.$api.adminFiles+'/'+id).then(res=>{
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
            this.$get(this.$api.adminFiles,this.params).then(res=>{
                this.list = res.data.data;
            });
            this.get_files();
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