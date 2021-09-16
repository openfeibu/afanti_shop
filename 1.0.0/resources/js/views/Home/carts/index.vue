<template>
    <div class="create_order_1 w1200">
        <div class="step_bar">
            <div class="step">
                <div class="item check"><a-icon type="shopping-cart" />我的购物车</div>
                <div class="item"><a-icon type="car" />物流地址</div>
                <div class="item"><a-icon type="account-book" />选择支付</div>
                <div class="item"><a-icon type="check-circle" />支付成功</div>
            </div>
        </div>

        <div class="cart_th" >
            <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">全选</a-checkbox>
            <span class="goods">商品</span>
            <span class="attr">规格</span>
            <span class="price">单价（元）</span>
            <span class="num">数量</span>
            <span class="total">小计</span>
            <span class="handle">操作</span>
        </div>

        <div class="cart_table" >
            <div class="store_list" v-for="(v,k) in list" :key="k">
                <div class="store_title"><a-checkbox :indeterminate="v.css" :checked='v.checked' @change="onCheckAllStoreChange(k)">{{v.store_name}}</a-checkbox><span class="open_store" @click="$router.push('/store/'+v.store_id)">进入展馆</span></div>
                <div class="goods_list" >
                    <ul>
                        <li v-for="(vo,key) in v.cart_list" :key="key" :class="{'active' : vo.checked}">
                            <span class="checkbox_goods"><a-checkbox :indeterminate="false" :checked='vo.checked' @change="onChange(k,key)" /></span>
                           
                            <dl class="goods_item">
                                 <router-link :to="'/goods/'+vo.goods_id">
                                    <dt><img :src="vo.goods_image||require('@/asset/order/default.png')" :alt="vo.goods_name"></dt>
                                    <dd>{{vo.goods_name}}</dd>
                                  </router-link>
                            </dl>
                          
                            <span class="attr">{{vo.sku_name||'-'}}</span>
                            <span class="price">￥{{vo.goods_price}}</span>
                            <span class="num">
                                <font @click="edit(vo.cart_id,0,k,key)"><a-icon type="minus" /></font>
                                <input type="text" disabled v-model="vo.buy_num">
                                <font @click="edit(vo.cart_id,1,k,key)"><a-icon type="plus" /></font>
                            </span>
                            <span class="total">￥{{$formatFloat(vo.goods_price*vo.buy_num,2)}}</span>
                            <span class="handle" @click="del(vo.cart_id)">移除</span>
                        </li>
                    </ul>
                </div>
            </div>
           
        </div>


        <div  id="cart_footer" class="cart_footer" :class="{'active' : fixed}" >
            <div class="w1200">
            <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">全选</a-checkbox>
            
            <span class="total" >已选择 <font color="#ca151e">{{allCount}}</font> 件，总计 <font color="#ca151e">{{$formatFloat(allPrice)}} </font>元</span>
            <span class="handle" style="width:140px;"><div class="error_btn" :class="{'active' : allCount > 0 }" @click="buy">结算</div></span>
            </div>
        </div>

        <!-- <div style="min-height:600px;padding-top:100px" v-else>
            <a-empty />
        </div> -->
        
        <loading v-if="isLoading" ></loading>


    </div>
</template>

<script>

