<template>
    <div class="home_seckills">

        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >砍价专区</a-breadcrumb-item>
            </a-breadcrumb>
        </div>


        <!-- 产品列表 S -->
        <div class="goods_list w1200" v-if="list.length>0">
            <ul>
                <li v-for="(v,k) in list" :key="k">
                    
                    <div class="product_act_in">
           
                        <div class="img"><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></div>
                            <div class="product_info">
                                    <div class="p_name">{{v.goods_name}}</div>
                                    <div class="label_t"><span class="price_r">售价 ¥{{v.goods_price}}</span></div>
                                    <div class="price"><div class="kan_success">已有<span class="now_price">5</span>人砍价成功</div></div>
                                    <div class="main_show">
                                            <div class="btn">去砍价</div>
                                            <div class="remind_word"><span class="ling">砍价1元得</span></div>
                                    </div>
                            </div>
                        
            
                                <!-- <dl>
                                    <dt><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></dt>
                                    <dd class="product_title" :title="v.goods_name">{{v.goods_name}}</dd>
                                     <dd class="product_subtitle">{{v.goods_subname}}</dd> 
                                    <dd class="product_store_name"><span>{{v.store_name}}</span></dd>
                                    <dd class="product_price">￥{{v.goods_price}}<span>{{v.goods_market_price}}元</span></dd>
                                    <dd class="product_buy">立即抢购</dd>
                                </dl>
                         -->
                    </div>

                </li>
            </ul>
            <div class="clear"></div>
            <div class="fy" style="margin-top:30px">
                <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
            </div>
        </div>
        <a-empty v-else style="margin-top:250px" />
        <!-- 产品列表 E -->
        <loading v-if="isLoading" ></loading>
    </div>
</template>

<script>
import Loading from '../../../components/home/public/loading.vue';
export default {
    components: {Loading},
    props: {},
    data() {
      return {
          list:[],
          params:{
               page:1,
              per_page:30,
              total:0,
              is_collective:1,
          },
          isLoading:true,
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
            this.$post(this.$api.homeGoods+'/search/all',this.params).then(res=>{
                this.params.total = res.data.total;
                this.list = res.data.data;
                this.isLoading=false;
            })
        },
        onChange(e){
            this.params.page = e;
            this.onload();
        },
        timeChange(e){
            this.params.start_time = e;
            this.page = 1;
            this.timeIndex = e;
            this.onload();
        },
    
    },
    created() {
        this.onload();
        this.timing();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.home_seckills{
    min-height: 600px;
    .goods_list{
        margin-top: 30px;
        .item {float: left;padding: 16px 40px 16px 16px;background: #FFFFFF;border-radius: 8px;margin:0 15px 20px 0;}
        .item .img {float: left;}
        .item .img img{display: block;width:214px;height: 214px;}
        .product_info {margin-left: 234px;}
        .product_info .p_name {font-size: 16px;color: #000000;line-height: 20px;width: 290px;margin-top: 12px;height: 60px;overflow: hidden;font-family: PingFangSC-Regular;}
        .product_info .label_t {margin-top:14px;}
        .product_info .label_t .price_r {font-size: 14px;color: #999999;font-family:Microsoft YaHei;}
        .product_info .label_t .label{font-size: 12px;color: #FF463C;border: 1px solid #FF463C;border-radius: 2px;display: inline-block;padding: 1px 2px;}
        .product_info .label_t .num {font-size: 14px;color: #353535;margin-left: 5px;}
        .product_info .price {font-size: 20px;margin-top: 16px;}
        .product_info .price .now_price {color: #FF4433;font-size: 20px;font-family:Microsoft YaHei;}
        .product_info .price .kan_success {font-size: 14px;}
        .product_info .price .origin_price {font-size: 12px;color: #999999;text-decoration: line-through;margin-left: 7px;font-family: "Microsoft YaHei";}

        
        ul li:hover .product_act_in{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            margin-top:-3px;
        }
    }
 
}
</style>