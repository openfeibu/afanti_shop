<template>
    <div class="home_seckills">

        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >秒杀现场</a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <!-- 搜索条件 S -->
        <div class="goods_where w1200">
            <a-row :gutter="{ xs: 12,  md: 12}">
                <a-col :span="6">
                    <div :class="timeIndex==0?'item ck':'item'" @click="timeChange(0)">
                        <span class="title">{{timeList[0]||'00'}}:00 场</span>
                        <span class="name">距离结束 {{timeFormat}}</span>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div :class="timeIndex==1?'item ck':'item'" @click="timeChange(1)">
                        <span class="title">{{timeList[1]||'00'}}:00 场</span>
                        <span class="name">即将开始</span>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div :class="timeIndex==2?'item ck':'item'" @click="timeChange(2)">
                        <span class="title">{{timeList[2]||'00'}}:00 场</span>
                        <span class="name">即将开始</span>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div :class="timeIndex==3?'item ck':'item'" @click="timeChange(3)">
                        <span class="title">{{timeList[3]||'00'}}:00 场</span>
                        <span class="name">即将开始</span>
                    </div>
                </a-col>
            </a-row>
        </div>
        <!-- 搜索条件 E -->

        <!-- 产品列表 S -->
        <div class="goods_list w1200" v-if="list.length>0">
            <ul>
                <li v-for="(v,k) in list" :key="k">
                    <router-link :to="'/goods/'+v.id+'?type=seckill'">
                    <div class="product_act_in">
                        <!-- <dl>
                            <dt><img v-lazy="v.goods_master_image" :alt="v.goods_name" /></dt>
                            <dd class="product_title" :title="v.goods_name">{{v.goods_name}}</dd>
                            <dd class="product_subtitle">{{v.goods_subname||'-'}}</dd>
                            <dd class="product_price">￥{{v.goods_price}}<span>{{v.goods_market_price}}元</span></dd>
                        </dl>
              -->
                                <dl>
                                    <dt><img v-lazy="v.goods_master_image||''" :alt="v.goods_name" /></dt>
                                    <dd class="product_title" :title="v.goods_name">{{v.goods_name}}</dd>
                                    <!-- <dd class="product_subtitle">{{v.goods_subname}}</dd> -->
                                    <dd class="product_store_name"><span>{{v.store_name}}</span></dd>
                                    <dd class="product_price">￥{{v.goods_price}}<span>{{v.goods_market_price}}元</span></dd>
                                    <dd class="product_buy">立即抢购</dd>
                                </dl>
                        
                    </div>
                </router-link>
                </li>
            </ul>
            <div class="clear"></div>
            <div class="fy" style="margin-top:30px">
                <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
            </div>
        </div>
        <a-empty v-else style="margin-top:250px" />
        <!-- 产品列表 E -->
        <loading v-if="isLoading" />
    </div>
</template>

<script>
import Loading from '../../../components/home/public/loading.vue';
export default {
    components: {Loading},
    props: {},
    data() {
      return {
          timeList:[],
          timeFormat:' 00 : 00 : 00 ',
          timeIndex:0,
          list:[],
          params:{
              page:1,
              per_page:30,
              total:0,
              start_time:0,
          },
          isLoading:true,
      };
    },
    watch: {},
    computed: {},
    methods: {
        onload(){
            this.timeList = [moment().format('H'),moment().add(1,'hours').format('H'),moment().add(2,'hours').format('H'),moment().add(3,'hours').format('H')]
           this.isLoading=true;
           this.get_list();
        },
        get_list(){
            this.$get(this.$api.homeSeckill,this.params).then(res=>{
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
                this.timeFormat = ' '+hh+' : '+mm+' : '+ss
                if(moment(endTime).valueOf()<moment().valueOf()){
                    clearInterval(obj);
                    this.$router.go(0);
                }
            },1000)
            
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
        ul li{
            width: 220px;
           height: 340px;
            margin-bottom: 14px;
            margin-right: 20px;
            box-sizing: border-box;
            &:nth-child(5n){
                margin-right: 0;
            }
            
            float: left;
            .product_act_in{
                width: 220px;
                padding:0 0 0 0;
                background: #fff;
                box-sizing: border-box;
                -webkit-transition: all .2s linear;
                transition: all .2s linear;
                // background: #fafafa;
                border:1px solid #f1f1f1;
            }
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
               background: #e43838;
    color: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 5px;
        }
        }
        
        ul li:hover .product_act_in{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            margin-top:-3px;
        }
    }
    .goods_where{
        // border: 1px solid #efefef;
        line-height: 50px;
        font-size: 14px;
        .item{
            cursor: pointer;
            background: #f4f4f4;
            text-align: center;
            .title{
                font-size: 20px;
                font-weight: bold;
                line-height: 50px;
                margin-right: 10px;
                color:#666;
            }
            .name{
                font-size: 14px;
                line-height: 50px;
                color:#666;
            }
            &.ck{
                background: #4bb16f;
                color:#fff;
                .title{
                    font-weight: bold;
                    color:#fff;
                }
                .name{
                    color:#fff;
                }
            }
        }
    }
}
</style>