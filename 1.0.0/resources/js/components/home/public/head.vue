<template>
    <div class="shop_head">
        <head-top></head-top>

        <!-- logo and search -->
        <div class="center_top width_center_1200" v-show="center_top">
            <div class="shop_logo float_left">
                <router-link to="/"><img width="242px" height="74px" :src="require('@/asset/pc/logo.png')" ></router-link>
            </div>
            <div class="shop_top_seach float_left">
                <ul>
                    <li><input class="search_input" v-model="keywords" type="text" placeholder="输入商品名称"></li>
                    <li><button class="search_button" type="button" @click="search()"><a-icon type="search" /></button></li>
                    <li>
                        <div class="index_my_car">
                            <!-- <span @click="to_my_store()">我的商城<a-font type="icondianpu" /></span> -->
                            <span><router-link to="/cart">我的购物车<a-font type="icongouwuche1" /></router-link><div class="shop_car_dot">{{cart_num||0}}</div></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- nav -->
        <div class="shop_top_nav">
            <div class="width_center_1200">
                <div class="shop_top_nav_left" @mouseover="subnav_show?subnav:subnav=true" @mouseleave="subnav_show?subnav:subnav=false">
                    <router-link to="/s/e30=">全部分类</router-link>
                    <transition name="el-zoom-in-top"><leftBar :goods_class="common.classes" :change_color="change_color" v-show="subnav"></leftBar></transition>
                </div>
                <div class="shop_top_nav_right">
                    <ul>
                        <li>
                            <router-link exact to="/">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/store">展馆列表</router-link>
                        </li>
                        <li>
                            <router-link to="/seckill">秒杀专区</router-link>
                        </li>
                        <li>
                            <router-link to="/collective">拼团专区</router-link>
                        </li>
                        <li>
                            <router-link to="/bargain">砍价专区</router-link>
                        </li>
                        <li>
                            <router-link to="/coupon">优惠券</router-link>
                        </li>
                        <!-- <li>
                            <router-link to="/integral/index">积分商城</router-link>
                        </li> -->
                        <li>
                            <router-link to="/help">帮助中心</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '@/components/home/public/head_top'
import leftBar from '@/components/home/public/leftbar'
import {mapState} from 'vuex'
export default {
    components: {headTop,leftBar},
    props: {
        subnav_show:{
            type:Boolean,
            default:true,
        },
    },
    data() {
      return {
          classes:[],
          subnav_show:true,
          subnav:true,
          change_color:false,
          center_top:true,
          keywords:'',
      };
    },
    watch: {
        subnav_show:function(val){
            this.subnav = val;
        },
    },
    computed: {...mapState('homeLogin',['isLogin','userInfo']),...mapState('homeCommon',['common']),...mapState('homeCart',['cart_num'])},
    methods: {
        get_common(){
            this.$get(this.$api.homeCommon).then(res=>{
                return this.$store.dispatch('homeCommon/set_common',res.data);
            })
        },
        checkLogin(){
            // 判断token是否失效
            let token = localStorage.getItem('token');
            if(!this.$isEmpty(token)){
                this.$get(this.$api.homeCheckLogin).then(res=> {
                    this.$store.dispatch('homeLogin/check_login',res);
                });
            }
        },
        cart_count(){
            this.$get(this.$api.homeCarts+'/cart_count').then(res=> {
                if(res.code == 200){
                    this.$store.dispatch('homeCart/set_cart_num',res.data);
                }
            });
        },
        search(){
            let params = {};
            params.keywords = encodeURIComponent(this.keywords);
            this.$router.push('/s/'+window.btoa(JSON.stringify(params)))
        },
        to_my_store(){
            this.$get(this.$api.homeStoreVerify).then(res=>{
                if(res.code == 200){
                    if(res.data.store_verify == 3){
                        this.$router.push('/store/'+res.data.id)
                    }else{
                        this.$message.error('您还不是入驻商家！')
                    }
                }
            })
        },
    },
    created() {
        this.get_common();
        this.checkLogin();
        this.cart_count(); // 购物车
        
        // 如果是不是首页则变成黑色 收缩模式
        if(this.$route.name != 'home_index'){
            this.change_color = true;
            this.subnav_show = false;
            this.subnav = false;
        }
        // 监听滚动条
        window.addEventListener('scroll', ()=>{
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>205){
                this.center_top = false;
            }else{
                this.center_top = true;
            }
        }, true);
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.shop_head{
    z-index: 666;
    position: fixed;
    background: #fff;
    left:0;
    right: 0;
}

.center_top:after{
    display: block;
    clear:both;
    content:'';
}

.shop_logo{
    margin-top: 40px;
    margin-bottom: 40px;
}
.shop_top_nav{
    height: 40px;
    background:#1c8d44;
    font-size: 14px;
    line-height: 40px;
    color:#fff;
    .shop_top_nav_left{
        float: left;
        width: 240px;
        background:#4bb16f;
        box-sizing: border-box;
        padding-left: 15px;
        position: relative;
        > a{
            color:#fff
        }
    }
    .shop_top_nav_right{
        padding-left: 20px;
        float: left;
        ul li{
            float: left;
        }
        ul li a{
            line-height: 40px;
            padding:0 30px;
            color:#fff;
            display: block;
        }
        ul li a:hover{
            background: #4bb16f;
        }
        ul li a.router-link-active{
            background: #4bb16f;
        }
    }
}
.shop_top_seach{
    margin-top: 60px;
    margin-left: 180px;
    ul li{
        float: left;
    }
    .search_input{
        width: 434px;
        height: 38px;
        padding: 10px;
        outline: 0;
        border: 1px solid #efefef;
        border-right: none;
        float: left;
        box-sizing: border-box;
        font-size: 12px;
    }
    .search_button{
        border: 1px solid #efefef;
        float: left;
        width: 38px;
        height: 38px;
        background: #fff;
        outline: 0;
        text-align: center;
    }
    .search_button:hover{
        color:#fff;
        background:#333;
    }
    .index_my_car{
        height: 38px;
        border: 1px solid #efefef;
        margin-left: 30px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 38px;
        padding: 0 20px;
        span:hover{
            color:#1c8d44;
        }
        span{
            margin-right: 20px;
            position: relative;
            i{
                font-size: 14px;
                margin-left: 6px;
            }
            a:hover{
                color:#1c8d44;
            }
            .shop_car_dot {
                position: absolute;
                top: -24px;
                line-height: 16px;
                background: #1c8d44;
                padding: 0 4px;
                color: #fff;
                border-radius: 4px;
                right: -10px;
            }
        }
        span:last-child{
            margin-right: 0;
            i{
                font-size: 14px;
            }
        }
        
    }
}
</style>