<template>
    <div class="home_store_info">
        <banner :list="store_info.store_slide" :height="350" />

        <div class="shopInfo w1200 clear">
            <div class="shopInfo-test">
                <div class="title">{{store_info.store_name}}</div>
                <div class="des">{{store_info.store_description}}</div>
            </div>
            <div class="shopInfo-video">
                <video :src="store_info.store_video" controls="controls">
                您的浏览器不支持 video 标签。
                </video>
                <div id="monitoring_video"></div>
            </div>
        </div>
        <div class="store_info_block w1200">
            <div class="left_item">
                <!-- <div class="store_info">
                    <div class="store_title">
                        <span class="tip">展馆</span>
                        <span class="title">{{store_info['store_name']||'加载中...'}}</span>
                    </div>
                    <div class="rate">
                        <span style="float:left;padding-top:2px;margin-right:10px">综合评分</span>
                        <a-rate style="font-size:14px;float:left" :value="rate_info.scoreAll" :tooltips="desc" disabled />
                        <span style="float:left;padding-top:2px;" class="ant-rate-text">{{ desc[rate_info.scoreAll - 1] }}</span>
                        <div class="clear"></div>
                    </div>
                    <div class="store_rate">
                        <div class="title">展馆评分：</div>
                        <div class="item">
                            <span style="float:left;padding-top:2px;margin-right:10px">描述相符</span>
                            <a-rate style="font-size:14px;float:left" :value="rate_info.agreeAll" :tooltips="desc" disabled />
                            <span style="float:left;padding-top:2px;" class="ant-rate-text">{{ desc[rate_info.scoreAll - 1] }}</span>
                            <div class="clear"></div>
                        </div>
                        <div class="item">
                            <span style="float:left;padding-top:2px;margin-right:10px">服务态度</span>
                            <a-rate style="font-size:14px;float:left" :value="rate_info.serviceAll" :tooltips="desc" disabled />
                            <span style="float:left;padding-top:2px;" class="ant-rate-text">{{ desc[rate_info.scoreAll - 1] }}</span>
                            <div class="clear"></div>
                        </div>
                        <div class="item">
                            <span style="float:left;padding-top:2px;margin-right:10px">发货速度</span>
                            <a-rate style="font-size:14px;float:left" :value="rate_info.speedAll" :tooltips="desc" disabled />
                            <span style="float:left;padding-top:2px;" class="ant-rate-text">{{ desc[rate_info.scoreAll - 1] }}</span>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="store_com" style="margin-top:10px">公司名称：<font color="#999">{{store_info.store_company_name}}</font></div>
                    <div class="store_com" style="margin-bottom:10px">公司地址：<font color="#999">{{store_info.area_info+' '+store_info.store_address}}</font></div>
                    <div class="btn">
                        <span :class="isFav?'navstore':''"  @click="goods_fav()">{{isFav?'已收藏':'收藏展馆'}}</span>
                        <span class="contact" @click="chat=true">联系客服</span>
                        <div class="clear"></div>
                    </div>
                </div> -->
                <!-- // 销售排行 -->
                <div class="store_info">
                    <div class="store_title"><span class="title">销售排行</span></div>
                    <div class="goods_list" v-if="store_info.sale_list.length>0">
                        <dl v-for="(v,k) in store_info.sale_list" :key="k"><a :href="'/goods/'+v.id">
                            <dt><img v-lazy="v.goods_master_image" :alt="v.goods_name"></dt>
                            <dd class="info">
                                <div class="title">{{v.goods_name||''}}</div>
                                <div class="price">￥{{v.goods_price}}</div>
                                <div class="round">{{k+1}}</div>
                            </dd></a>
                        </dl>
                    </div>
                    <div style="line-height:90px;text-align:center;color:#999;" v-else>暂时没有商品~~</div>
                </div>
            </div>

            <div class="right_item">
                <!-- 搜索条件 S -->
                <div class="goods_where">
                    <div class="item">
                        <div class="title">筛选排序：</div>
                        <div class="list">
                            <div class="other">
                                <ul>
                                    <li @click="sortChange('')" :class="($isEmpty(base64Decode.sort_type) || base64Decode.sort_type=='')?'red':''"
                                        >默认
                                        <div class="sorts">
                                            <a-icon :class="(($isEmpty(base64Decode.sort_order) || base64Decode.sort_order=='asc') && ($isEmpty(base64Decode.sort_type) || base64Decode.sort_type==''))?'caret red':'caret'" type="caret-up" />
                                            <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='desc') && ($isEmpty(base64Decode.sort_type) || base64Decode.sort_type==''))?'caret red':'caret'" type="caret-down" />
                                        </div>
                                    </li>
                                    <li @click="sortChange('goods_price')" :class="(!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_price')?'red':''">
                                        价格
                                        <div class="sorts">
                                            <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='asc') && (!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_price'))?'caret red':'caret'" type="caret-up" />
                                            <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='desc') && (!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_price'))?'caret red':'caret'" type="caret-down" />
                                        </div>
                                    </li>
                                    <li @click="sortChange('goods_sale')" :class="(!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_sale')?'red':''">
                                        销量
                                        <div class="sorts">
                                            <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='asc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_sale'))?'caret red':'caret'" type="caret-up" />
                                            <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='desc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_sale'))?'caret red':'caret'" type="caret-down" />
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 搜索条件 E -->

                <!-- 产品列表 S -->
                <div class="goods_list" v-if="list.length>0">
                    <ul>
                        <li v-for="(v,k) in list" :key="k"><router-link :to="'/goods/'+v.id">
                            <div class="product_act_in">
                                <dl>
                                    <dt><img v-lazy="v.goods_master_image" :alt="v.goods_name" /></dt>
                                    <dd class="product_title" :title="v.goods_name">{{v.goods_name}}</dd>
                                    <dd class="product_subtitle">{{v.goods_subname||'-'}}</dd>
                                    <dd class="product_price">￥{{v.goods_price}}<span v-if="v.goods_market_price != '0.00'">{{v.goods_market_price}}元</span></dd>
                                </dl>
                            </div>
                        </router-link></li>
                    </ul>
                    <div class="clear"></div>
                    <div class="fy" style="margin-top:30px">
                        <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
                    </div>
                </div>
                <a-empty v-else style="margin-top:70px" />
                <!-- 产品列表 E -->
            </div>
        </div>
        <!-- S -->

         <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
    </div>
