<template>
    <div class="integral_index">
        <!-- <div><banner :list="banner" :height="350" /></div> -->
        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >拼团专区</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
     
    <div class="index_bg">

        <div class="s_goods_content w1200" >
            <block v-if="params.total>0">
            <!-- 产品列表 S -->
            <div class="s_goods_list2">
                <div class="item" v-for="(v,k) in list" :key="k">
                    <dl>
                        <router-link :to="'/goods/'+v.id">
                            <dt><img width="180px" height="180px" v-lazy="v.goods_master_image" :alt="v.goods_name"></dt>
                            <dd class="title">{{v.goods_name}}</dd>
                            <dd class="product_store_name"><span>{{v.store_name}}</span></dd>
                            <dd class="price">￥{{v.goods_price}} <font>拼团价</font></dd>
                            
                            <dd class="product_buy" >
                                <span>{{v.need}} </span>人成团,立即拼团
                            </dd>
                        </router-link>
                    </dl>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 产品列表 E -->

            <div class="fy">
                <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
            </div>
            </block>
            <a-empty style="padding:100px 0" description="没有拼团商品" v-else />
        </div>
      
        
    </div>
       <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
              total:0,
              is_collective:1,
          },
          list:[],
          isLoading:true
      };
    },
    watch: {},
    computed: {...mapState('homeCommon',['common'])},
    methods: {
        // 初始化数据
        onload(){
            
            this.$post(this.$api.homeGoods+'/search/all',this.params).then(res=>{
                if(res.code == 200){
                    this.params.total = res.data.total;
                    this.params.per_page = res.data.per_page;
                    this.params.current_page = res.data.current_page;
                    this.list = res.data.data;
                    // console.log(this.params);
                }else{
                    this.$message.error(res.msg);
                }
                this.isLoading = false
            })
   
        },
         onChange(e){
            this.params.page = e;
            this.isLoading = true;
            this.onload();
        },
    },
    created() {
        this.onload()
       
    },
    mounted() {},
    beforeRouteUpdate (to, from, next) {
      
    }
};
</script>
<style lang="scss" scoped>
.integral_index{overflow: hidden;}
.index_bg{
    overflow: hidden;
    background: rgba(255,96,80,0.5) url(~@/asset/pc/bg4.jpg) no-repeat center top/ 100% auto;
    min-height: 600px;
   
}
.s_goods_content{
background: #fff;padding:20px 20px;
margin-top: 20px;
 border-radius: 10px;
}
.goods_where{
    
    border: 1px solid #efefef;
    line-height: 50px;
    font-size: 14px;
    .item{
        padding:0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        dt{
            width: 180px;
            height: 180px;
            margin:20px auto 0 auto;
            padding:0 !important;
        }
        img{
            width: 100%;
            height: 100%;
        }
        &:last-child{
            border-bottom: none;
        }
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        .title{
            float: left;
            margin-right: 20px;
        }
        .list{
            float: left;
            ul li{
                cursor: pointer;
            }
            .first{
                &:after{
                    clear: both;
                    display: block;
                    content:'';
                }
                ul li{
                    background: #efefef;
                    line-height: 30px;
                    padding:0 10px;
                    margin-top: 10px;
                    text-align: center;
                    float: left;
                    margin-right: 20px;
                    border-radius: 3px;
                    &:hover{
                        color:#fff;
                        background-color:#ca151e;
                    }
                    &.red{
                       color:#fff;
                       background-color:#ca151e; 
                    }
                }
            }
            .sec{
                ul{
                    border-top: 1px dashed #e1e1e1;
                    margin-top: 20px;
                    &:after{
                        clear:both;
                        display: block;
                        content:'';
                    }
                }
                ul li{
                    float: left;
                    margin-right: 20px;
                    padding:0 10px; 
                    line-height: 40px;
                    color: #666;
                    font-size: 12px;
                    &:hover{
                        color:#ca151e;
                    }
                    &.red{
                       color:#ca151e;
                    }
                }
                &:after{
                    clear: both;
                    display: block;
                    content:'';
                }
            }
            .other{
                ul li{
                    float: left;
                    margin-right: 20px;
                    padding:0 10px;
                    position: relative;
                    &:hover{
                        color:#ca151e;
                    }
                    &.red{
                       color:#ca151e;
                    }
                    .sorts{
                        position: absolute;
                        top:0;
                        right: 0;
                        color:#666;
                        .caret{
                            font-size: 12px;
                            position: absolute;
                            -webkit-transform-origin-x: 0; //缩小后文字居左
                            -webkit-transform: scale(0.80);   //关键
                            &:first-child{
                               top:16px;
                               right:-5px; 
                            }
                            &:last-child{
                               top:22px;
                               right:-5px; 
                            }
                            &.red{
                                color:#ca151e;
                            }
                        }
                    }
             
                }
            }
        }
    }
}

.s_goods_list2 {
    // margin-top: 40px;
    margin-bottom: 30px;
     .item {
        float: left;
        width: 224px;
        height: 364px;
        box-sizing: border-box;
        margin: 0 20px 20px 0;
    }
    .item dl {
        border: 1px solid #efefef;
        box-sizing: border-box;
        width: 224px;
        height: 338px;
        transition: all 0.2s linear;
    }
    .item dl dt {
        padding-top: 20px;
        padding-bottom: 0;
        text-align: center;
    }
    .item:hover dl {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: -3px;
    }
    .item dl dd.title {
        color: #000;
        font-size: 14px;
        margin-top: 5px;
        height: 30px;
        line-height: 30px; text-align: left;
        overflow: hidden;
        width: 190px;
        margin:5px auto 0 auto;
    }
    .item dl dd.price {
        color: #e01d20;
        line-height: 30px;
        text-align: left;
        padding: 0 15px;
        font-size: 20px;
        overflow: hidden;
    }
    .item dl dd.price font {
        color: #999;
        font-size: 12px;
    }
    .item dl dd span.integral {
        width: 100%;
        display: block;
        border-top: 1px solid #efefef;
        float: left;
        line-height: 41px;
        text-align: center;
    }
   
   
     .product_store_name{
            text-align: left;
            padding: 0 15px;
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
    text-align: center;
    span{
        font-size: 20px;
    }
        }
}

</style>