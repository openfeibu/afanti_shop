<template>
    <div class="favorite">
        <div class="user_main">
            <div class="block_title">
                我的消息
            </div>
            <div class="x20"></div>
            <div class="admin_table_list" >
                <a-table :columns="columns" :data-source="list" :pagination="false"  row-key="id">
                    <template slot="content"  slot-scope="rows">
                        <div>
                            <a-badge :dot="!rows.is_read">
                                {{ rows.content }}
                            </a-badge>
                        </div>
                    </template>

                </a-table>
                <div class="fy" style="margin-top:20px;" v-if="total>0">
                    <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
                </div>
            </div>

        </div>
        <loading v-if="isLoading" />
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
          },
          total:0, //总页数
          columns:[
              {title:'内容',key:'id',scopedSlots: { customRender: 'content' }},
              {title:'时间',dataIndex:'created_at'},
          ],
          list:[],
          isLoading:true,
      };
    },
    watch: {},
    computed: {},
    methods: {
        // 选择分页
        onChange(e){
            this.params.page = e;
            this.onload();
        },
        onload(){
            this.$get(this.$api.homeUser+'/messages',this.params).then(res=>{
                this.total = res.data.total;
                this.list = res.data.data;
                this.isLoading = false
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