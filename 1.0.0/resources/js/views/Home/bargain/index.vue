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
            <ul class="clearfix">
                <li v-for="(v,k) in list" :key="k">
                    
                    <div class="product_act_in">
           
                        <div class="img"><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></div>
                            <div class="product_info">
                                    <div class="p_name">{{v.goods_name}}</div>
                                    <div class="label_t">售价：<span class="price_r">¥{{v.goods_price}}</span></div>
                                    <div class="remind_word"><span class="ling">砍价享¥<b>{{v.floor_price}}</b>元</span></div>
                                   
                                    <div class="main_show clearfix">
                                            <div v-if="!v.is_partake" class="btn" @click="bargainTasks(v.bargain_id)">立即砍价</div>
                                            <div v-else class="btn" style="background:#4bb16f" @click="bargainTasks(v.bargain_id)">去邀请砍价</div>
                                            <div class="kan_success">已有<span class="now_price">{{v.active_sales}}</span>人砍价成功</div>
                                    </div>
                            </div>
                        
        
                    </div>

                </li>
                 <li v-for="(v,k) in list" :key="k">
                    
                    <div class="product_act_in clearfix">
           
                        <div class="img"><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></div>
                            <div class="product_info">
                                    <div class="p_name">{{v.goods_name}}</div>
                                    <div class="label_t">售价：<span class="price_r">¥{{v.goods_price}}</span></div>
                                    <div class="remind_word"><span class="ling">砍价享¥<b>{{v.floor_price}}</b>元</span></div>
                                   
                                    <div class="main_show clearfix">
                                            <div class="btn">立即砍价</div>
                                             <div class="kan_success">已有<span class="now_price">{{v.active_sales}}</span>人砍价成功</div>
                                    </div>
                            </div>
                        
        
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
            this.$get(this.$api.homeBargains,this.params).then(res=>{
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
        bargainTasks(id){
            console.log(id)
            this.isLoading=true;
            this.$post(this.$api.bargainTasks,{'bargain_id':id}).then(res=>{
                if(res.code == 200){
                    //bargain_task_id
                    var bargain_task_id  = res.data.bargain_task_id;
                    //参加砍价成功进入详情页
                }
                
                this.isLoading=false;
            })
        }
    },
    created() {
        this.onload();
   
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

        li{float: left;margin:20px 1%;border:1px solid #eee;
            border-radius: 5px;width:48%}

        .product_act_in{
            padding:20px;
           
            
            .img{
                float: left;width: 200px;height: 200px;
                img{width: 100%;height: 100%;}
            }
            .main_show{margin-top: 30px;}
            .btn{
                width: 120px;height: 40px;background: #FF463C;text-align: center;line-height: 40px;color: #fff;cursor: pointer;border-radius: 5px;float: left;
                &:hover{opacity: 0.8;}
            }
            .kan_success{float: left;line-height: 40px;margin-left:10px;color:#666;font-size: 12px;
            .now_price{color: #FF463C;font-size: 16px;}}
        }
    }
 
}
</style>