</template>

<script>
import Banner from '@/components/home/public/banner'
export default {
    components: {Banner},
    props: {},
    data() {
      return {
          id:0,
          params:{
              page:1,
              per_page:30,
              total:0,
          },
          base64Decode:{},
          base64Code:'',
          store_info:{
              area_info:'',
              store_address:'',
              sale_list:[],
          },
          chat:false,
          list:[],
          comment_statistics:[],
          isFav:false,
          isLoading:true,

      };
    },
    watch: {},
    computed: {},
    methods: {
        get_store_info(){
            this.$get(this.$api.homeStore+'/'+this.id).then(res=>{
                this.store_info = res.data;
                if(this.store_info.equipment_url && this.store_info.access_token)
                {
                    new EZUIKit.EZUIKitPlayer({
                        id: "monitoring_video", // 视频容器ID
                        accessToken: this.store_info.access_token,
                        url: this.store_info.equipment_url,
                        template: 'theme',//
                        autoplay: false,
                        plugin: [],// 加载插件，talk-对讲
                        //startTalk: ()=> this.playr.startTalk(),
                        //stopTalk: ()=> this.playr.stopTalk(),
                        width: 600,
                        height:400,
                    })
                }
            })
        },
        get_goods_list(){
            this.params.params = this.base64Code;
            this.$get(this.$api.homeStore+'/'+this.id+'/goods',this.params).then(res=>{
                if(res.code == 200){
                    this.params.total = res.data.total;
                    this.params.per_page = res.data.per_page;
                    this.params.current_page = res.data.current_page;
                    this.list = res.data.data;
                    // console.log(this.params);
                }else{
                    this.$message.error(res.msg);
                }
                this.isLoading = false;
            })
        },
        onChange(e){
            this.params.page = e;
            this.get_goods_list();
        },
        // 排序
        sortChange(e=''){
            this.params.page = 1;
            if(e == ''){
                if(this.base64Decode.sort_order== 'desc'){
                    this.base64Decode.sort_order= 'asc';
                }else{
                    this.base64Decode.sort_order= 'desc';
                }
                if(this.base64Decode.sort_type != undefined){
                    this.base64Decode.sort_order= 'asc';
                }
                this.base64Decode.sort_type = undefined
            }else{
                if(this.base64Decode.sort_type == undefined || this.base64Decode.sort_type != e){
                    this.base64Decode.sort_order= 'asc';
                }else{
                    if(this.base64Decode.sort_order== 'desc'){
                        this.base64Decode.sort_order= 'asc';
                    }else{
                        this.base64Decode.sort_order= 'desc';
                    }
                }
                
                this.base64Decode.sort_type= e;
                console.log(this.base64Decode.sort_type)
            }
            this.base64Code = window.btoa(JSON.stringify(this.base64Decode));
            this.get_goods_list();

        },
        goods_fav(){
            if(this.isFav){
                return this.del_fav(this.id);
            }else{
                return this.add_fav(this.id);
            }
        },
        // 添加收藏
        add_fav(id){
            this.$post(this.$api.homeFav,{id:id,is_type:1}).then(res=>{
                return this.is_fav(id);
            })
        },
        // 删除收藏
        del_fav(id){
            this.$delete(this.$api.homeFav+'/'+id,{is_type:1}).then(res=>{
                return this.is_fav(id);
            })
        },
        // 判断是否收藏该产品
        is_fav(id){
            this.$get(this.$api.homeFav+'/'+id,{is_type:1}).then(res=>{
                if(res.code == 200){
                    return this.isFav = true;
                }else{
                    return this.isFav = false;
                }
            })
        },
    },
    created() {
        if(!this.$isEmpty(this.$route.params.id)){
            this.id = this.$route.params.id;
        }
        this.get_store_info();
        this.get_goods_list();
        this.is_fav(this.id);
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.store_info_block{
    margin-top: 30px;
    .right_item{
        float: right;
        width: 946px;
        .goods_list{
            margin-top: 30px;
            ul li{
  
        cursor: pointer;
        width: 220px;
        height: 300px;
        margin-bottom: 14px;
        margin-right: 20px;
        box-sizing: border-box;
        float: left;
        .product_act_in{
            width: 220px;
            height: 300px;
            background: #fff;
            box-sizing: border-box;
            transition: all 0.2s linear;
        }
        dl{
            padding-top: 10px;
        }
        dl dt{
            width: 180px;
            height: 180px;
            margin:0 auto;
        }
        dl dt img{
            width: 100%;
            height: 100%;
        }
        dl dd{
            width: 190px;
            overflow: hidden;
            text-align: center;
            margin:0 auto;
        }
        dl dd.product_title{
            font-size: 14px;
            margin-top: 5px;
            height: 30px;
            line-height: 30px; text-align: left;
        }
        dl dd.product_subtitle{
            margin-top: 0px;
            font-size: 12px;
            color:#b0b0b0;
            line-height: 14px;
            text-align: left;
        }
        dl dd.product_price{
            font-size: 16px;
            color:#ca151e;
            line-height: 34px;
             text-align: left;
            span{
                font-size: 14px;
                color:#b0b0b0;
                margin-left: 8px;
                text-decoration: line-through;
            }
        }
        .product_store_name{
            text-align: left;
            span{
                background: #4bb16f;
                color: #fff;
                font-size: 12px;
                padding:0 10px;
                height: 24px;line-height: 24px;
                border-radius: 2px;
            }
        }
         &:nth-child(4n){
                margin-right: 0;
            }
    }
            
            ul li:hover .product_act_in{
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                margin-top:-3px;
            }
        }
        .goods_where{
            // border: 1px solid #efefef;
            line-height: 50px;
            background: #fafafa;
            font-size: 14px;
            width: 100%;
            .item{
                padding:0 20px;
                box-sizing: border-box;
                border-bottom: 1px solid #efefef;
                &:last-child{
                    border-bottom: none;
                }
                &:after{
                    clear:both;
                    display: block;
                    content:'';
                }
                .title{
                    float: left;
                    margin-right: 20px;
                }
                .list{
                    float: left;
                    ul li{
                        cursor: pointer;
                    }
                    .other{
                        ul li{
                            float: left;
                            margin-right: 20px;
                            padding:0 10px;
                            position: relative;
                            &:hover{
                                color:#ca151e;
                            }
                            &.red{
                            color:#ca151e;
                            }
                            .sorts{
                                position: absolute;
                                top:0;
                                right: 0;
                                color:#666;
                                .caret{
                                    font-size: 12px;
                                    position: absolute;
                                    -webkit-transform-origin-x: 0; //缩小后文字居左
                                    -webkit-transform: scale(0.80);   //关键
                                    &:first-child{
                                    top:16px;
                                    right:-5px; 
                                    }
                                    &:last-child{
                                    top:22px;
                                    right:-5px; 
                                    }
                                    &.red{
                                        color:#ca151e;
                                    }
                                }
                            }
                    
                        }
                    }
                }
            }
        }
    }
    .left_item{
        width: 234px;
        float: left;
        margin-right: 20px;
        .navstore{
            background: #ca151e;
            color:#fff;
        }
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
                    background: #ca151e;
                    color:#fff;
                }
                span{
                    text-align: center;
                    width: 50%;
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
                padding:3px 10px;
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
                    background: #ca151e;
                    color:#fff;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 3px;
                    margin-right: 10px;
                    padding:2px 10px;
                }
                .title{
                    color:#000;
                }
            }
        }
    }
    &:after{
        clear: both;
        display: block;
        content:'';
    }
   
}
 .shopInfo{
     margin:30px auto;
        .shopInfo-test{width: 640px;float: left;
            .title{font-size: 40px;
                    color: #333;
                    line-height: 100px;
                    position: relative;
                    &:before {
                       content: "";
                        width: 30%;
                        height: 10px;
                        background: #4bb16f;
                        position: absolute;
                        left: 0;
                        bottom: 30px;
                        z-index: 0;
                        opacity: 0.6;
                    }
                }
            .des{
                    font-size: 16px;
                    color: #666666;
                    line-height: 26px;
                    margin-bottom: 30px;
            }
        }
        .shopInfo-video{
            width: 540px;
            float: right;
            background: #fbfbfb;
            border-radius: 5px;
            height:304px ;
            video{width: 100%;height: 100%;}
        }
    }
</style>