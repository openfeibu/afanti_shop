<template>
    <div class="user_order">
        <div class="user_main">
            <div class="block_title">
                我的订单
            </div>
            <div class="x20"></div>


            <div class="safe_block" >
              <div class="order_list" v-if="list.length>0">
                <div class="order_item" v-for="(v,k) in list" :key="k">
                    <div class="order_item_title">
                        <span><font :color="v.order_status==6?'#42b983':'#ca151e'">{{v.status_text_detail||'-'}}</font></span>
                        {{v.created_at}}
                    </div>
                    <div class="order_item_list"  @click="$router.push('/user/order_refund/'+v.id)">
                        <ul>
                            <li><router-link to="">
                                <div class="order_thumb"><img :src="v.order_goods.goods_image||require('@/asset/order/default.png')" :alt="v.order_goods.goods_name"></div>
                                <div class="order_list_title">{{v.order_goods.goods_name||'-'}}</div>
                                <div class="order_list_attr">{{v.order_goods.sku_name||'-'}}</div>
                                <div class="order_list_num">x {{v.order_goods.buy_num||'1'}}</div>
                                <div class="order_list_price" style="width: 160px;">实付金额：￥{{v.order_goods.total_pay_price||'0.00'}}</div>
                            </router-link></li>
                        </ul>
                    </div>
                    <div class="order_item_btn" v-if="v.order_status!= 20">
                        <div class="default_btn" @click="$router.push('/user/order_refund/'+v.id)">查看详情</div>
                    </div>
                </div>
                <div class="fy" v-if="total>0">
                    <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
                </div>
            </div>
            <div style="min-height:600px;padding-top:100px" v-else>
                <a-empty />
            </div>
            </div>
        </div>
        <loading v-if="isLoading"></loading>
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
              per_page:20,
              type:'all',
              isLoading:true,
          },
          total:0, //总页数
          list:[],
          searchConfig:[
              {label:'订单号',name:'order_no',type:'text'},
              {label:'订单状态',name:'order_status',type:'select',data:[
                  {label:'全部订单',value:''},
                  {label:'订单取消',value:0},
                  {label:'等待支付',value:1},
                  {label:'等待发货',value:2},
                  {label:'确认收货',value:3},
                  {label:'等待评论',value:4},
                  {label:'售后订单',value:5},
                  {label:'订单完成',value:6},
              ]},
          ],
          order_info:{
              delivery_list:[],
          },
          visible:false,
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
            this.onload();
        },
        onload(){
           this.isLoading = true;
            if(!this.$isEmpty(this.$route.params.type)){
                this.params.type = this.$route.params.type;
            }
            this.$get(this.$api.homeOrderRefunds,this.params).then(res=>{
                this.list = res.data.data;
                this.total = res.data.total;
                this.isLoading = false;
            })
        },

    },
    created() {
        this.onload()
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.order_item_btn{
    text-align: right;
    margin-top: 20px;
}
.order_item_title{
    background: #f6f6f6;
    line-height: 40px;
    padding: 0 15px;
    margin: 20px 0;
    span{
        float: right;
        font-size: 12px;
        font{
            margin-left:15px;
        }
    }
}
.order_status_block{
    background: #fff;
    padding: 20px;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
    ul{
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        li{
            position: relative;
            &:first-child i{
                font-weight: bold;
                font-size: 26px;
            }
            &:nth-child(1) i{
                top:-2px;
            }
            &:nth-child(2) i{
                left :36px;
            }
             &:nth-child(3) i{
                 left :40px;
                 top:-2px;
            }
             &:nth-child(4) i{
                top:1px;
                left :40px;
            }
            float: left;
            text-align: center;
            width: 180px;
            i{
                position: absolute;
                font-size: 22px;
                margin-right: 4px;
                left :34px;
            }
        
        }
    }
}
.order_item_list{
    ul li{
        padding:20px 15px;
        border-top: 1px solid #efefef;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        &:last-child{
            border-bottom: 1px solid #efefef;
        }
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        .order_thumb{
            width: 42px;
            height: 42px;
            background: #efefef;
            border:1px solid #efefef;
            box-sizing: border-box;
            float: left;
            margin-right: 15px;
            img{
                width: 40px;
                height: 40px;
            }
        }
        .order_list_title{
            width: 280px;
            float: left;
            font-size: 12px;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
        }

        .order_list_attr{
            float: left;
            text-align: center;
            width: 190px;
            line-height: 40px;
        }
        .order_list_num{
            float: left;
            text-align: center;
            width: 140px;
            line-height: 40px;
        }
        .order_list_price{
            float: right;
            color:#ca151e;
            text-align: center;
            width: 90px;
            line-height: 40px;
            // font-weight: bold;
        }
    }
}

</style>