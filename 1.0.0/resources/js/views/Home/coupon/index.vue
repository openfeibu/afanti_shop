<template>
    <div class="integral_index">
        <!-- <div><banner :list="banner" :height="350" /></div> -->
        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >优惠券</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
     


        <div class="s_goods_content w1200" v-if="params.total>0">
            <!-- 产品列表 S -->
            <div class="s_goods_list2">
                <div class="item" v-for="(v,k) in list" :key="k">
                    <dl>
                       
                    </dl>
                </div>
                <div class="clear"></div>
            </div>

        </div>
        <a-empty style="margin-top:40px" v-else />
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
            
            this.$get(this.$api.homeCoupon,this.params).then(res=>{
                if(res.code == 200){
                   
                    this.list = res.data.data;
                    // console.log(this.params);
                }else{
                    this.$message.error(res.msg);
                }
                this.isLoading = false
            })
   
        }
    },
    created() {
        this.onload()
       
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
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
    margin-top: 40px;
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