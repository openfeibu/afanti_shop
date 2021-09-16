<template>
    <div class="integral_index">
        <!-- <div><banner :list="banner" :height="350" /></div> -->
        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >优惠券</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="coupons-title">为你推荐好券</div>
        <div class="s_goods_content w1200" v-if="list.length > 0">
            <!-- 产品列表 S -->
            <div class="coupon_list clear">
                <div class="coupon_list_item active" v-for="(v,k) in list" :key="k" @click="receiveCoupon(v.id)">
                    <div class="q-price ">
                        <em>¥</em>
                        <strong>{{v.money}}</strong>
                        <span class="q-limit" data-tips="">满{{v.use_money}}元可用</span>
                    </div>
                    <div class="q-range"><span title="可购买阿凡提商城产品">可购买阿凡提商城产品</span></div>
                </div>
           
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
                   
                    this.list = res.data;
          
                }else{
                    this.$message.error(res.msg);
                }
                this.isLoading = false
            })
   
        },
        // 领取优惠券
        receiveCoupon(id){
            this.$post(this.$api.homeCoupon+'/receive',{id:id}).then(res=>{
                return this.$returnInfo(res)
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

.coupons-title{
    height: 50px;line-height: 50px;
    color: #111;font-size: 30px;
    text-align: center;
    position: relative;
    &:before {
    content: "";
    width: 200px;
    height: 10px;
    background: #4bb16f;
    position: absolute;
    left: 50%;
    margin-left: -100px;
    bottom: 10px;
    z-index: 0;
    opacity: 0.6;
}   
}
.coupon_list{
    padding:20px 0;
    min-height: 500px;
    .coupon_list_item{
        width:24%;margin:20px 0.5%;float: left;
        height: 120px;
        border-radius: 5px;
        cursor: pointer;
        border:1px solid #eee;background: #FCEEF0 url(~@/asset/pc/couponBtn.png) no-repeat right center/auto 100%;
        &.active{
            background: #eeeeee url(~@/asset/pc/couponBtn2.png) no-repeat right center/auto 100%;
             .q-price {color:#666}
        }
        .q-price {
            padding:20px 0 0 30px;
            width: 220px;
            height: 70px;
            line-height: 50px;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #e43838;
            strong{
                font-size: 40px;
            }
        }
        .q-price em {
            display: inline-block;
            *display: inline;
            *zoom: 1;
            font: 400 18px arial;
            vertical-align: top;
            margin: 3px 3px 0 0;
        }
        .q-range{
            text-align: left;font-size: 14px;color: #666;margin-left: 30px;
        }
    }
}
</style>