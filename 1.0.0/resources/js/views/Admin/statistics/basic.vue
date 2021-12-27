<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            数据概览
        </div>
        <div class="unline underm"></div>

        <admin-search :searchConfig="searchConfig" @searchParams="search"></admin-search>

        <div>
            <a-row>
                <a-col :span="8">
                    <div >
                        <a-statistic title="用户数量" :value="basic_data.user_count" style="margin-right: 50px" >
                            <template #prefix>
                                <a-icon type="user" />
                            </template>
                        </a-statistic>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div >
                        <a-statistic title="付款订单数" :value="basic_data.pay_order_count" style="margin-right: 50px" >
                            <template #prefix>
                                <a-icon type="account-book" />
                            </template>
                        </a-statistic>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div >
                        <a-statistic title="商品数量" :value="basic_data.goods_count" style="margin-right: 50px" >
                            <template #prefix>
                                <a-icon type="shopping" />
                            </template>
                        </a-statistic>
                    </div>
                </a-col>
            </a-row>
            <a-row style="margin-top: 20px;">
                <a-col :span="8">
                    <div >
                        <a-statistic title="消费人数" :value="basic_data.pay_user_count" style="margin-right: 50px" >
                            <template #prefix>
                                <a-icon type="user" />
                            </template>
                        </a-statistic>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div >
                        <a-statistic title="付款订单总额" :value="basic_data.pay_order_price" style="margin-right: 50px">
                            <template #prefix>
                                <a-icon type="transaction" />
                            </template>
                        </a-statistic>
                    </div>
                </a-col>
                <a-col :span="8">

                </a-col>

            </a-row>
        </div>


    </div>
</template>

<script>
import adminSearch from '@/components/admin/search'
import { Line } from 'g2plot';
export default {
    components: {adminSearch,},
    props: {},
    data() {
      return {
          params:{

          },
          searchConfig:[
              {label:'时间查询',name:'created_at',type:'date_picker'},
          ],
          basic_data:[],

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
        search(params){

            // 事件需要格式化，后面再看看有没有更好得到办法
            if(!this.$isEmpty(params.created_at) && !this.$isEmpty(params.created_at[0])){
                params.created_at[0] = moment(params.created_at[0]).format('YYYY-MM-DD HH:mm:ss');
                params.created_at[1] = moment(params.created_at[1]).format('YYYY-MM-DD HH:mm:ss');
            }
            this.params = params;
            this.onload();
        },
        get_info(){
            this.$get(this.$api.adminStatistics+'/basic',this.params).then(res=>{
                this.basic_data = res.data;
            })
        },
        // 获取列表
        onload(){
            this.get_info();
            
        },
        
    },
    created() {},
    mounted() {
        this.onload();
    }
};
</script>
<style lang="scss" scoped>

</style>