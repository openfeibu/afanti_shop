<template>
    <div class="fb-fixedpower" >
      <ul>
          <li  @click="$router.push('/user')">
              <div class="icon icon1"></div>
              <div class="des transition500">个人中心</div>
          </li>
          <li  @click="$router.push('/cart')">
              <div class="icon icon2"></div>
              <div class="des transition500">购物车</div>
          </li>
          <li  @click="$router.push('/user/coupon')">
              <div class="icon icon3"></div>
              <div class="des transition500">我的优惠券</div>
          </li>
          <li >
              <div class="icon icon4"></div>
              <div class="des transition500 contactDes" >
                  联系客服
                    <img src="@/asset/pc/kf.png" alt="">  
                </div>
          </li>
          <li  style="margin-top:150px" @click="goTop">
              <div class="icon icon5"></div>
              <div class="des transition500">返回顶部</div>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
    name: 'Fixedpower', // 定义的组件名称 fixedpower
     methods: {
        goTop:function(){
              window.scroll({
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth'
                });
        }
    
    },
};
</script>
<style lang="scss" scoped>

.fb-fixedpower{
    position: fixed;
    width: 40px;
    height: 100%;
    z-index: 99999;
    top: 0;
    right: 0;
    ul{
        position: absolute;
        top: 40%;
        li{
            width: 40px;height: 40px;
           cursor: pointer;
         
            margin-bottom: 1px;
            position: relative;
            .icon{
                position: relative;
                z-index: 2;
                border-radius: 5px 0 0 5px;
            }
            &:hover{
                .des{
                    right: 36px;
                }
                 .contactDes{
                     display: block;
                     opacity: 1;
                 }
            }
            .des{position: absolute;right: -150px;top: 0;width: 100px;background: #7a6e6e;height: 40px;line-height: 40px;font-size: 12px;color: #fff;overflow: hidden;z-index: 1;
                
            }
            .contactDes{
                height:180px;width:180px;right: 36px;
                display: none;
                opacity:0;
                img{width: 120px;height: 120px;display: block;margin:10px auto}
            }
        }
    }
}
.icon1{
    width: 40px;height: 40px; background:#7a6e6e url(~@/asset/pc/me.png) no-repeat center/60%
}
.icon2{
    width: 40px;height: 40px; background:#7a6e6e url(~@/asset/pc/car.png) no-repeat center/60%
}
.icon3{
    width: 40px;height: 40px; background:#7a6e6e url(~@/asset/pc/coupon.png) no-repeat center/60%
}
.icon4{
    width: 40px;height: 40px; background:#7a6e6e url(~@/asset/pc/kf.png) no-repeat center/60%
}
.icon5{
    width: 40px;height: 40px; background:#7a6e6e url(~@/asset/pc/top.png) no-repeat center/60%
}
</style>