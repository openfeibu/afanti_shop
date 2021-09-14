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
// .footerbg{
//      background: #fff url('~@/asset/pc/footerBg.png') no-repeat top / cover;
// }
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
}
</style>