<template>
    <div class="goods_info_temp">
        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item><router-link to="/bargain">砍价专区</router-link></a-breadcrumb-item>
                <a-breadcrumb-item>{{goods_info.goods_name}}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>

        <div class="goods_info_top w1200">
            <div class="goods_info_top_left" >
                <div class="goods_image_item">
                    <pic-zoom :url="goods_info.goods_images[chose_img_pos]" :highUrl="goods_info.goods_images[chose_img_pos]"></pic-zoom>
                </div>
                <div class="goods_info_title">
                    <!-- <span>{{store_info['store_name']}}</span> -->
                    <b>{{goods_info.goods_name}}  </b>
                    <p>{{goods_info.goods_subname}}</p>
                </div>
                <!-- <div class="pic_zoom_list">
                    <div class="pic_zoom_list_left" @click="pre_img()">
                        <a-icon type="left" />
                    </div>
                    <ul>
                        <li v-for="(v,k) in goods_info.goods_images" :key="k" @click="click_silde_img(k)" :class="chose_img_pos==k?'border_color':''"><img :src="v" alt=""></li>
                    </ul>
                    <div class="pic_zoom_list_right" @click="next_img()">
                        <a-icon type="right" />
                    </div>
                </div> -->
            </div>
            <div class="goods_info_top_right" >
                    <div class="kanjia-user">
                        <div class="img"><img :src="bargain_task.user.avatar || require('@/asset/pc/portrait.jpg')" alt="" /></div>
                        <div class="test">{{bargain_task.user.username}}</div>
                        <div class="des">“朋友一生一起走，帮砍一刀有没有”</div>
                    </div>
                    <div class="goods_info_active">
                     <div class="goods_skill" v-if="bargain.status == 0" >
                        <span><a-icon type="history" /></span>
                        <span>砍价活动</span>
                        <span class="span_time">距离结束 {{seckills.format_time}}</span>
                    </div>
                 </div>
                <div class="goods_info_group">

                        <div class="goods_info_price"><span>底价：</span>￥{{$formatFloat(bargain.floor_price)||'0.00'}}</div>
                        <div class="goods_info_market_price"><span>市场价：</span><div class="overx_goods_info">￥{{goods_info.goods_market_price||'0.00'}}</div></div>
            
                        <div class="goods_info_speed_box">
                            <div class="goods_info_speed_box_ed" :style="{width:(bargain_task.cut_money/(bargain_task.goods_price - bargain_task.floor_price))*100+'%'}"></div>
                        </div>
                        <div class="kanjia-price" v-if="bargain_task.surplus_money != 0">
                            已砍<span>{{bargain_task.cut_money}}</span>元，还需{{bargain_task.surplus_money}}元
                        </div>
                        <div class="kanjia-price" v-else>
                            <span>已砍价完成</span>
                        </div>
               
                </div>

             

             
                <div class="goods_info_btn">
                        <div v-if="is_creator && !bargain_task.is_floor || !is_creator && is_cut " class="goods_info_buy" style="background:#fe0851" @click="invitation()">邀请朋友砍价</div>
                        <div  v-else-if="is_creator && bargain_task.is_floor"  class="goods_info_buy" style="background:#fe0851" @click="bargain_buy()">已砍完,立即{{$formatFloat(bargain.floor_price)}}元购买</div>
                        <div  v-else-if="!is_creator && bargain_task.is_floor"  class="goods_info_buy" style="background:#fe0851" >商品已砍完,我也要去砍价</div>
                        <div v-else class="goods_info_buy" style="background:#fe0851" @click="bargaining()">帮朋友砍一刀</div>
                        <div v-if="!is_creator && is_cut" class="des">你已帮朋友砍了<span>1刀</span></div>
                        <div  class="goods_info_buy" ><router-link :to="'/goods/'+bargain_task.goods_id">原价购买</router-link></div>

                </div>

            </div>
            <div class="clear"></div>
        </div>
        <div class="goods_info_content w1200">
           <div class="left_item team" >
               <div class="t">砍价记录</div>
               <ul v-if="bargain_task_help_list.length !=0">
                   <li  class="clear" v-for="(v,k) in bargain_task_help_list" :key="k" >
                       <div class="img"><img :src="v.user.avatar" alt="" /></div>
                        <div class="test">{{v.user.username}}</div>
                        <div class="cut">砍{{v.cut_money}}</div>
                   </li>
               </ul>
            </div>
            <div class="right_item tablist" >
                <div class="t">砍价说明</div>
               1、砍价活动说说明

                砍价活动是设置商城中的商品进行设置的砍价活动，只有参与砍价商品链接，发起砍价活动的会员只能自己砍一次，亲友团可砍多次（根据设置的每人砍价次数），亲友团也可发起砍价再次邀请亲友团砍价，扩大了商城推广的范围，有效提升商城的会员量，继而提高商城的销售量。

                2、砍价活动商品参与条件

                a.不能参与砍价活动的商品：拼团添加的商品、启用多规格的商品

                b.可以参与砍价活动的商品：商城添加的未启用多规格的所有商品

                3、砍价活动邀请亲友团

                邀请亲友团两种方式：

                a.复制链接邀请亲友团助阵，根据成为下线条件即可确定上下线关系。

                b.点击发送给朋友，根据成为下线条件即可确定上下线关系。

                 <div v-html="goods_info.goods_content||''"></div>
            </div>
            <div class="clear"></div>
        </div>

        <a-modal
            title="点击下方进行分享"
            cancelText=""
            okText="确认"
            :visible="modal"
            closable="false"
            @ok="modalOk"
            @cancel="modalCancel"
           okType="danger"
            >
            <vshare  :vshareConfig="vshareConfig"></vshare>
        </a-modal>
        <div class="kanjia_success" v-if="kanjia_modal">
            <div class="kanjia_success_box">
                <p>砍价成功<br>帮朋友成功砍了<span>{{friend_cut_money}}</span>元</p>
                <div @click="kanjiaSuccess" class="kanjia_close">X</div>
            </div>
        </div>
     

        <loading v-if="isLoading"></loading>
        
    </div>
