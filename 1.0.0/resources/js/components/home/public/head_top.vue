<template>
    <div class="head">
        <div class="head_in">
            <div class="top_shop_left">
                <ul>
                    <li><router-link to="/">新疆特色水果巴扎官网</router-link></li>
                    <li>|</li>
                    <li><router-link to="/help?id=10">联系客服</router-link></li>
                </ul>
            </div>
            <div class="top_shop_right">
                <ul>
                    <li v-show="!isLogin"><router-link to="/user/login">登录</router-link></li>
                    <li v-show="!isLogin"><router-link to="/user/register">注册</router-link></li>
                    <li v-show="isLogin">欢迎您，<router-link to="/user" style="color:#ca151e">{{userInfo.nickname}}</router-link></li>
                    <li v-show="isLogin">|</li>
                    <li v-show="isLogin"><router-link to="/user" >个人中心</router-link></li>
                    <li v-show="isLogin">|</li>
                    <li v-show="isLogin" @click="logout()">退出</li>
          
<!--                    
                    <li><router-link to="/">手机端</router-link></li>
                    <li>|</li>
                    <li><router-link to="/">APP下载</router-link></li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    components: {},
    props: {},
    data() {
      return {
          city:'',
          amapUrl:'',
      };
    },
    watch: {},
    computed: {...mapState('homeLogin',['isLogin','userInfo'])},
    methods: {
        logout:function(){
            this.$get(this.$api.homeLogout).then(()=>{
                localStorage.removeItem('token');
                this.$store.dispatch('homeLogin/clear_login');
                this.$router.push('/user/login');

            });
        }
    
    },
    created() {
        // this.get_position();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.head{
  border-bottom: 1px solid #efefef;
  height: 30px;

  font-size: 12px;
  line-height: 30px;

  .head_in{
      width: 1200px;
      margin:0 auto;
      .top_shop_left{
          float: left;
          ul li{
              float: left;
              padding:0 5px;
          }
      }
      .top_shop_right{
          float: right;
          ul li{
              float: left;
              padding:0 5px;
          }
          li:hover{
              color:#1c8d44;
          }
      }
  }
  .head_in:after{
      display: block;
      clear: both;
      content:'';
  }
  .head_in a:hover{
      color:#1c8d44;
  }
}
</style>