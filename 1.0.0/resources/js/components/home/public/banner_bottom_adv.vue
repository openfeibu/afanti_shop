<template>
    <div class="banner_bottom_adv_bg">
    <div class="banner_bottom_adv width_center_1200">
        <div class="shop_left_on">
            <ul>
 
                <li><router-link to="/seckill">
                <img :src="require('@/asset/pc/active01.png')" alt="">
                <p>秒杀活动</p>
                </router-link></li>
                <li><router-link to="/collective">
                <img :src="require('@/asset/pc/active02.png')" alt="">
                <p>拼团专区</p>
                </router-link></li>
                <li><router-link to="/bargain">
                <img :src="require('@/asset/pc/active03.png')" alt="">
                <p>砍价专区</p>
                </router-link></li>
                <li><router-link to="/coupon">
                <img :src="require('@/asset/pc/active04.png')" alt="">
                <p>优惠券</p>
                </router-link></li>
                <li><router-link to="/store">
                <img :src="require('@/asset/pc/active05.png')" alt="">
                <p>展馆列表</p>
                </router-link></li>
                <li><router-link to="/help">
                <img :src="require('@/asset/pc/active06.png')" alt="">
                <p>帮助中心</p>
                </router-link></li>

            </ul>
        </div>
        <div class="shop_right_on">
            <ul>
                <li v-for="(v,k) in index_adv" :key="k"><router-link :to="v.url"><img v-lazy="v.image_url" width="312px" height="160px" :alt="v.name" /></router-link></li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        // 传过来的数据
        index_adv:{
            type:Array,
            default:[],
        }
    },
    data() {
      return {
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
.banner_bottom_adv_bg{
    padding:22px 0;
// background: #eef8e0 url(~@/asset/pc/bg3.jpg) no-repeat center bottom/ 100% auto;
}
.banner_bottom_adv{
    
    .shop_left_on{
        float: left;
        width: 240px;
    }
    .shop_left_on ul li {
        width: 78px;
        height: 80px;
        text-align: center;
        background: #f2f2f2;
        box-sizing: border-box;
        padding-top: 10px;
        float: left;
        font-size: 12px;
        line-height: 24px;
        img{width: 32px;}
    }
    .shop_left_on ul li:first-child, .shop_left_on ul li:nth-child(2) {
        border-right: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
    }
    .shop_left_on ul li:nth-child(3) {
        border-bottom: 1px solid #dedede;
    }
    .shop_left_on ul li:nth-child(4), .shop_left_on ul li:nth-child(5) {
        border-right: 1px solid #dedede;
    }
    .shop_left_on ul li:hover{
        background: #e1e1e1;
    }
    .shop_right_on ul li {
        float: left;
        margin-right: 10px;
        width: 312px;
        height: 160px;
        -webkit-transition: all .2s linear;
        transition: all .2s linear;
    }
    .shop_right_on ul li:nth-child(3) {
        margin-right: 0;
    }
    .shop_right_on ul li:hover{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    }
}
</style>