</template>

<script>

import PicZoom from '@/components/home/goods/vue-piczoom.vue' // 放大镜组件 
import vshare from 'vshare' // 放大镜组件 
export default {
    components: {PicZoom,vshare},
    props: {},
    data() {
      return {
          goods_info:{
              goods_images_thumb_600:[],
              goods_images_thumb_150:[],
              goods_images:[],
              sale_list:[],
              user:{}
          },
           bargain:{
              floor_price:"",
              user:{}
          },
          bargain_task:{
              floor_price:"",
              user:{}
          },
         bargain_task_help_list:[
             {user:{}}
         ],
          rate_info:{},
        
          chose_img_pos:0,
          chose_spec:[],
          seckills:{},
          isLoading:true,
         href:"",
         modal:false,
         kanjia_modal:false,
         friend_cut_money:0,
          vshareConfig: {
                shareList: ['copy',
                            'qzone',
                            'sqq',
                            'weixin'],
                common : {
                    //此处放置通用设置
                    bdText:"帮我砍一砍",
                    bdDesc:"帮我砍一砍",
                    bdUrl:''
                },
                share : [{
                    bdSize:'32'
                    }
                ],
                slide : [
                    //此处放置浮窗分享设置
                ],
                image : [
                    //此处放置图片分享设置
                ],
                selectShare : [
                    //此处放置划词分享设置
                ]
            }
        
      };
    },

    computed: {},
    methods: {
        get_goods_info(){
            var that = this;
            this.$get(this.$api.getBargainTasks+'/'+this.bargain_task_id).then(res=>{
                if(res.code == 200){
                    this.goods_info = res.data.goods;
                    this.bargain_task_help_list = res.data.bargain_task_help_list;
                    this.bargain_task = res.data.bargain_task;
                    this.bargain = res.data.bargain;
                    this.is_creator = res.data.is_creator;
                    this.is_cut = res.data.is_cut;
                    // this.seckills = res.data.bargain_task.end_time; // 秒杀
                    this.seckills = {'end_time':res.data.bargain_task.end_time}
                    this.timing(this.seckills); // 倒计时
                    if(this.bargain.status == 1 && this.bargain.is_buy == 1){
                        //结束
                        this.$info({
                            title: '该商品活动已结束',
                            content: '',
                            onOk() {
                                that.$router.push("/bargain");
                            },
                        });
                   
                    }

                }else{
                    this.$message.error(res.msg);
                    // this.$router.go(-1);
                }
                 this.isLoading = false;
            })
        },
        // 定时器
        timing(market){
            if(market){
                let obj = setInterval(()=>{
                   
                    let timeVal = moment(market.end_time).format('X') - moment().format('X');
                    //  console.log(timeVal)
                    // 时间戳转换
                    var d = Math.floor(timeVal / (24 * 3600));
                    var h = Math.floor((timeVal - 24 * 3600 * d) / 3600);
                    var m = Math.floor((timeVal - 24 * 3600 * d - h * 3600) / 60);
                    var s = Math.floor((timeVal - 24 * 3600 * d - h * 3600 - m * 60));
                    // console.log(d + '天' + hh + '时' + mm + '分' + ss + '秒'); // 打印出转换后的时间
                    //  当时分秒小于10的时候补0
                    var hh = h < 10 ? '0' + h : h;
                    var mm = m < 10 ? '0' + m : m;
                    var ss = s < 10 ? '0' + s : s;
                    // this.seckills.format_time =  d + '天' + hh + '时' + mm + '分' + ss + '秒';
                    this.$set(this.seckills,'format_time',d + ' 天 ' + hh + ' 时 ' + mm + ' 分 ' + ss + ' 秒')
                 
                    if(moment(market.end_time).valueOf()<moment().valueOf()){
                        clearInterval(obj);
                        // this.$router.go(0);
                    }
                },1000)
            }
            
        },

        //邀请好友
        invitation(){
          
            this.modal = true;

        },
        //帮朋友砍价
        bargaining(){ 
            this.isLoading = true;
            this.$post(this.$api.BargainsHelpCut+'/'+this.bargain_task_id).then(res=>{
                if(res.code == 200){
                    
                    this.friend_cut_money = res.data.cut_money;
                    this.kanjia_modal = true;

                }else{
                    this.$message.error(res.msg);
                    // this.$router.go(-1);
                }
                 this.isLoading = false;
            })
        },
        kanjiaSuccess(){
            this.$router.go(0);
        },
        modalCancel(){
            this.modal = false;

        },
        // 立即购买
        buy(){
            let params = {
                order:[
                    {
                        goods_id:this.goods_info.id, // 商品ID
                        sku_id:this.sku_id, // SKUid 没有则为0
                        buy_num:this.buy_num, // 购买数量
                        collective_active_id:this.collective_active_id, // 拼团ID
                    },
                ],
                ifcart:0, // 是否购物车
                is_collective: this.is_collective,
            };

            // 恢复 collective_active_id
            this.collective_active_id = 0

            let str = window.btoa(JSON.stringify(params)); 
            this.$router.push("/order/create_order/"+str);
        },
         // 砍价立即购买
        bargain_buy(){
            let params = {
                order:[],
                bargain_task_id :this.bargain_task_id,
                ifcart:0, // 是否购物车，
                order_source: 'bargain',
            };

            let str = window.btoa(JSON.stringify(params));
            this.$router.push("/order/create_order/"+str);
        },
      
 
        // 存储数据记录
        save_history_fun:function(goods_info){
            this.save_history=false;
            let goods_json = localStorage.getItem('shop_goods_historys');
            let goods_list = [];

            if(!this.$isEmpty(goods_json)){
                goods_list = JSON.parse(goods_json);
            }
            
            let have_his = false;
            if(goods_list.length>0){
                goods_list.forEach(res=>{
                    if(goods_info.id == res.id){
                        res.goods_name = goods_info.goods_name;
                        res.image = goods_info.goods_master_image;
                        res.id = goods_info.id;
                        res.goods_price = goods_info.goods_price;
                        have_his = true;
                    }
                })
            }
            
            if(!have_his){
                goods_list.push({id:goods_info.id,goods_name:goods_info.goods_name,goods_price:goods_info.goods_price,image:goods_info.goods_master_image});
            }

            if(goods_list.length>4){
                goods_list.splice(0,1);
            }

            let json_str = JSON.stringify(goods_list);
            localStorage.setItem('shop_goods_historys',json_str);

        },
        pre_img:function(){
            if(this.chose_img_pos<=0){
                this.chose_img_pos = this.goods_info.goods_images.length-1;
            }else{
                this.chose_img_pos -= 1;
            }
        },
        next_img:function(){
            if(this.chose_img_pos>=this.goods_info.goods_images.length-1){
                this.chose_img_pos = 0;
            }else{
                this.chose_img_pos += 1;
            }
        },
        // 点击缩略图幻灯片图片
        click_silde_img:function(e){
            this.chose_img_pos = e;
        },

        goods_fav(){
            if(this.isFav){
                return this.del_fav(this.goods_info.id);
            }else{
                return this.add_fav(this.goods_info.id);
            }
        },
    },
    created() {
        sessionStorage.setItem('token_type', 'bargain_task_id');
        this.bargain_task_id = this.$route.params.id;
        this.vshareConfig.common.bdUrl = window.location.host;
        this.get_goods_info();

    },
    mounted() {},
   
};
</script>
<style lang="scss" scoped>

