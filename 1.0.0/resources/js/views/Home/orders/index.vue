<template>
    <div class="create_order_1 w1200 clear">
        <div class="step_bar">
            <div class="step">
                <div class="item check"><a-icon type="shopping-cart" />我的购物车</div>
                <div class="item check"><a-icon type="car" />物流地址</div>
                <div class="item"><a-icon type="account-book" />选择支付</div>
                <div class="item"><a-icon type="check-circle" />支付成功</div>
            </div>
        </div>

        <!-- 地址信息选择 S -->
        <div class="block">
            <div class="title">选择送货地址<router-link to="/user/address/form">新增收货地址</router-link></div>
            <div class="address_list" v-if="address.length>0">
                <ul>
                    <li :class="v.is_default==1?'red':''" v-for="(v,k) in address" :key="k" @click="addressChange(v.id)">
                        <div class="receive_name">
                            {{v.receive_name}}
                            <span>({{v.receive_tel}})</span>
                        </div>
                        <div class="area_info">{{v.area_info+' '+v.address}}</div>
                        <div class="cmarker"><a-font type="iconcmarker"></a-font></div>
                    </li>
                    
                </ul>
            </div>

            <div class="empty_address" v-else>
                没有设置收货地址，请先前往<router-link to="/user/address/form">设置</router-link>
            </div>
        </div>
        <!-- 地址信息选择 E -->

        <!-- 预生成订单信息 S -->
        <div class="block">
            <div class="title">商品信息</div>
            <div class="goods_list">
                <div class="goods_th">
                    <a-row>
                        <a-col :span="10">商品信息</a-col>
                        <a-col :span="4">属性信息</a-col>
                        <a-col :span="4">单价</a-col>
                        <a-col :span="2">数量</a-col>
                        <a-col :span="2">优惠</a-col>
                        <a-col :span="2">小计</a-col>
                    </a-row>
                </div>

                <div class="store_list" v-for="(v,k) in order.list" :key="k">
                    <div class="store_title">
                        <div>
                            <router-link :to="'/store/'+v.store_info.id" class="float_left">
                                <img :src="v.store_info.store_logo||require('@/asset/store/default_store_image.png')" :alt="v.store_info.store_name">
                                <span>{{v.store_info.store_name}}</span>
                            </router-link>

                            <div class="clear"></div>
                        </div>

                        <div class="og_list">
                            <ul>
                                <li v-for="(vo,key) in v.goods_list" :key="key">
                                    <a-row>
                                        <a-col :span="10">
                                            <dl>
                                                <dt><img :src="vo.goods_master_image" :alt="vo.goods_name"></dt>
                                                <dd :title="vo.goods_name">{{vo.goods_name}}</dd>
                                            </dl>
                                        </a-col>
                                        <a-col :span="4"><div class="goods_info_th">{{vo.sku_name}}</div></a-col>
                                        <a-col :span="4"><div class="goods_info_th">{{vo.goods_price}}</div></a-col>
                                        <a-col :span="2"><div class="goods_info_th">{{vo.buy_num}}</div></a-col>
                                        <a-col :span="2"><div class="goods_info_th">-</div></a-col>
                                        <a-col :span="2"><div class="goods_info_th red">￥{{vo.total_price}}</div></a-col>
                                    </a-row>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="remark">
                <div class="goods_th">备注</div>
                <div class="remark_input">
                    <textarea cols="60" rows="3" v-model="remark"></textarea>
                </div>
            </div>

            <div class="sum_block">

                <div class="sum_block_item"  v-if="order.coupon"  >
                    <div class="label">优惠券：</div>
                    <div class="con">
                        <a-select style="width:140px" v-model="order.coupon.coupon_id" @change="couponChangeHandle" >
                            <a-select-option :value="0" >不使用优惠券</a-select-option>
                            <a-select-option v-for="(val,key) in order.coupon.coupons" :key="key" :value="val.id" >{{val.money}}优惠券</a-select-option>
                        </a-select>
                    </div>
                </div>

                <div class="order_price sum_block_item">  <div class="label">总商品金额：</div><div class="con"><span>￥{{order.order_price}}</span></div></div>
                <div class="freight sum_block_item">  <div class="label">运费：</div><div class="con"><span>￥{{freight}}</span></div></div>
                <div class="discount sum_block_item">  <div class="label">总优惠：</div><div class="con"><span>-￥{{total_discount}}</span></div></div>

            </div>
             <div class="clear"></div>
             <div class="total-box clear">
                    <div class="total sum_block_item">  <div class="label">应付金额：</div><div class="con"><span>￥{{order.order_price + freight - total_discount }}</span></div></div>
                   <div class="clear"></div>
                    <div class="nowaddress"  v-if="v.is_default == 1" v-for="(v,k) in address" :key="k">寄往：{{v.area_info+' '+v.address}} 收货人：{{v.receive_name +' '+ v.receive_tel}}</div>
            </div>
            <div :class="loading?'submitBtn hide':'submitBtn'" @click="create_order">{{loading?'加载中..':'创建订单'}}</div>
        </div>
        <!-- 预生成订单信息 E -->
    </div>
