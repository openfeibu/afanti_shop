<template>
    <div class="user_order">
        <div class="user_main">
            <div class="block_title">
                我的订单
            </div>
            <div class="x20"></div>
              <div class="order_status_block">
                <ul>
                    <li :class="{'active':params.type == 'all' }" @click="changeType('all')">
                        
                        <!-- <a-font type="icondengdingdan"></a-font> -->
                        <span><a-badge :offset="[0,0]">全部</a-badge></span>
                     
                    </li>
                    <li :class="{'active':params.type == 'payment' }" @click="changeType('payment')">
                        
                        <a-font type="icondengdaifh"></a-font>
                        <span><a-badge >待支付</a-badge></span>
                     
                    </li>
                    <li :class="{'active':params.type == 'delivery' }" @click="changeType('delivery')">
                     
                        <a-font type="iconwuliu"></a-font>
                        <span><a-badge >待发货</a-badge></span>
                     
                    </li>
                    <li :class="{'active':params.type == 'received' }" @click="changeType('received')">

                        <a-font type="iconchanpin1"></a-font>
                        <span><a-badge >待收货</a-badge></span>
                      
                    </li>
                    <li :class="{'active':params.type == 'comment' }" @click="changeType('comment')">
                        <a-font type="iconpinglun"></a-font>
                        <span><a-badge >待评论</a-badge></span>
                      
                    </li>
                    <li>
                        <router-link :to="{name:'home_user_order_refund'}">
                        <a-font type="iconshouhou"></a-font>
                        <span><a-badge >售后处理</a-badge></span>
                        </router-link>
                    </li>
                </ul>
            </div>
         

            <div class="safe_block" >
              <div class="order_list" v-if="list.length>0">
                <div class="order_item clearfix" v-for="(v,k) in list" :key="k">
                    <div class="order_item_title">
                        <span>{{v.created_at}}<font :color="v.order_status==6?'#42b983':'#ca151e'">{{v.order_status_cn||'-'}}</font></span>
                        订单号：{{v.order_no||'-'}} <b v-if="v.order_source != 'common'" :class="{'bargain':v.order_source == 'bargain','collective':v.order_source == 'collective','seckill':v.order_source == 'seckill'}">{{v.order_source_text}}</b>
                    </div>
                    <div class="order_item_list"  @click="$router.push('/user/order/'+v.id)">
                        <ul>
                            <li v-for="(vo,key) in v.order_goods" :key="key"><router-link to="">
                                <div class="order_thumb"><img :src="vo.goods_image||require('@/asset/order/default.png')" :alt="vo.goods_name"></div>
                                <div class="order_list_title">{{vo.goods_name||'-'}}</div>
                                <div class="order_list_attr">{{vo.sku_name||'-'}}</div>
                                <div class="order_list_num">x {{vo.buy_num||'1'}}</div>
                                <div class="order_list_price">￥{{vo.total_price||'0.00'}}</div>
                            </router-link></li>
                        </ul>
                    </div>
                    <div class="order_item_btn" v-if="v.order_status!= 20">
                        <!-- 未支付取消订单 -->
                        <div class="default_btn" v-if="v.pay_status==10" @click="cancel(v.id)">取消订单</div>
                        <!-- 已支付取消订单 -->
                        <template v-if="v.order_status!= 21">
                            <div class="default_btn" v-if="v.pay_status==20 && v.delivery_status==10" @click="cancel(v.id)">申请取消</div>
                        </template>
                        <template v-else>
                            <div class="default_btn">等待商家确认取消</div>
                        </template>
                        <div class="success_btn" v-if="v.pay_status==10" @click="pay_order(v.id)">立即支付</div>
                        <div class="error_btn" v-if="v.delivery_status ==20 && v.receipt_status == 10" @click="receipt(v.id)">确定收货</div>
                        <div class="gray_btn" v-if="v.order_status ==30 && v.is_comment==0" @click="$router.push('/user/comment/add/'+v.id)">前往评论</div>
                    </div>

                </div>
                <div class="fy" v-if="total>0">
                    <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
                </div>
            </div>
            <div style="min-height:600px;padding-top:100px" v-else>
                <a-empty />
            </div>
            </div>
        </div>

        <!-- 物流 -->
        <a-modal v-model="visible" title="物流信息" :footer="null">
            <a-timeline v-if="order_info.delivery_list.length>0">
                <a-timeline-item  v-for="(v,k) in order_info.delivery_list" :key="k" :color="k==0?'red':'gray'">
                <p>{{v.context+' '+v.time}}</p>
                </a-timeline-item>
            </a-timeline>
            <a-empty v-else />
        </a-modal>
       <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