.goods_info_content{
    min-height: 500px;
    margin-bottom: 20px;
    .right_item{
        min-height: 500px;
        .t{ color: #333;font-size: 20px;margin-bottom: 20px;}
        border:1px solid #efefef;
        padding:20px;
        box-sizing: border-box;
        width: 874px;
        float: left;
        .user_content_blcok_line{
            clear: both;
            height: 1px;
            background: #efefef;
            margin: 15px 0;
        }
        .comment_list_top{
            margin-bottom: 15px;
            .left_bfb{
                float: left;
                font-size: 48px;
                color:#ca151e;
                line-height: 95px;
                width: 225px;
                text-align: center;
                position: relative;
                border-right: 1px solid #efefef;
                padding-right: 35px;
                span{
                    font-size: 14px;
                    color:#999;
                    position: absolute;
                    top:-16px;
                    left: 140px;
                }
            }
            .right_comment_list{
                ul li{
                    float: left;
                    line-height: 48px;
                    margin-left: 35px;
                    margin-top: 25px;
                    color:#666;
                    height: 48px;
                    padding:0 40px;
                    font-size: 14px;
                    background: #efefef;
                    border-radius: 3px;
                }
                ul li.red{
                    background: #efefef;
                    color:#ca151e;
                }
                ul li.red:hover{
                    background: #e1e1e1;
                    color:#ca151e;
                }
                ul li:hover{
                    background: #e1e1e1;
                    color:#666;
                    -webkit-transition: all .2s linear;
                    transition: all .2s linear;
                }
            }
        }
        .comment_list_top:after{
            clear:both;
            display: block;
            content:'';
        }
    }
    .left_item{
        width: 300px;
        float: left;
        margin-right: 20px;
        .store_info{
            width: 100%;
            border:1px solid #efefef;
            margin-bottom: 20px;
            .goods_list{
                dl{
                    border-bottom: 1px solid #efefef;
                    padding: 20px 10px;
                    &:last-child{
                        border-bottom: none;
                    }
                    &:after{
                        clear: both;
                        display: block;
                        content:'';
                    }
                    .info{
                        display: flex;
                        flex-direction:column;
                        float: left;
                        position: relative;
                        .title{
                            width: 120px;
                            height: 45px;
                            overflow: hidden;
                        }
                        .price{
                            color:#ca151e;
                            margin-top: 5px;
                        }
                        .round{
                            background: #333;
                            color:#fff;
                            width: 16px;
                            height: 16px;
                            text-align: center;
                            line-height: 16px;
                            border-radius: 50%;
                            position: absolute;
                            font-size: 12px;
                            top:-15px;
                            left:-95px;

                        }
                    }
                    &:nth-child(1) .round,&:nth-child(2) .round,&:nth-child(3) .round{
                        background: #ca151e;
                    }
                }
                
                dt{
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                    float: left;
                    img{
                       width: 80px;
                        height: 80px; 
                    }
                }
                
            }
            .btn{
                border-top: 1px solid #efefef;
                span:hover{
                    background: #4bb16f;
                    color:#fff;
                }
                span{
                    text-align: center;
                    width: 100%;
                    box-sizing: border-box;
                    height: 40px;
                    line-height: 40px;
                    display: block;
                    float: left;
                    cursor: pointer;
                    &:first-child{
                        border-right: 1px solid #efefef;
                    }
                }
            }
            .store_com{
               margin:10px;
                line-height: 20px 10px;
                color:#999
            }
            .store_rate{
                padding-left:10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #efefef;
                .item{
                    line-height: 30px;
                }
                .title{
                    color:#000;
                    line-height: 35px;
                }
            }
            .rate{
                line-height: 35px;
                font-size: 14px;
                padding-left:10px;
                border-bottom: 1px solid #efefef;
            }
            .store_title{
                background: #fafafa;
                height: 35px;
                padding:0 10px;
                padding-top: 6px;
                box-sizing: border-box;
                border-bottom: 1px solid #efefef;
                .tip{
                    background: #e4393c;
                    color:#fff;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 3px;
                    margin-right: 10px;
                    padding:2px 10px;
                    font-size: 12px;
                }
                .title{
                    color:#000;
                }
            }
        }
    }
    margin-top: 60px;
}
.goods_info_top_right{
    float: left;
    width: 770px;
    font-size: 14px;
    
    .goods_info_num{
        padding: 10px;
        margin-top: 10px;
        .goods_info_num_title{
            color:#666;
            float: left;
            line-height: 25px;
            margin-right: 15px;
        }
        .goods_info_num_jian,.goods_info_num_jia{
            cursor: pointer;
            border:1px solid #efefef;
            width: 25px;
            height: 25px;
            // line-height: 25px;
            text-align: center;
            float: left;
            margin-right: 10px;
            color:#666;
        }
        .goods_info_num_stock{
            line-height: 25px;
            color:#999;
        }
        .goods_info_num_input{
            float: left;
            text-align: center;
        }
        .goods_info_num_input input{
            height: 27px;
            border:1px solid #efefef;
            outline: none;
            width: 50px;
            margin-right: 10px;
            box-sizing: border-box;
            padding: 0 8px;
            color:#666;
            text-align: center;
        }
    }
    .goods_info_btn{
        clear: both;
        margin-top: 20px;
        .des{
              line-height: 46px;
            float: left;
            margin-right: 20px;
            color: #666;
            font-size: 16px;
            span{
                color:#e4393c;font-size: 20px;font-weight: bold;
            }
        }
    }
    .goods_info_add_cart,.goods_info_buy{
        cursor: pointer;
        line-height: 46px;
        float: left;
        margin-right: 20px;
        background: #e4393c;
        border-radius: 3px;
        color:#fff;
        padding: 0 20px;
        i{
            margin-right: 6px;
            font-size: 16px;
            font-weight: bold;
        }
        a{color: #fff;display: block;}
        &:hover{
            opacity: 0.8;
        }
    }
    .goods_info_buy{
        cursor: pointer;
        background: #4bb16f;
        padding:0 30px;
        i{
            font-size: 16px;
            font-weight: bold;
        }
    }

    .goods_info_add_groupbuy{
        cursor: pointer;
        line-height: 40px;
        float: left;
        margin-right: 20px;
        background: #67c23a;
        border-radius: 3px;
        color:#fff;
        padding: 0 15px;
        i{
            margin-right: 6px;
        }
    }
    

    .goods_info_group{
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        // padding-bottom: 90px;
        height: 170px;
        background: url("../../../asset/pc/summary-bg.jpg");
    }
    .goods_info_price{
        color:#e4393c;
        font-size: 26px;
        line-height: 28px;
      
        span{
            line-height: 28px;
            color:#999;
            font-size: 14px;
            font-weight: normal;
        }
    }
    .goods_info_market_price{
        margin-top: 10px;
        span{
            color:#999;
        }
        .overx_goods_info{
            text-decoration: line-through;
            display: inline-block;
        }
    }
    .goods_info_sale_num{
        position:absolute;
        font-size: 12px;
        right: 16px;
        color:#333;
        top: 30px;
        font{
            margin-left: 10px;
            margin-right: 10px;
        }
    }
    .goods_info_phone_read{
        position:absolute;
        right: 24px;
        font-size: 12px;
        color:#999;
        top: 120px;
        i{
            margin-left: 10px;
            color:#666;
        }
    }
    
    .goods_info_active{
    
        span{
            color:#999;
        }
        font{
            background: #ff6590;
            color:#fff;
            line-height: 34px;
            padding: 4px 8px;
            margin-right: 10px;
            border-radius: 3px;
        }
        font.noy{
            background: #67c23a;
        }
        font.noz{
            background: #999;
        }
        .goods_skill{
           
            background: #fe0851;
            border:1px solid  #fe0851;
            font-size: 14px;
            span{
                color:#fff;
                line-height: 40px;
                i{
                    font-size: 18px;
                    line-height: 42px;
                    margin-right: 20px;
                    margin-left: 20px;
                    float: left;
                    color:#fff;
                }
            }
            span.span_time{
                float: right;
                margin-right: 30px;
            }
        }
         .tuan_active{
            cursor: pointer;
            background: #4bb16f;
            border: 1px solid #4bb16f;

            span{
                color:#fff;
            }
            
        }
    }
}
.goods_info_top_left{
    width: 300px;
    margin-right: 20px;
    float: left;
    box-sizing: border-box;
    .goods_image_item{
        width: 300px;
        height: 300px;
        display: block;
        border-bottom: 1px solid #efefef;
    }
    .pic_zoom_list{
        ul li{
            float: left;
            margin:10px 10px 10px 0; 
            border:1px solid #efefef;
            img{
                width: 60px;
                height: 60px;
            }
        }
        ul li:hover{
            border-color:#ca151e;
        }
        ul li:last-child{
            margin-right: 0;
        }
        ul li.border_color{
            border-color:#ca151e;
        }
        .pic_zoom_list_left{
            font-size: 24px;
            float: left;
            line-height: 80px;
            color:#666;
            margin-right: 10px;
            margin-left: 10px;
            :hover{
                color:#ca151e;
            }
        }
        .pic_zoom_list_right{
            font-size: 24px;
            float: right;
            line-height: 80px;
            color:#666;
            margin-right: 10px;
            margin-left: 10px;
            :hover{
                color:#ca151e;
            }
        }
    }
        .goods_info_title{
        position: relative;
        font-size: 18px;
        margin-bottom: 15px;
        p{
            color:#999;
            line-height: 35px;
            font-size: 14px;
        }
        span{
            background: #e4393c;
            font-size: 12px;color: #fff;
            padding:2px 10px;
            border-radius: 3px;
            vertical-align: middle;
            display: inline-block;
            *display: inline-block;
        }
        b{
             vertical-align: middle;
            display: inline-block;
            *display: inline-block;
        }
        
    }
}
.goods_info_sc{
    background: #f6f6f6;
    border-radius: 6px;
    font-size: 14px;
    line-height: 25px;
    color:#666;
    position: absolute;
    top:0;
    right: 8px;
    padding:0 10px;
    cursor: pointer;
    i{
        margin-left: 6px;
        font-size: 12px;
    }
}
.goods_info_sc.red_color{
    color:#fff;
    background: #ff5c15;
}
.goods_info_sc:hover{
    color:#fff;
    background: #ff5c15;
}
.goods_info_spec{
    margin-top: 20px;
    padding-left:10px; 
    line-height: 20px;
    color:#666;
    position: relative;
    z-index: 200;
    .spec_list{
        margin-bottom: 10px;
        span{float: left;width: 84px;}
        ul{
            float: left;
            li{
                cursor: pointer;
                float: left;
                color:#666;
                border:1px solid #e1e1e1;
                border-radius: 2px;
                font-size: 12px;
                padding: 0 8px;
                margin-right: 10px;
            }
            li.red{
                border:1px solid #ca151e;
                color:#ca151e;
            }
            li:hover{
                border:1px solid #ca151e;
                color:#ca151e;
            }
        }
    }
    :after{
        content:'';
        display: block;
        clear:both;
    }
}
.coupons_block{
    margin-top: 20px;
    width: 100%;
     span {
         display: inline-block;*display: inline-block;*zoom:1;vertical-align: middle;color: #999;font-size:14px;
     }
     .coupon-more{
             display: inline-block;*display: inline-block;*zoom:1;vertical-align: middle;color: #999;font-size:14px;cursor: pointer;
       &:hover{
           color: #df3033;
       }
       }
     ul {
         display: inline-block;*display: inline-block;*zoom:1;vertical-align: middle;
     }
    ul li{
        border:1px dashed #df3033;
        background: #ffdedf;
        display: inline-block;
        padding: 2px 10px;
        margin-right: 10px;
        cursor: pointer;
         border-radius: 3px;
        .price{
         
            color: #df3033;font-size: 12px;
            text-align: center;
        }
       
        &:after{
            clear: both;
            display: block;
            content:'';
        }
        &.active{
            background: #eeeeee ;color:#666;
             .price {color:#666}
        }    

    }
}
.goods_info_full_reduction{
    background: #e6e6e6;
    line-height: 25px;
    font-size: 12px;
    .title{
        width: 84px;
        color:#b5621b;
        padding-left: 10px;
        // margin-right: 45px;
    }
    .act{
        color:#b5621b;
    }
}
.tuan_list{
    margin: 10px 0;
    height: 32px;
    
    .tuan_item{
        &:after{
            content:'';
            display: block;
            clear: both;
        }
        img{
            width: 30px;
            height: 30px;
            border:1px solid #efefef;
            border-radius: 50%;
            float: left;
            margin-right: 15px;
        }
        .nickname{
            color:#b5621b;
            float: left;
            display: block;
            width: 180px;
            line-height: 32px;
        }
        .orders_count{
            color:#b5621b;
            float: right;
            display: block;
            line-height: 32px;
            margin-right: 15px;
        }
        .btn{
            cursor: pointer;
            display: block;
            background: #67c23a;
            color:#fff;
            border-radius: 3px;
            float: right;
            line-height: 32px;
            padding:0 10px;
             &:hover{
            opacity: 0.8;
        }
        }
    }
}
.coupon_list_item{
        width:100%;margin:10px 0;
        height: 100px;
        border-radius: 5px;
        cursor: pointer;
        border:1px solid #eee;background: #FCEEF0 url(~@/asset/pc/couponBtn.png) no-repeat right center/auto 100%;
        &.active{
            background: #eeeeee url(~@/asset/pc/couponBtn2.png) no-repeat right center/auto 100%;
             .q-price {color:#666}
        }
        .q-price {
            text-align: center;
            padding:20px 0 0 0;
            width: 85%;
            height: auto;
            line-height: 30px;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #e43838;
            font-size: 14px;
            strong{
                font-size: 32px;
            }
            .q-limit{display: block;}
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
    .kanjia-user{
        height: 60px;
        margin-bottom: 20px;
        .img{height: 60px;width: 60px;overflow: hidden;float: left;background: #eee;border-radius: 50%;img{width: 100%;height: 100%;}}
        .test{float: left;line-height: 60px;margin:0 10px;color: #000;font-size: 22px;}
        .des{float: left;line-height: 60px;margin:0 10px;color: #e43838;font-size: 22px;}
    }
    .goods_info_speed_box{
        background: #999;width: 100%;height: 10px;border-radius: 10px;margin:20px 0 10px 0; position: relative;overflow:hidden;
            .goods_info_speed_box_ed{
                background: #ffb507;width: 100px;height: 10px;border-radius: 10px;
            }

    }
    .kanjia-price{
        font-size: 16px;color: #666;
        span{color: #e01d20;font-size: 20px;}
    }
    .left_item{
        .t{
            color: #333;font-size: 20px;margin-bottom: 20px;
        }
        ul li{
            margin:10px 0;
        .img{height: 50px;width: 50px;overflow: hidden;float: left;background: #eee;border-radius: 50%;
        img{width: 100%;height: 100%;}}
        .test{float: left;line-height: 50px;margin:0 10px;color: #666;font-size: 18px;}
        .cut{float: right;line-height: 50px;margin:0 10px;color: #e43838;font-size: 22px;}
        }
         
    }
    .kanjia_success{
        position: fixed;top:0;left: 0;z-index:999;background:rgba(0,0,0,0.2);width:100%;height:100%;    
        .kanjia_success_box{
        width: 450px;height: 400px;position: relative;top:20%;z-index:999;background: url(~@/asset/pc/kjcg.png) no-repeat center/100% 100%;
        margin-left: -225px;left: 50%;
        p{padding:47% 100px 0 100px;color:#333;font-size: 18px;line-height: 40px;text-align: center;}
        span{color: #fe0851;font-size: 40px;font-weight: bold;}
        
        }
        .kanjia_close{text-align: center;font-size: 20px;position: absolute;bottom: 30px;left: 50%;margin-left: -20px;width: 40px;width: 40px;line-height: 40px;border-radius: 50%;border:1px solid #666;cursor: pointer;}
    }
    .kanjia_end{
        position: fixed;top:0;left: 0;z-index:999;background:rgba(0,0,0,0.5);width:100%;height:100%;    
        .kanjia_success_box{
        width: 450px;height: 400px;position: relative;top:20%;z-index:999;background: url(~@/asset/pc/kjcg.png) no-repeat center/100% 100%;
        margin-left: -225px;left: 50%;
        p{padding:47% 100px 0 100px;color:#333;font-size: 18px;line-height: 40px;text-align: center;}
        span{color: #fe0851;font-size: 40px;font-weight: bold;}
        
        }
        .kanjia_close{text-align: center;font-size: 20px;position: absolute;bottom: 30px;left: 50%;margin-left: -20px;width: 40px;width: 40px;line-height: 40px;border-radius: 50%;border:1px solid #666;cursor: pointer;}
    }
    </style>