export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
             
          },
          list:[],
          indeterminate:false,
          checkAll:false,
          allCount:0,// 选中商品数量
          allPrice:0.00,// 选中商品价格
          isLoading:true,
          cartFooterTop:0,
          fixed:false,
          clickId:null,
          clickTimer:null
          
      };
    },
    watch: {},
    computed: {},
    methods: {
        onload(){
            
            this.$get(this.$api.homeCarts,this.params).then(res=>{
                console.log(res.data.data)
                this.params.total = res.data.total;
                this.params.per_page = res.data.per_page;
                this.params.current_page = res.data.current_page;
                this.list = res.data.data;
                // this.list.forEach(item=>{

                // })
                this.isLoading = false;
                this.scrollFun()
            })
        },
       scrollFun(){
           let that = this;
           window.onscroll = function(){
               if(that.cartFooterTop == 0){
                  that.cartFooterTop  =  document.getElementById("cart_footer").offsetTop;
         
               }
               let scrollTop = document.documentElement.scrollTop;
               let bodyHeight = document.documentElement.clientHeight;
            //    console.log(scrollTop+ bodyHeight )
            //    console.log(that.cartFooterTop )
                
               if(scrollTop+ bodyHeight >=  that.cartFooterTop ){
                  that.fixed = false;
               }else if( that.fixed == false){
                   that.fixed = true;
               }
           }
           
       },
        del(id){
                let that= this;
                that.$confirm({
                    title: '是否要删除该商品',
                    content: '',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                         that.$delete(that.$api.homeCarts+'/'+id).then(res=>{
                            that.onload();
                            that.cart_count();
                            return that.$returnInfo(res);
                        })
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                });
                
           
        },
        edit(id,type,k,key){
            let that = this;
            if(id == that.clickId){
                //同个商品点多次
                clearTimeout(that.clickTimer);
            }else{
                that.clickId = id;
            }
            let Num = that.list[k].cart_list[key].buy_num ;
            if(type == 1){
                console.log(parseInt(that.list[k].cart_list[key].goods_stock))
                if(Num+1 > parseInt(that.list[k].cart_list[key].goods_stock)){
                     return this.$message.error('库存不足');
                   
                }
                that.list[k].cart_list[key].buy_num += 1
            }else if (type == 0){
                if(Num-1 == 0){
                     return this.$message.error('最低购买数量为1');
                   
                }
                that.list[k].cart_list[key].buy_num -= 1
            }   
            that.onCheckConst();
            that.clickTimer = setTimeout(function(){
                that.$put(that.$api.homeCarts+'/'+id,{buy_num:that.list[k].cart_list[key].buy_num}).then(res=>{
                    // that.onload();
                    that.cart_count();
                    
                    
                })
            },500)
            return false;

            this.$put(this.$api.homeCarts+'/'+id,{is_type:type,buy_num:1}).then(res=>{
                this.onload();
                this.cart_count();
                return this.$returnInfo(res);
            })
        },
        cart_count(){
            this.$get(this.$api.homeCarts+'/cart_count').then(res=> {
                if(res.code == 200){
                    this.$store.dispatch('homeCart/set_cart_num',res.data);
                }
            });
        },
        onChange(k,key){
            this.$set(this.list[k].cart_list[key],'checked',!this.list[k].cart_list[key].checked)
            let count = 0;
            this.list[k].cart_list.forEach(item=>{
                if(item.checked){
                    count++;
                }
            })
            // console.log(count,this.list[k].cart_list.length);
            if(count==this.list[k].cart_list.length){
                this.$set(this.list[k],'css',false);
                this.$set(this.list[k],'checked',true);
                
            }else if(count==0){
                this.$set(this.list[k],'css',false);
                this.$set(this.list[k],'checked',false);
            }else{
                this.$set(this.list[k],'css',true);
                this.$set(this.list[k],'checked',false);
            }

            this.onCheckConst();
        },
        onCheckAllStoreChange(k){
            this.list[k].css = false;
            this.list[k].checked = !this.list[k].checked;
            this.list[k].cart_list.forEach(item=>{
                item.checked = this.list[k].checked;
            })
            this.onCheckConst();
        },
        onCheckAllChange(){
            this.indeterminate = false;
            let checkAll = !this.checkAll;
            this.checkAll = checkAll;
            this.list.forEach(item=>{
                item.checked = checkAll;
                item.cart_list.forEach(item2=>{
                    item2.checked = checkAll;
                })
            })
            this.onCheckConst();
        },
        // 最外层checkbox状态修改 加上统计数据价格商品数量
        onCheckConst(){
            this.allPrice = 0;
            let allCount = 0;
            let all = 0;
            this.list.forEach(item=>{
                item.cart_list.forEach(item2=>{
                    all++;
                    if(item2.checked){
                        this.allPrice += item2.buy_num*item2.goods_price;
                        allCount++;
                    }
                })
            })
            if(allCount == all){
                this.indeterminate = false;
                this.checkAll = true;
            }else if(allCount==0){
                this.indeterminate = false;
                this.checkAll = false;
            }else{
                this.indeterminate = true;
                this.checkAll = false;
            }
            this.allCount = allCount;
            this.allPrice = this.$formatFloat(this.allPrice);
        },
        // 立即购买
        buy(){
            let params = {
                order:[],
                ifcart:1, // 是否购物车
            };
            this.list.forEach(item=>{
                item.cart_list.forEach(item2=>{
                    if(item2.checked){
                        params.order.push(
                            {
                                goods_id:item2.goods_id, // 商品ID
                                sku_id:item2.sku_id, // SKUid 没有则为0
                                buy_num:item2.buy_num, // 购买数量
                                cart_id:item2.cart_id, // 购物车ID
                            },
                        );
                    }
                })
            })
            this.cart_count();
            let str = window.btoa(JSON.stringify(params)); 
            this.$router.push("/order/create_order/"+str);
        },
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.goods_list{
 
    .goods_item{
        float: left;
        dt{
            width: 80px;
            height: 80px;
            background: #efefef;
            margin:0 20px;
            border-radius: 2px;
            float: left;
            img{
                width: 80px;
                height: 80px;
                border-radius: 2px;
            }
        }
        dd{
            width: 300px;
            float: left;
        }
    }
    ul{
        margin-top:15px;
    }
    ul li{
        border:1px solid #efefef;
        padding-left: 20px;
        height: 120px;
        border-bottom: none;
        box-sizing: border-box;
        padding-top: 10px;
        &:last-child{
            border-bottom: 1px solid #efefef;
        }
           &.active{
        background-color: #f5fff9;
    }
        span{
            float: left;
        }
        .checkbox_goods{
            margin-top: 8px;
        }
        .attr{
            width: 120px;
            text-align: center;
        }
        .price{
            width: 130px;
            text-align: center;
        }
        .num{
            width: 140px;
            text-align: center;
            &:after{
                content:'';
                clear:both;
                display: block;
            }
            font{
                padding: 4px 12px;
                color: #666;
                float: left;
                border: 1px solid #efefef;
                float: left;
            }
            input{
                border:1px solid #efefef;
                height: 32px;
                width: 50px;
                outline: none;
                text-align: center;
                float: left;
                margin:0 5px;
            }
        }
        .total{
            width: 150px;
            text-align: center;
            font-weight: bold;
        }
        .handle{
            width: 80px;
            text-align: center;
            color:#ca151e;
            cursor: pointer;
        }
    }
}
.store_list{
    padding:0px 20px;
    margin-bottom: 20px;
    .open_store{
        border:1px solid #ca151e;
        border-radius: 3px;
        color:#ca151e;
        margin-left: 15px;
        padding:2px 10px;
        font-size: 12px;
        cursor: pointer;
    }
}
.cart_table{
    margin:20px;
}
.step_bar{
    margin:40px 0;
}
.cart_th{
    background: #f5f5f5;
    padding:10px 20px;
    .goods{
        width:470px;
        padding-left: 120px;
    }
    .price{
        width: 110px;
    }
    .attr{
        width: 110px;
    }
    .num{
        width: 80px;
        padding-left: 20px;
    }
    .total{
        width: 160px;
    }
    .handle{
        text-align: center;
    }
    span{
        width: 120px;
        display: inline-block;
    }
}
.cart_footer{
    background: #f5f5f5;
    padding:10px 20px;
    height: 60px;
    line-height: 40px;
    .total{
        float: left;
        width: 950px;
        text-align: right;
    }
    .handle{
        text-align: center;
        height: 40px;
        float: left;
        .error_btn{    height: 40px;
                display: block;
                width: 100px;
                float: right;
                line-height: 40px;
                padding: 0;
                text-align: center;
                font-size: 16px;
                background: #8a8585;
                &.active{
                    background: #e43838;
                }
            }
    }
    .ant-checkbox-wrapper{float: left;}
    &.active{
          position: fixed;bottom: 0;left:0;
    width: 100%;
    }
  
}
</style>