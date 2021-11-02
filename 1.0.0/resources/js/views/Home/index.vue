<template>
    <div class="home">
        <div class="shop_head3"><shop-head :subnav_show="subnav_show" /></div>
        <banner :list="list.banner" />
        <banner-bottom-adv :index_adv="list.banner_bottom_adv" />

        

        <!-- 分类商品列表 -->
        <div class="index_bg">
        <div class="index_bg_box">
            <!-- 秒杀 -->
            <div class="seckill width_center_1200" v-if="seckill_list.length>0">
                <!-- <div class="seckill_title">商城秒杀<span><router-link to="/seckill">查看更多</router-link></span> </div> -->
                <div class="seckill_left">
                    <div class="seckill_end_time">
                        限时秒杀
                        <p class="seckill_icon"><a-font type="iconziyuan"></a-font></p>
                        <p class="font_skill"><span>{{seckills}}</span> 场 距结束</p>
                        <ul>
                            <li>{{timeFormat[0]||'00'}}</li>
                            <li>{{timeFormat[1]||'00'}}</li>
                            <li>{{timeFormat[2]||'00'}}</li>
                        </ul>
                        <div class="more"><router-link to="/seckill" class="transition500">查看更多</router-link></div> 
                    </div>
                </div>
                <div class="seckill_right">
                        <ul>
                            <li v-for="(v,k) in seckill_list" :key="k" @click="toGoods(v.id)">
                                <dl>
                                    <dt><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></dt>
                                    <dd class="product_title" :title="v.goods_name">{{v.goods_name}}</dd>
                                    <!-- <dd class="product_subtitle">{{v.goods_subname}}</dd> -->
                                    <dd class="product_store_name"><span>{{v.store_name}}</span></dd>
                                    <dd class="product_price">￥{{v.goods_price}}<span v-if="v.goods_market_price != '0.00'">{{v.goods_market_price}}元</span></dd>
                                    <dd class="product_buy">立即抢购</dd>
                                </dl>
                            </li>
                            
                        </ul>
                </div>
            </div>

            <div class="goods_class_list w1200" v-for="(v,k) in list.goods" :key="k">
                <!-- <shop-index-adv v-if="v.goods.length>0" :adv="(list.class_top_adv[k] && list.class_top_adv[k].image_url)?list.class_left_adv[k]:{adv_image:require('@/asset/pc/adv.jpg'),adv_link:'',adv_title:'加载中...'}" /> -->
                <div >
                    <!-- <div class="adv_width_1200"><img v-lazy="v.image_url" :alt="v.name"></div>   -->
                    <div class="title">{{v.name||'加载中...'}}<span><router-link to="/s/eyJrZXl3b3JkcyI6IiJ9">查看更多</router-link></span></div>
                    <!-- <div class="index_adv_goods_left"><img v-lazy="(list.class_left_adv[k] && list.class_left_adv[k].image_url)?list.class_left_adv[k].image_url:require('@/asset/pc/pc_class_btadv.jpg')" :alt="v.name"></div> -->
                    <div class="index_class_goods_right">
                        <ul>
                             <li class="index_adv_goods_left"><img v-lazy="v.thumb" :alt="v.name"></li>

                            <li v-for="(vo,key) in v.goods" :key="key" @click="toGoods(vo.id)">
                                <div class="product_act_in">
                                    <dl>
                                        <dt><img v-lazy="vo.goods_master_image||''" :alt="vo.goods_name" /></dt>
                                        <dd class="product_title" :title="vo.goods_name">{{vo.goods_name}}</dd>
                                        <dd class="product_subtitle">{{vo.goods_subname || '-'}}</dd>
                                        <dd class="product_store_name"><span>{{vo.store_name}}</span></dd>
                                        <dd class="product_price">￥{{vo.goods_price}}<span v-if="vo.goods_market_price != '0.00'">{{vo.goods_market_price}}元</span></dd>
                                    </dl>
                                </div>
                            </li>
                           
                            
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        </div>

        <!-- 底部 -->
        <shop-foot />
         <loading v-if="isLoading"></loading>
    </div>
    
</template>