import adminSearch from '@/components/admin/search'
export default {
    components: {adminSearch},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:20,
              type:'',
          },
          total:0, //总页数
          list:[],
          searchConfig:[
              {label:'订单号',name:'order_no',type:'text'},
              {label:'订单状态',name:'type',type:'select',data:[
                  {label:'全部订单',value:'all'},
                  {label:'待支付',value:'payment'},
                  {label:'待发货',value:'delivery'},
                  {label:'待收货',value:'received'},
                  {label:'待评价',value:'comment'},
                 
              ]},
          ],
          order_info:{
              delivery_list:[],
          },
          visible:false,
          isLoading:true,
      };
    },
    watch: {},
    computed: {},
    methods: {
        // 选择分页
        onChange(e){
            this.params.page = e;
            this.onload();
        },
        search(params){
            this.onload();
        },
        onload(){
            this.isLoading = true;
            var type = this.params.type;
            if(type == ''){
                if(!this.$isEmpty(this.$route.params.type)){
                    this.params.type = this.$route.params.type;
                }else{
                     this.params.type = 'all';
                }
            }
            
            // console.log(this.params.type)
            this.$get(this.$api.homeOrder,this.params).then(res=>{
                this.list = res.data.data;
                this.total = res.data.total;
                 this.isLoading = false;
            })
        },
        get_order_info(id){
            this.$get(this.$api.homeOrder+'/get_order_info/'+id).then(res=>{
                this.visible = true;
                this.order_info = res.data;
            })
        },
        pay_order(order_id){
            let str = window.btoa(JSON.stringify({order_id:[order_id]})); 
            this.$router.push("/order/order_pay/"+str);
        },
        edit_order_status(id,order_status=0){
            this.$put(this.$api.homeOrder+'/'+'edit_order_status',{id:id,order_status:order_status}).then(res=>{
                this.onload();
                return this.$returnInfo(res)
            })
        },
        cancel(id){
            var id= id;
            var that = this;
            this.$confirm({
                title: '是否确定取消该订单',
                content: '',
                onOk() {
                    that.isLoading = true;
                    that.$put(that.$api.homeOrder+'/'+'cancel',{id:id}).then(res=>{
                        that.onload();
                        return that.$returnInfo(res)
                     })
                },
                onCancel() {
                console.log('Cancel');
                },
                class: 'test'
            });
            
         
        },
        receipt(id){
            var id= id;
            var that = this;
             this.$confirm({
                title: '是否确定收货？',
                content: '',
                onOk() {
                    that.isLoading = true;
                     that.$put(that.$api.homeOrder+'/'+'receipt',{id:id}).then(res=>{
                        that.onload();
                        return that.$returnInfo(res)
                    })
                },
                onCancel() {
                console.log('Cancel');
                },
                class: 'test'
            });
           
        },
        changeType(type){
            this.params.type=type;
            this.onload();
        }
    },
    created() {
        this.onload()
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.order_list{
    .order_item{
        margin-bottom: 20px;
    }
    .order_item_btn{
        text-align: right;
        margin-top: 10px;
        height: auto;
    }
}

.order_item_title{
    background: #f6f6f6;
    line-height: 40px;
    padding: 0 15px;
    color: #666;
    span{
        float: right;
        font-size: 12px;
        font{
            margin-left:15px;
        }
       
    }
     b{
        background: #FF463C;
            padding: 5px 10px;
            color: #fff;
            font-size: 12px;
            border-radius: 5px;
        &.collective{
           background: #FF463C; 
        }
        &.seckill{
           background: #4bb16f; 
        }
        &.bargain{
           background: #f39701; 
        }
    }
}
.order_status_block{
    background: #fff;
    // padding: 20px;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
    ul{
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        li{
            position: relative;
            cursor: pointer;

            &:first-child i{
                font-weight: bold;
                font-size: 26px;
            }
            &:nth-child(1) i{
                top:-2px; left :30px;
            }
            &:nth-child(2) i{
                top:0px; left :30px;
            }
             &:nth-child(3) i{
                 left :28px;
                 top:0px;
            }
             &:nth-child(4) i{
                top:1px;
                left :30px;
            } 
            &:nth-child(5) i{
                top:1px;
                left :30px;
            }
            &:nth-child(6) i{
                top:1px;
                left :22px;
            }
            float: left;
            text-align: center;
            width: 150px;
            i{
                position: absolute;
                font-size: 22px;
                margin-right: 4px;
                left :34px;
            }
            &:hover{
                color: #ca151e;
            }
            &.active{
                color: #ca151e;
            }
        }
    }
}
.order_item_list{
    ul li{
        padding:20px 15px;
        border-top: 1px solid #efefef;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        &:last-child{
            border-bottom: 1px solid #efefef;
        }
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        .order_thumb{
            width: 42px;
            height: 42px;
            background: #efefef;
            border:1px solid #efefef;
            box-sizing: border-box;
            float: left;
            margin-right: 15px;
            img{
                width: 40px;
                height: 40px;
            }
        }
        .order_list_title{
            width: 280px;
            float: left;
            font-size: 12px;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
        }

        .order_list_attr{
            float: left;
            text-align: center;
            width: 190px;
            line-height: 40px;
        }
        .order_list_num{
            float: left;
            text-align: center;
            width: 140px;
            line-height: 40px;
        }
        .order_list_price{
            float: right;
            color:#ca151e;
            text-align: center;
            width: 90px;
            line-height: 40px;
            // font-weight: bold;
        }
    }
}

</style>