</template>

<script>

export default {
    components: {},
    props: {},
    data() {
      return {
          address:[],
          order:[],
          address_id:0,
          total:0,
          remark:'',
          loading:false,
          freight: 0,
          total_discount: 0,
          discount: 0,
          province_id:0,
          modal:null
      };
    },
    watch: {},
    computed: {},
    methods: {
        onload(){
            this.create_order_before();
        },
        // 获取地址
        get_address(){
            this.$get(this.$api.homeAddress).then(res=>{
                res.data.forEach(item=>{
                    if(item.is_default==1){
                        this.address_id = item.id;
                        this.province_id = item.province_id;
                    }
                })
                this.address = res.data;
                this.get_freight();
            })
        },
        // 地址选择
        addressChange(id){
            this.$put(this.$api.homeAddress+'/default/set',{id:id}).then(res=>{
                if(res.code == 200){
                    this.get_address();
                    this.$message.success('设置地址成功');
                    this.address_id = id;

                }else{
                    this.$message.destroy();
                    this.$message.error(res.msg)
                }
            })
        },
        get_freight(){
            var params = {freight_id:this.order.freight_id,total_weight:this.order.total_weight,province_id:this.province_id};
            this.$get(this.$api.homeOrder+'/get_freight',params).then(res=>{
                if(res.code == 200){
                    this.freight = this.$formatFloat(res.data.freight);
                }
            })
        },
        couponChangeHandle(val){
            var that = this
            var hh = that.order.coupon.coupons.filter(function (c, i, a) {//第一个参数为当前项,第二个参数为索引,第三个为原值
                if (c.id == that.order.coupon.coupon_id) {
                    return c
                }
            })
            if(this.order.coupon.coupon_id)
            {
                this.total_discount = this.$formatFloat(this.order.discount)+this.$formatFloat(hh[0].money);
            }else{
                this.total_discount = this.$formatFloat(this.order.discount);
            }
        },
        // 订单建立前预览商品信息
        create_order_before(){
            let that = this;
            this.$get(this.$api.homeOrder+'/create_order_before',{params:this.$route.params.params}).then(res=>{
                if(res.code == 200){
                    this.order = res.data;
                    this.get_address();
                    this.couponChangeHandle();
                }else if(res.code == 8012){
                    // this.$message.destroy();
                    console.log(that.$router.history.matched)
                    this.modal =  this.$error({
                        title: '阿凡提·水果巴扎',
                        content: '有产品库存信息发生变化，请返回购物车修改',
                        onOk() {
                            return that.$router.push("/cart")
                        },
                    });
                    // return this.$router.go(-1)
                }
                
            })
        },
        // 创建订单
        create_order(){

            if(this.loading){
                return this.$message.error('请耐心等待，不要重复下单');
            }

            let params = {
                params:this.$route.params.params,
                address_id:this.address_id,
                coupon_id:this.order.coupon.coupon_id,
                remark:this.remark,
            }
            this.loading = true;
            this.$post(this.$api.homeOrder+'/create_order',params).then(res=>{
                if(res.code == 200){
                    let str = window.btoa(JSON.stringify(res.data)); 
                    this.$router.push("/order/order_pay/"+str);
                }else{
                    this.$message.error(res.msg);
                }
                this.loading = false;
                
            });
        }
    },
    created() {
        this.onload();
    },
    mounted() {

    },
    beforeDestroy(){
        if(this.modal != null){
        this.modal.destroy();
        }
         
    }
};
</script>
<style lang="scss" scoped>
.create_order_1{
    padding:0 0 50px 0
}
.step_bar{
    margin:40px 0;
}
.block{
    .title{
        font-size: 16px;
        clear: both;
        font-weight: bold;
        padding-bottom: 20px;
        a{
            float: right;
            font-size: 14px;color: #4bb16f;
        }
    }
    .store_list{
        margin-top: 20px;
        .og_list{
            margin-top: 20px;
            color: #666;
            font-size: 12px;
            border: 1px solid #efefef;
            padding: 20px 0;
            line-height: 40px;
            li{
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #efefef;
                &:last-child{
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }
            .red{
                color:#ca151e;
                font-weight: bold;
            }
            dl{
                &:after{
                    clear:both;
                    display: block;
                    content:''
                }
                dt{
                    width: 40px;
                    height: 40px;
                    display: block;
                    float: left;
                    background: #f8f8f8;
                    margin-right: 15px;
                    margin-left: 20px;
                    border:1px solid #efefef;
                    img{
                        margin:0;
                        width: 100%;
                        height: 100%;
                        border-radius: 0;
                        vertical-align:unset;
                    }
                }
                dd{
                    float: left;
                    width: 400px;
                    height: 40px;
                    text-overflow: hidden;
                    line-height: 20px;
                }
            }
            .goods_info_th{
                text-indent: 20px;
            }
        }
        .store_title{
            img{
                width: 35px;
                height: 35px;
                margin-right: 10px;
                margin-left: 20px;
                border-radius: 50%;
            }
            span{
                line-height: 35px;
            }
        }
    }
    .sum_block{
        width: 340px;
        float: right;
        padding: 20px;
        .sum_block_item{
            height:30px;line-height: 30px;
            color: #666;
        }
        .label{
            float:left;
            width: 150px; text-align: right;
        }
        
        .con{
            float:left;
            width: 150px;
            text-align: right;
        }
       
     
    }
     .total-box{
              background-color: #f2f2f2;
         padding: 10px 20px;
        .total{
            width: 300px;
            float: right;
            line-height: 40px;
            span{
                font-size: 24px;
                color: #ca151e;
                
            }
            .label{
                float:left;
                width: 150px; text-align: right;
            }
            
            .con{
                float:left;
                width: 150px;
                text-align: right;
            }
        
         } 
         .nowaddress{
            width: 100%;
            float: right;
            line-height: 40px;
            text-align: right;
            color: #666;
         } 
        }
       .submitBtn{
            background: #ca151e;
            color:#fff;
            border-radius: 3px;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            display: block;
            float:right;
            cursor: pointer;
            margin:20px 0;
            &.hide{
                background: #ccc;
                cursor: not-allowed;
                color:#666;
            }
            &:hover{
                opacity: 0.8;
            }
        }
    .goods_th{
        background: #f2f2f2;
        line-height: 40px;
        text-indent: 20px;
    }
    .remark{
        margin-top: 40px;
        .remark_input{
            margin:20px 0;
            textarea{
                border-color:#cfcfcf;
                outline: none;
                border-radius: 4px;
                padding:8px;
                height: 100px;
                resize:none
            }
        }
    }
    .empty_address{
        margin-bottom: 80px;
        line-height: 100px;
        border: 3px solid #efefef;
        border-radius: 3px;
        text-align: center;
        width: 292px;
        height: 105px;
        a{
            font-weight: bold;
            color:#ca151e;
        }
    }
    .address_list{
        margin-bottom: 30px;
        ul{
            &:after{
                clear:both;
                content:'';
                display: block;
            }
            li{
                cursor: pointer;
                float: left;
                box-sizing: border-box;
                width: 292px;
                height: 105px;
                border-radius: 3px;
                border: 2px solid #efefef;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 20px;
                position: relative;
                color:#666;
                &:nth-child(4n){
                    margin-right: 0;
                }
                .receive_name{
                    margin-bottom: 10px;
                    font-weight: bold;
                    line-height: 18px;
                    color:#333;
                    span{
                        font-weight: normal;
                    }
                }
                .cmarker{
                    position: absolute;
                    right: -10px;
                    bottom: -17px;
                    font-size: 30px;
                    color:#333;
                }
                &.red{
                    border-color:#1c8d44;
                    .cmarker{
                        color:#4bb16f;
                    }
                }
            }
        }
    }
 
}
</style>