<script>
import ShopHead from '@/components/home/public/head'
import Banner from '@/components/home/public/banner'
import BannerBottomAdv from "@/components/home/public/banner_bottom_adv"
import ShopFoot from "@/components/home/public/shop_foot"
import ShopIndexAdv from "@/components/home/public/shop_index_adv"
// import VueLazyload from 'vue-lazyload' // 图片懒加载
// Vue.use(VueLazyload)
export default {
    components: {ShopHead,Banner,BannerBottomAdv,ShopFoot,ShopIndexAdv},
    props: {},
    data() {
      return {
          list:[],
          seckills:'00:00',
          seckill_list:[],
          timeFormat:[],
          subnav_show:true,
          isLoading:true
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_index(){
            this.$get(this.$api.homeIndex).then(res=>{
                this.seckills  = moment().format('H')+':00';
                this.list = res.data;
                if(this.list.seckill_list.length>0){
                    this.timing();
                    this.seckill_list = this.list.seckill_list;
                }
                this.isLoading = false;
            })
        },
         // 定时器
        timing(){
            let endTime = moment().add(1,'hours').format('YYYY-MM-DD HH')+':00:00';
            let obj = setInterval(()=>{
                let timeVal = moment(endTime).format('X') - moment().format('X');
                // 时间戳转换
                var d = Math.floor(timeVal / (24 * 3600));
                var h = Math.floor((timeVal - 24 * 3600 * d) / 3600);
                var m = Math.floor((timeVal - 24 * 3600 * d - h * 3600) / 60);
                var s = Math.floor((timeVal - 24 * 3600 * d - h * 3600 - m * 60));
                // console.log(d + '天' + hh + '时' + mm + '分' + ss + '秒'); // 打印出转换后的时间
                //  当时分秒小于10的时候补0
                var hh = h < 10 ? '0' + h : h;
                var mm = m < 10 ? '0' + m : m;
                var ss = s < 10 ? '0' + s : s;
                // this.seckills.format_time =  d + '天' + hh + '时' + mm + '分' + ss + '秒';
                this.timeFormat = [hh,mm,ss];
                if(moment(endTime).valueOf()<moment().valueOf()){
                    clearInterval(obj);
                    this.$router.go(0);
                }
            },1000)
            
        },
        toGoods(id){
            return this.$router.push('/goods/'+id);
        },
    },
    created() {
        this.get_index();
    },
    mounted() {
        // 监听滚动条
        window.addEventListener('scroll', ()=>{
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>20){
                this.subnav_show = false;
            }else{
                this.subnav_show = true;
            }
        }, true);
    }
};
</script>
<style lang="scss" scoped>
.index_bg{
    background: #eef8e0 url(~@/asset/pc/bg.jpg) no-repeat center top/ 100% auto;
    padding: 20px 0 60px 0;
    margin-top: 0px;
    .index_bg_box{
        background: #fff;
        width: 1240px;
        padding:20px;
        margin:0 auto
    }
}
.index_class_goods_right{
    width: 100%;
    float: left;
    ul li{
        &:first-child{
            width:460px;
            img{width: 100%;height: 100%;}
        }
        cursor: pointer;
        width: 220px;
        height: 300px;
        margin-bottom: 14px;
        margin-left: 20px;
        box-sizing: border-box;
        float: left;
        .product_act_in{
            width: 220px;
            height: 300px;
            background: #fff;
            box-sizing: border-box;
            transition: all 0.2s linear;
        }
        dl{
            padding-top: 10px;
        }
        dl dt{
            width: 180px;
            height: 180px;
            margin:0 auto;
        }
        dl dt img{
            width: 100%;
            height: 100%;
        }
        dl dd{
            width: 190px;
            overflow: hidden;
            text-align: center;
            margin:0 auto;
        }
        dl dd.product_title{
            font-size: 14px;
            margin-top: 5px;
            height: 30px;
            line-height: 30px; text-align: left;
        }
        dl dd.product_subtitle{
            margin-top: 0px;
            font-size: 12px;
            color:#b0b0b0;
            line-height: 14px;
            text-align: left;
        }
        dl dd.product_price{
            font-size: 16px;
            color:#ca151e;
            line-height: 34px;
             text-align: left;
            span{
                font-size: 14px;
                color:#b0b0b0;
                margin-left: 8px;
                text-decoration: line-through;
            }
        }
        .product_store_name{
            text-align: left;
            span{
                background: #4bb16f;
                color: #fff;
                font-size: 12px;
                padding:0 10px;
                height: 24px;line-height: 24px;
                border-radius: 2px;
            }
        }
    }
    ul li:hover .product_act_in{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top:-3px;
    }
}

