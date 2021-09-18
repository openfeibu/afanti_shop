<template>
    <div class="footerbg">
        <div class="shop_foot width_center_1200">
            <!-- <shop-index-adv :adv="adv"></shop-index-adv> -->
            <ul class="clear">
                <li><router-link to="">五星服务</router-link></li>
                <li><router-link to="">极速配送</router-link></li>
                <li><router-link to="">品质保障</router-link></li>
                <li><router-link to="">优质服务</router-link></li>
            </ul>
            <div class="footer-info clear">
                <div class="footer-info-left">
                    <div class="logo" :style="{background:'url(' + common.common.logo + ') no-repeat center/100% auto'}" ></div>
                    <div class="title"> {{common.common.title}}</div>
                    <div class="des"> {{common.common.description}}</div>
                    <div class="email">邮箱：{{common.common.email}}</div>
                </div>
                <div class="footer-info-right">
                    <dl class="fore1">
                        <dt>购物指南</dt>
                        <dd><router-link to="">购物流程</router-link></dd>
                        <dd><router-link to="">会员介绍</router-link></dd>
                        <dd><router-link to="">常见问题</router-link></dd>
                        <dd><router-link to="">联系客服</router-link></dd>
                    </dl>
                    <dl class="fore1">
                        <dt>支付方式</dt>
                        <dd><router-link to="">微信支付</router-link></dd>
                        <dd><router-link to="">支付宝支付</router-link></dd>
                        
                    </dl>
                    <dl class="fore1">
                        <dt>售后服务</dt>
                        <dd><router-link to="">售后政策</router-link></dd>
                        <dd><router-link to="">退款说明</router-link></dd>
                        <dd><router-link to="">退换货</router-link></dd>
                        <dd><router-link to="">取消订单</router-link></dd>
                    </dl>
                    <dl class="fore1">
                        <dt>购物指南</dt>
                        <dd><router-link to="">购物流程</router-link></dd>
                        <dd><router-link to="">会员介绍</router-link></dd>
                        <dd><router-link to="">生活旅行/团购</router-link></dd>
                        <dd><router-link to="">常见问题</router-link></dd>
                        <dd><router-link to="">大家电</router-link></dd>
                        <dd><router-link to="">联系客服</router-link></dd>
                    </dl>
                </div>
            </div>
            <div class="foot_copyright">
                <p>Copyright © 2012-2016 xxxxxx.COM 版权所有 保留一切权利</p>
                <p>公安备案 | {{common.common.icp}} | 技术支持：<a target="_black" href="http://www.feibu.info">飞步科技</a></p>
            </div>
            <!-- <a-back-top /> -->
            <fixedpower />
        </div>
    </div>
</template>

<script>
import Fixedpower from "@/components/home/public/fixed_power.vue"
import {mapState} from 'vuex'
export default {
    components: {
         Fixedpower,
    },
    props: {},
    data() {
      return {
          adv:{},
          info:{},
      };
    },
    watch: {},
    computed: {
        ...mapState('homeCommon',['common'])
    },
    methods: {
        
    },
    created() {
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.footerbg{
     background: #fbfbfb
}
.shop_foot{
   
    padding-top: 10px;
    text-align: center;
    ul{
        margin:40px auto 0 auto;
        width: 664px;
        border-top: 1px solid #efefef;
        padding: 20px 0;
    }
    ul li{
        float: left;
       text-align: center;
        
        font-size: 14px;
        width: 25%;
    }

    .foot_copyright{
        clear: both;
        font-size: 12px;
        line-height: 28px;
        padding-bottom: 10px;
    }
     .footer-info{border-top: 1px solid #eee;border-bottom: 1px solid #eee;height: 300px;}
    .footer-info-left{
        width: 300px;
        float: left;
        text-align: left;
        .logo{
            width: 200px;
            height: 120px;
        img{width: 100%;}}
        .title{
            font-size: 20px;color: #1c8d44;
            margin-bottom: 10px;
        }
        .des{
            font-size: 14px;color: #666;
            height: 70px;
            overflow: hidden;
        }
        .email{
            font-size: 14px;color: #666;
        }
    }
    .footer-info-right{float: right;text-align: left;margin:50px;
        dl{
            float:left;width: 200px;
            dt{
                font-size: 16px;
                margin-bottom: 10px;
            }
            dd{
                font-size: 14px;color: #999;
                line-height: 24px;
                a{
                    color:#999
                }
            }
        }
    }
}
</style>