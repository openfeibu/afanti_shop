<template>
    <div class="footerbg">
        <div class="shop_foot width_center_1200">
        
            <ul class="slogan">
                <li class="slogan-li1">五星服务</li>
                <li class="slogan-li2">极速配送</li>
                <li class="slogan-li3">品质保障</li>
                <li class="slogan-li4">优质服务</li>
            </ul>
            <div class="footer-info clear">
                <div class="footer-info-left">
                    <div class="logo" :style="{background:'url(' + common.common.logo + ') no-repeat center/100% auto'}" ></div>
                    <div class="title"> {{common.common.title}}</div>
                    <div class="des"> {{common.common.description}}</div>
                    <div class="email">邮箱：{{common.common.email}}</div>
                </div>

                <div class="footer-info-right">
                    <dl class="fore1"  v-for="(v,k) in helpList" :key="k">
                        <dt>{{v.name}}</dt>
                        <dd v-for="(vo,key) in v.articles" :key="key" ><router-link :to="'/help?id='+vo.id">{{vo.name}}</router-link></dd>
 
                    </dl>
                
                    <dl class="fore1">
                        <dt>特色活动</dt>
                        <dd><router-link to="/seckill">秒杀专区</router-link></dd>
                        <dd><router-link to="/collective">拼团专区</router-link></dd>
                        <dd><router-link to="">砍价专区</router-link></dd>
              
                    </dl>
                    <dl class="fore1">
                        <dt>友情链接</dt>
                        <dd><a href="http://www.feibu.info">飞步科技</a></dd>
                      
              
                    </dl>
                     <div class="clear"></div>
                     <div class="code-list">
                    <div class="code-list-item">
                         <img src="@/asset/qrcode.png" alt="">  
                        <p>微信公众号</p>
                    </div>
                    <div class="code-list-item">
                         <img src="@/asset/qrcode.png" alt="">  
                        <p>微信小程序</p>
                    </div>
                    <div class="code-list-item">
                         <img src="@/asset/qrcode.png" alt="">  
                        <p>微信在线客服</p>
                    </div>
                </div>
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
          helpList:[]
      };
    },
    watch: {},
    computed: {
        ...mapState('homeCommon',['common'])
    },
    methods: {
          homeHelp(){
            this.$get(this.$api.homeHelp).then(res=>{
                this.helpList = res.data;
                // if(this.id == null){
                //     this.id = this.helpList[0].articles[0].id;
                //     this.getDetail(this.id)
                // }
            })
        },
    },
    created() {
        this.homeHelp();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.footerbg{
     background: #fbfbfb;padding-top: 10px;
}
.shop_foot{
   
    padding-top: 10px;
    text-align: center;
    .slogan{
        margin:0 auto;
        width: 100%;
        border-bottom: 1px solid #efefef;
        padding: 10px 0;
        height:80px;
        line-height: 60px;
        .slogan-li1{
            background:url(~@/asset/pc/ficon1.png) no-repeat 50px center / auto 40px;
        }
        .slogan-li2{
            background:url(~@/asset/pc/ficon2.png) no-repeat 50px center / auto 40px;
        }
        .slogan-li3{
            background:url(~@/asset/pc/ficon3.png) no-repeat 50px center / auto 40px;
        }
        .slogan-li4{
            background:url(~@/asset/pc/ficon4.png) no-repeat 50px center / auto 40px;
        }
    }
    .slogan li{
        float: left;
        text-align: center;
        font-size: 14px;
        width: 25%;
        color: #3a3a3a;
        font-size: 18px;
    }

    .foot_copyright{
        clear: both;
        font-size: 12px;
        line-height: 28px;
        padding: 10px 0;
    }
     .footer-info{border-bottom: 1px solid #eee;min-height: 300px;}
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
            min-height: 70px;
            max-height: 140px;
            overflow: hidden;
        }
        .email{
            font-size: 14px;color: #666;
        }
    }
    .footer-info-right{float: right;text-align: left;margin:50px 50px 20px 50px;
        dl{
            float:left;width: 160px;
            dt{
                font-size: 16px;
                margin-bottom: 10px;
            }
            dd{
                font-size: 14px;color: #999;
                line-height: 28px;
                a{
                    color:#999;
                    &:hover{color: #1c8d44;}
                }
            }
        }
    }
    .code-list{
        margin:30px 0 0 0;
      .code-list-item{float: left;width: 30%;margin:0 1.5%;}
      img{width: 150px;height: 150px;}
      p{line-height: 40px;font-size: 14px;color: #999;width: 150px;text-align: center;}
    }
}
</style>