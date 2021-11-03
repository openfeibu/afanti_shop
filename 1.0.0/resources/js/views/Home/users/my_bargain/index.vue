<template>
    <div class="user_order">
        <div class="user_main">
            <div class="block_title">
                我的砍价
            </div>
            <div class="x20"></div>
    <!-- 产品列表 S -->
            <div class="goods_list " >
                <block v-if="list.length>0">
                    <ul class="clearfix">
                        <li v-for="(v,k) in list" :key="k">
                            
                            <div class="product_act_in">
                
                                <div class="img"><img v-lazy="v.goods.goods_master_image||''" :alt="v.goods.goods_name" /></div>
                                    <div class="product_info">
                                            <div class="p_name">{{v.goods.goods_name}}</div>
                                            <div class="label_t">售价：<span class="price_r">¥{{v.goods_price}}</span></div>
                                            <div class="remind_word"><span class="ling">砍价享¥<b>{{v.floor_price}}</b>元</span></div>
                                        
                                            <div class="main_show clearfix">
                                                    <!-- <div v-if="!v.is_partake" class="btn" @click="bargainTasks(v.bargain_id)">立即砍价</div> -->
                                                    
                                                    <div v-if="v.status == 0" class="btn" style="background:#999" >已结束</div>
                                                    <div  v-else-if="v.status == 1 && v.is_floor == 0"  class="btn" style="background:#4bb16f" ><router-link :to="'/bargain/info/'+v.id">去邀请好友砍价</router-link></div>
                                                    <div  v-else-if="v.status == 1 && v.is_floor == 1"  class="btn" ><router-link :to="'/bargain/info/'+v.id">去购买</router-link></div>
                                                    <div class="kan_success">已有<span class="now_price">{{v.cut_people}}</span>人帮你砍价</div>
                                            </div>
                                    </div>
                                
                
                            </div>

                        </li>
                    </ul>
                    <div class="clear"></div>
                    <div class="fy" style="margin-top:30px">
                        <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
                    </div>
                </block>
                <a-empty style="padding:100px 0" description="没有砍价商品" v-else />
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
              per_page:20,
              type:'all',
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
          isLoading: true
      };
    },
    watch: {},
    computed: {},
    methods: {
         onload(){
        
           this.isLoading=true;
           this.get_list();
        },
        get_list(){
            this.$get(this.$api.homeMyBargains,this.params).then(res=>{
                this.params.total = res.data.total;
                this.list = res.data.data;
                this.isLoading=false;
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

 .goods_list{
        border-radius: 10px;
        background: #fff;
        padding:20px;
        .item {float: left;padding: 16px 40px 16px 16px;background: #FFFFFF;border-radius: 8px;margin:0 15px 20px 0;}
        .item .img {float: left;}
        .item .img img{display: block;width:214px;height: 214px;}
        .product_info {margin-left: 140px;}
        .product_info .p_name {font-size: 16px;color: #000000;line-height: 20px;width: 290px;margin-top: 12px;height: 40px;overflow: hidden;font-family: PingFangSC-Regular;}
        .product_info .label_t {margin-top:5px;}
        .product_info .label_t .price_r {font-size: 18px;color: #FF463C;font-family:Microsoft YaHei;}
        .product_info .label_t .label{font-size: 12px;color: #FF463C;border: 1px solid #FF463C;border-radius: 2px;display: inline-block;padding: 1px 2px;}
        .product_info .remind_word{color: #353535;}
        .product_info .remind_word b{color: #FF463C;font-size: 18px;}
        .product_info .label_t .num {font-size: 14px;color: #353535;margin-left: 5px;}
        .product_info .price {font-size: 14px;}
        .product_info .price .now_price {color: #FF4433;font-size: 20px;font-family:Microsoft YaHei;}
        .product_info .price .kan_success {font-size: 12px;}
        .product_info .price .origin_price {font-size: 12px;color: #999999;text-decoration: line-through;margin-left: 7px;font-family: "Microsoft YaHei";}

        li{float: left;margin:10px 1%;border:1px solid #eee;
            border-radius: 5px;width:48%}

        .product_act_in{
            padding:20px;
            
            .img{
                float: left;width: 120px;height: 120px;
                img{width: 100%;height: 100%;}
            }
            .main_show{margin-top: 20px;}
            .btn{
                width: 120px;height: 40px;background: #FF463C;text-align: center;line-height: 40px;color: #fff;cursor: pointer;border-radius: 5px;float: left;
                a{color: #fff;display: block;}
                &:hover{opacity: 0.8;}
            }
            .kan_success{float: left;line-height: 40px;margin-left:10px;color:#666;font-size: 12px;
            .now_price{color: #FF463C;font-size: 16px;}}
        }
    }
        .kanjia_success{
        position: fixed;top:0;left: 0;z-index:999;background:rgba(0,0,0,0.2);width:100%;height:100%;    
        .kanjia_success_box{
        width: 450px;height: 400px;position: relative;top:20%;z-index:999;background: url(~@/asset/pc/kjcg.png) no-repeat center/100% 100%;
        margin-left: -225px;left: 50%;
        p{padding:47% 100px 0 100px;color:#333;font-size: 18px;line-height: 40px;text-align: center;}
        span{color: #fe0851;font-size: 40px;font-weight: bold;}
        
        }
        .kanjia_close{text-align: center;font-size: 20px;position: absolute;bottom: 30px;left: 50%;margin-left: -20px;width: 40px;width: 40px;line-height: 40px;border-radius: 50%;border:1px solid #666;cursor: pointer;}
    }
</style>