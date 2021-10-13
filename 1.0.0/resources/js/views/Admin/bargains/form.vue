<template>
    <div class="qingwu">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            砍价编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 14 }">
                <a-form-model-item label="选择商品" :rules="{ required: true}">
                    <div class="goods_list chose" v-if="!$isEmpty(info.goods_info.id)">
                        <dl>
                            <dt><img v-lazy="info.goods_info.goods_master_image" :alt="info.goods_info.goods_name"></dt>
                            <dd>{{info.goods_info.goods_name}}</dd>
                        </dl>
                    </div>
                    <div class="goods_list_search" v-if="id==0">
                        <a-input-search placeholder="选择产品关键词..." style="width: 100%;" enter-button @search="onSearch" />
                    </div>
                    <div class="goods_list" v-if="total>0" style="margin-top:10px">
                        <dl v-for="(v,k) in goods" :key="k" @click="onChose(v)" style="margin-bttom:10px;">
                            <dt><img v-lazy="v.goods_master_image" :alt="v.goods_name"></dt>
                            <dd>{{v.goods_name}}</dd>
                            <dd><a-tag v-if="!v.is_use" color="green">可选</a-tag><a-tag v-else color="red">已使用</a-tag></dd>
                        </dl>
                    </div>
                    <div class="admin_pagination" v-if="total>0">
                        <a-pagination v-model="params.page" :page-size.sync="params.per_page" :total="total" @change="onChange" show-less-items />
                    </div>
                </a-form-model-item>


                <a-form-model-item label="截止时间" :rules="{ required: true}">
                    <a-range-picker v-model="info.times"  />
                </a-form-model-item>

                <a-form-model-item label="砍价有效期" :rules="{ required: true}" extra="自用户发起砍价到砍价截止的时间，单位：小时">
                    <a-input type="number" v-model="info.expiry_time" suffix="小时"></a-input>
                </a-form-model-item>

                <a-form-model-item label="砍价底价" :rules="{ required: true}">
                    <a-input v-model="info.floor_price" type="number" suffix="￥"/>
                </a-form-model-item>

                <a-form-model-item label="帮砍人数" :rules="{ required: true}"  extra="每个砍价订单的帮砍人数，达到该人数才可砍至底价">
                    <a-input type="number" v-model="info.peoples"  suffix="人"></a-input>
                </a-form-model-item>


                <a-form-model-item label="可自砍一刀" :rules="{ required: true}" extra="砍价发起人自己砍一刀">
                    <a-radio-group name="is_self_cut"  v-model="info.is_self_cut">
                        <a-radio :value="1">
                            允许
                        </a-radio>
                        <a-radio :value="0">
                            不允许
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <!--
                <a-form-model-item label="必须底价购买 " :rules="{ required: true}" extra="只有砍到底价才可以购买">
                    <a-radio-group name="is_floor_buy" v-model="info.is_floor_buy">
                        <a-radio :value="1">
                            是
                        </a-radio>
                        <a-radio :value="0">
                            否
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                -->
                <a-form-model-item label="活动状态">
                    <a-switch  v-model="info.status" />
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>
            
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          params:{
              page:1,
              per_page:8,
              goods_name:'',
          },
          total:0, //总页数
          goods:[],
          info:{
              goods_id:0,
              goods_info:{},
              expiry_time: 24,
              is_self_cut: 1,
              is_floor_buy: 1,
              status: 1,
          },
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            this.info.times[0] = moment(this.info.times[0]).format('YYYY-MM-DD hh:mm:ss')
            this.info.times[1] = moment(this.info.times[1]).format('YYYY-MM-DD hh:mm:ss')
            let api = this.$apiHandle(this.$api.adminBargains,this.id);
            if(api.status){
                this.$put(api.url,this.info).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        return this.$router.back();
                    }else{
                        return this.$message.error(res.msg)
                    }
                })
            }else{
                this.$post(api.url,this.info).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        return this.$router.back();
                    }else{
                        return this.$message.error(res.msg)
                    }
                })
            }
   
            
        },
        get_info(){
            this.$get(this.$api.adminBargains+'/'+this.id).then(res=>{
                this.info = res.data;
            })
        },
        // 选择分页
        onChange(e){
            this.params.page = e;
        },
        onChose(e){
            if(e.is_use){
                return this.$message.error('该商品已经存在');
            }
            this.info.goods_id = e.id;
            this.info.goods_info = e;
        },
        onSearch(e){
            console.log(e)
            this.params.goods_name = e
            this.get_goods();
        },
        get_goods(){
            this.$get(this.$api.adminBargains+'/goods/get_bargain_goods',this.params).then(res=>{
                this.total = res.data.total;
                this.goods = res.data.data;
            })
        },
        // 获取列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
            
 
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
    &.chose{
        margin-bottom: 40px;
        dl{
            background: #fafafa;
            padding: 20px;
            float: none;
            width: 192px;
        }
    }
    &:after{
        clear: both;
        display: block;
        content:'';
    }
    dl{
        cursor: pointer;
        float: left;
        margin-right: 15px;
        width: 152px;
        img{
            width: 150px;
            height: 150px;
        }
        dt{
            border:1px solid #efefef;
            box-sizing: border-box;
        }
        dd{
            width: 150px;
            height: 35px;
            overflow: hidden;
            text-align: center;
        }        
    }
}
</style>