.index_adv_goods_left{
    width: 234px;
    height: 614px;
    float: left;
    transition: all 0.2s linear;
    background: #fff;
}
.index_adv_goods_left:hover{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.goods_class_list:after{
    clear: both;
    display: block;
    content:'';
}
.goods_class_list{
    margin-bottom: 30px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    
    .title{
        font-size: 22px;
        margin-bottom: 20px;
        span{
            font-size: 14px;
            float: right;
        }
    }
}
.seckill{
    background: #fff;
    margin-bottom: 50px;
    .seckill_left{
        width: 234px;
        height: 340px;
        box-sizing: border-box;
        background: #f1eded;
        border-top: 1px solid #ca151e;
        float: left;
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .seckill_end_time{
            padding-top:25px;
            text-align: center;
            color:#ca151e;
            font-size: 28px;
            .seckill_icon{
                padding-top: 30px;
            }
            p.font_skill{
                font-size: 14px;
                color:#666;
                padding-top: 20px;
                padding-bottom: 20px;
                span{
                    font-size:24px
                }
            }
            i{
                font-size: 40px;
            }
            ul{
                margin-left: 45px;
                height: 40px;
            }
            ul li{
                cursor: pointer;
                float: left;
                width: 40px;
                height: 40px;
                background: #2f3430;
                color:#fff;
                margin-right: 10px;
                text-align: center;
                line-height: 40px;
            }
            .more {
margin-top: 10px;
            }
            .more a{border-radius: 5px;
background: #4bb16f;font-size: 14px;padding:10px 20px;color:#fff;
&:hover{background: #1c8d44;}
            }
        }
        
    }
    .seckill_left:after{
        display: block;
        content:'';
        clear:both;
    }
    .seckill_title{
        font-size: 22px;
        margin-bottom: 20px;
        span{
            float:right;
            font-size: 14px;
            padding-right: 15px;
        }
        a:hover{
            color:#ca151e;
        }
    }
    .seckill_right{
        float: left;
        ul li{
            width: 220px;
            height: 340px;
            background: #fff;
            margin-left: 20px;
            float: left;
            box-sizing: border-box;
            -webkit-transition: all .2s linear;
            transition: all .2s linear;
            cursor: pointer;
         dl dt{
            width: 180px;
            height: 180px;
            margin:20px auto 0 auto;
        }
        dl dt img{
            width: 100%;
            height: 100%;
        }
        dl dd{
            width: 190px;
            overflow: hidden;
            text-align: center;
            margin:0 auto;
        }
        dl dd.product_title{
            font-size: 14px;
            margin-top: 5px;
            height: 30px;
            line-height: 30px; text-align: left;
        }
        dl dd.product_subtitle{
            margin-top: 0px;
            font-size: 12px;
            color:#b0b0b0;
            line-height: 14px;
            text-align: left;
        }
        dl dd.product_price{
            font-size: 16px;
            color:#ca151e;
            line-height: 34px;
             text-align: left;
            span{
                font-size: 14px;
                color:#b0b0b0;
                margin-left: 8px;
                text-decoration: line-through;
            }
        }
        .product_store_name{
            text-align: left;
            span{
                background: #4bb16f;
                color: #fff;
                font-size: 12px;
                padding:0 10px;
                height: 24px;line-height: 24px;
                border-radius: 2px;
            }
        }
        .product_buy{
            background: #e22929;
            color: #fff;
            width: 120px;
            height: 30px;
            line-height: 30px;
            margin-top: 5px;
            border-radius: 5px;
        }
            
        }
        ul li:hover{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            margin-top:-3px;
        }
        ul li:nth-child(1){
            border-top:1px solid #00c0a5;
        }
        ul li:nth-child(2){
            border-top:1px solid #ffac13;
        }
        ul li:nth-child(3){
            border-top:1px solid #83c44e;
        }
        ul li:nth-child(4){
            border-top:1px solid #2196f3;
        }
    }
}
</style>