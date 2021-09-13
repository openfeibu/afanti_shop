<template>
    <div class="hotme_store">
        <div class="mbx w1200">
            <a-breadcrumb>
                <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
                <a-breadcrumb-item >展馆列表</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
         <!-- 搜索条件 S 
        <div class="goods_where w1200">
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
                          
                           <li @click="sortChange('goods_sale')" :class="(!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_sale')?'red':''">
                                销量
                                <div class="sorts">
                                    <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='asc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_sale'))?'caret red':'caret'" type="caret-up" />
                                    <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='desc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_sale'))?'caret red':'caret'" type="caret-down" />
                                </div>
                            </li>
                            <li @click="sortChange('goods_comment')" :class="(!$isEmpty(base64Decode.sort_type) && base64Decode.sort_type=='goods_comment')?'red':''">
                                收藏
                                <div class="sorts">
                                    <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='asc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_comment'))?'caret red':'caret'" type="caret-up" />
                                    <a-icon :class="((!$isEmpty(base64Decode.sort_order) && base64Decode.sort_order=='desc') && (!$isEmpty(base64Decode.sort_type)  &&  base64Decode.sort_type=='goods_comment'))?'caret red':'caret'" type="caret-down" />
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        搜索条件 E -->

        <div class="home_store_list w1200" v-if="list.length>0">
            <ul>
                <li v-for="(v,k) in list" :key="k">
                    <div  @click="$router.push('/store/'+v.id)">
                        <img class="transition500" v-lazy="v.store_face_image" alt="">
                        <div class="right_item">
                            <div class="title">{{v.store_name||''}}</div>
                            <!-- <div class="qy"><span class="stitle">公司：</span>{{v.store_company_name||''}}</div> -->
                            <div class="address" :title="v.store_description"><span class="stitle"></span>{{v.store_description}}</div>
                            <div class="btn" @click="$router.push('/store/'+v.id)">进入展馆</div>
                        </div>
                       
                    </div>
                </li>
            </ul>

            <div class="fy">
                <a-pagination v-model="params.page" :default-page-size="params.per_page" :total="params.total" @change="onChange" />
            </div>
        </div>
        <!-- <a-empty style="margin-top:40px" v-else /> -->
         <transition name="fade">
            <loading v-if="isLoading"></loading>
        </transition>
    </div>
</template>

<script>
// import Loading from "@/components/home/public/loading"
export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:30,
              total:0,
          },
          base64Decode:{},
          base64Code:'',
          list:[],
          isLoading:true
      };
    },
    watch: {},
    computed: {},
    methods: {
        // 初始化数据
        onload(){
            this.params.params = this.base64Code;
            this.$get(this.$api.homeStore,this.params).then(res=>{
                if(res.code == 200){
                    this.params.total = res.data.total;
                    this.params.per_page = res.data.per_page;
                    this.params.current_page = res.data.current_page;
                    this.list = res.data.data;
                    // console.log(this.params);
                }else{
                    this.$message.error(res.msg);
                }
                this.isLoading = false
            })
            // console.log(this.base64Decode)
        },
        onChange(e){
            this.params.page = e;
            this.onload();
        },
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
                this.base64Code = window.btoa(JSON.stringify(this.base64Decode))
            }
            this.onload();
        },
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.home_store_list{
    ul{margin-bottom: 30px;&:after{content:'';display: block;clear:both;}}
    ul li{float:left;width:550px;height:250px;margin:20px 25px;background:#fbfbfb;position:relative;cursor: pointer;
     border-radius: 5px;box-shadow: 0 5px 20px #eee;overflow: hidden;
  
    }
    ul li:hover .right_item .title{color:#4bb16f}
    ul li:hover img{ transform: scale(1.1);   -webkit-transform: scale(1.1);}
    .center_block{line-height: 80px;float: left;width: 200px;text-align: center;}

       
        img{width:550px;height:250px;}
        .right_item{
            position: absolute;
            width: 250px;
            height: 250px;
            padding:15px;
            right: 0;top: 0;
            background: rgba(255,255,255,0.8);
           
            .title{font-weight: bold;font-size: 24px;margin-bottom: 5px;color:#000;margin-top: 20px;}
            .qy,.address{color:#333;line-height: 24px;font-size: 14px;height:100px;overflow: hidden;}
            .btn{
                width: 120px;height: 40px;background: #4bb16f;text-align: center;line-height: 40px;color: #fff;border-radius: 5px;
            }
        }
 
}
.goods_where{
    border: 1px solid #efefef;
    line-height: 50px;
    font-size: 14px;
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
</style>