<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            商品编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="展馆" :rules="{ required: true}">
                    <a-select v-model="info.store_id" :filter-option="false">
                        <a-select-option v-for="(v,k) in storeList" :key="k" :value="v.id">{{v.store_name}}</a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item label="商品分类" :rules="{ required: true}">
                    <a-tree-select tree-default-expand-all v-model="info.class_id">
                        <template v-for="(v,k) in categoryList">
                            <a-tree-select-node v-if="v.id != id" :title="v.name" :value="v.id" :key="k">
                                <template v-for="(vo,key) in v.children">
                                    <a-tree-select-node v-if="vo.id != id" :key="key" :title="vo.name" :value="vo.id"></a-tree-select-node>
                                </template>
                            </a-tree-select-node>
                        </template>

                    </a-tree-select>
                </a-form-model-item>
                <a-form-model-item label="商品标题" :rules="{ required: true}">
                    <a-input v-model="info.goods_name" />
                </a-form-model-item>
                <a-form-model-item label="商品副标题">
                    <a-textarea :auto-size="{ minRows: 2, maxRows: 6 }" v-model="info.goods_subname" />
                </a-form-model-item>
                <a-form-model-item label="商品编号" extra="如果您不输入商品编号，系统将自动生成一个唯一的货号。">
                    <a-input v-model="info.goods_no" placeholder="" />
                </a-form-model-item>
                <a-form-model-item label="商品品牌" :rules="{ required: true}">
                    <a-select v-model="info.brand_id" :filter-option="false">
                        <a-select-option v-for="(v,k) in brandList" :key="k" :value="v.id">{{v.name}}</a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item label="商品图片" :rules="{ required: true}">
                    <div class="goods_image">
                        <div class="item" v-if="info.goods_images.length>0">
                            <div class="item_img" v-for="(v,k) in info.goods_images" :key="k" >
                                <div class="item_bg"><a-icon @click="setMaster(k)" type="check" /><a-icon @click="deleteImg(k)" type="delete" /></div>
                                <div class="item_master" v-if="info.goods_master_image==v"><a-icon type="check-circle" />&nbsp;主图展示</div>
                                <img :src="v" />
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="item noimg" v-else><a-font type="iconphoto" /></div>
                    </div>
                    <div class="goods_upload_btn">
                        <a-upload
                                :action="$api.adminGoods+'/upload/images'"
                                :data="{token:$getSession('token_type')}"
                                :multiple="true"
                                :show-upload-list="false"
                                :before-upload="beforeUpload"
                                @change="upload"
                        >
                            <a-button type="primary">上传图片</a-button>
                        </a-upload>
                    </div>
                </a-form-model-item>
                <a-form-model-item label="商品视频"  extra="格式要求: mp4">
                    <template>
                        <a-upload
                                action="/api/uploader/media/upload"
                                accept="video/*"
                                @change="changeVideo"
                                :file-list="videoList"

                        >
                            <a-button> <a-icon type="upload" /> 上传 </a-button>
                        </a-upload>
                    </template>
                </a-form-model-item>
                <template v-if="skuList.length<=0">
                    <a-form-model-item label="平台价格" :rules="{ required: true}">
                        <a-input v-model="info.goods_price" type="number" suffix="￥" @input="changeGoodsPrice()"/>
                    </a-form-model-item>
                    <a-form-model-item label="市场价格" :rules="{ required: true}">
                        <a-input v-model="info.goods_market_price" type="number" suffix="￥" />
                    </a-form-model-item>
                    <a-form-model-item label="商品重量" :rules="{ required: true}">
                        <a-input v-model="info.goods_weight" type="number" suffix="Kg" />
                    </a-form-model-item>
                    <a-form-model-item label="商品库存" :rules="{ required: true}">
                        <a-input v-model="info.goods_stock" type="number" :min="0">
                            <a-icon slot="suffix" type="stock"></a-icon>
                        </a-input>
                    </a-form-model-item>

                </template>
                <a-form-model-item label="运费模版">
                    <a-select v-model="info.freight_id" :filter-option="false">
                        <a-select-option :value="0">默认运费</a-select-option>
                        <a-select-option v-for="(v,k) in freightList" :key="k" :value="v.id">{{v.name}}</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="商品详情">
                    <div>
                        <span :class="platform?'admin_editor_span':'admin_editor_span check'" @click="check_platform(false)">PC端</span>
                        <!--<span :class="platform?'admin_editor_span check':'admin_editor_span'" @click="check_platform(true)">Mobile端</span>-->
                        <wang-editor :contents="goods_content" @goods_content="goods_content_fun" />
                    </div>
                </a-form-model-item>
                <a-form-model-item label="上架状态">
                    <a-switch  v-model="info.goods_status" />
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>

            <!-- 属性规格选择 -->
            <goods-attr-modal :attrVisible="attrVisible" @goods_attr_modal_cancel="attrVisible=false" @goods_attr="goods_attr_chose" />

        </div>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/laravel-file-uploader"></script>
<script>
    import wangEditor from "@/components/wangeditor"
    import GoodsAttrModal from "@/components/admin/goods_attr_modal"
    export default {
        components: {wangEditor,GoodsAttrModal},
        props: {},
        data() {
            return {
                info:{
                    goods_video:'',
                    goods_images:[],
                    goods_status:true,
                    freight_id:0,
                },
                list:[],
                categoryList:[],
                storeList:[], //展馆列表
                brandList:[],// 品牌列表
                freightList:[], // 运费模版
                platform:false, // 平台PC false 手机 TRUE
                goods_content:'', // 商品详情
                id:0,
                goodsClassList:[],
                classInfo:[],

                // 规格属性modal
                attrVisible:false,
                goodsAttr:[],

                // 构建sku
                skuList:[],
                market_price_rate: 1,
                copy: 0,
                videoList:null
            };
        },
        watch: {},
        computed: {},
        methods: {
            handleSubmit(){
                // 验证代码处
                // if(this.$isEmpty(this.info.name)){
                //     return this.$message.error('分类名不能为空');
                // }

                let api = this.$apiHandle(this.$api.adminGoods,this.id);
                this.info.classInfo = this.classInfo; // 获取商品栏目
                this.info.skuList = this.skuList; // 获取商品SKU
                this.info.goods_status = this.info.goods_status?1:0;
                if(api.status && !this.copy){
                    this.$put(api.url,this.info).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            return this.$router.back();
                        }else{
                            return this.$message.error(res.msg)
                        }
                    })
                }else{
                    this.$post(this.$api.adminGoods,this.info).then(res=>{
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
                this.$get(this.$api.adminGoods+'/'+this.id).then(res=>{
                    this.goodsAttr = res.data.attrList||[];
                    this.skuList = res.data.skuList||[];
                    res.data.goods_status = res.data.goods_status==0?false:true;
                    this.info = res.data;
                    this.check_platform(false);
                    this.$forceUpdate();
                    if(this.copy)
                    {
                        this.info.goods_no = '';
                    }
                    if(this.info.goods_video)
                    {
                        this.videoList = [
                            {
                                uid: '1',
                                name: this.info.goods_video,
                                status: 'done',
                                url: this.info.goods_video,
                            },
                        ]
                    }
                })
            },
            get_freight_list(){
                this.$get(this.$api.adminFreights).then(res=>{
                    if(res.code == 200 && res.data.length>0){
                        res.data.splice(0,1);
                        this.freightList = res.data;
                    }
                })
            },

            onload(){
                var query=this.$route.query;
                this.copy = query.copy;

                // 判断你是否是编辑
                if(!this.$isEmpty(this.$route.params.id)){
                    this.id = this.$route.params.id;
                    this.get_info();
                }else{
                    this.$get(this.$api.homeConfig,{name:'goods_stock'}).then(res=>{
                        this.info.goods_stock = res.data;
                    })
                    this.info.goods_status = true;
                }
                this.$get(this.$api.homeConfig,{name:'market_price_rate'}).then(res=>{
                    this.market_price_rate = parseFloat(res.data);
                })
                this.$get(this.$api.adminAllGoodsBrands).then(res=>{
                    this.brandList = res.data;
                    //this.id ?  '' : this.info.brand_id = this.brandList[0].id;
                })
                this.$get(this.$api.adminStores,{all:1}).then(res=>{
                    this.storeList = res.data.data;
                })
                this.$get(this.$api.adminGoodsClasses,{}).then(res=>{
                    this.categoryList = res.data;
                });

                this.get_freight_list();

            },
            // 删除图片
            deleteImg(e){
                if(this.info.goods_images.length>1 && this.info.goods_images[e] == this.info.goods_master_image){
                    this.setMaster(0);
                }
                if(this.info.goods_images.length==1){
                    this.info.goods_master_image = '';
                }
                this.info.goods_images.splice(e,1);
            },
            // 设置主图
            setMaster(e){
                this.$set(this.info,'goods_master_image',this.info.goods_images[e]);
            },
            upload(e){
                if(e.file.status == 'done'){
                    let rs = e.file.response;
                    let imgs = this.info.goods_images;
                    let allowSetMaster = false;
                    if(rs.code == 200){
                        if(imgs.length==0){
                            allowSetMaster = true;
                        }
                        imgs.push(rs.data);
                        this.$set(this.info,'goods_images',imgs);
                        this.setMaster(0);
                    }else{
                        return this.$message.error(rs.msg);
                    }
                }

            },
            // 上传图片前
            beforeUpload(file,fileList){
                if(fileList.length+this.info.goods_images.length>5){
                    this.$message.error('No more than 5 pictures')
                    return false;
                }
            },
            // 编辑器内容修改
            goods_content_fun(val){
                if(!this.platform){
                    this.info.goods_content = val;
                }else{
                    this.info.goods_content_mobile = val;
                }
                this.goods_content = val;
            },
            // 编辑器切换平台
            check_platform(status){
                this.platform = status;
                if(!status){
                    this.goods_content = this.info.goods_content??'';
                }else{
                    this.goods_content = this.info.goods_content_mobile??'';
                }
            },
            // 打开属性modal
            open_attr_modal(){
                this.attrVisible = true;
            },
            // 属性选择
            goods_attr_chose(e){
                this.attrVisible=false;
                if(e.length<=0){
                    return;
                }

                e.forEach((items,k)=>{
                    let status = false;
                    this.goodsAttr.forEach(attrItems=>{
                        if(attrItems.id == items.id){
                            status = true;
                        }
                    })

                    if(!status){
                        this.goodsAttr.push(e[k]);
                    }

                })
                this.$forceUpdate();
            },
            // 规格选择
            specChange(attrs,specs){
                // console.log(attrs,specs)
                let index = -1;
                this.goodsAttr.forEach((items,key)=>{
                    if(items.id == attrs.id){
                        index = key;
                    }
                })
                this.goodsAttr[index].specs.forEach(items=>{
                    if(items.id == specs.id){
                        if(items.check == undefined){
                            items.check = true;
                        }else{
                            items.check = !items.check;
                        }

                    }
                })
                this.structureSku();
                this.$forceUpdate();
            },
            // 构建SKU
            structureSku(){
                let skuList = [];
                let attrList = [];
                let attrListName = [];
                let i=0;
                this.goodsAttr.forEach((items,key)=>{
                    let canPlus = false;
                    items.specs.forEach(specItem=>{
                        if(specItem.check){
                            if(this.$isEmpty(attrList[i])){
                                attrList[i] = [];
                                attrListName[i] = [];
                            }
                            attrList[i].push(specItem.id);
                            attrListName[i].push(specItem.name);
                            canPlus = true;
                        }
                    })
                    if(canPlus){
                        i++;
                    }
                })
                if(attrList.length<=0){
                    return this.skuList = [];
                }

                // 判断是否单选一个属性
                let attrName = []
                let attrId = [];
                if(attrList.length!=1){
                    attrName = this.cartesianProduct(attrListName);
                    attrId = this.cartesianProduct(attrList);
                    attrId.forEach((items,key)=>{
                        skuList.push({spec_id:items,sku_name:attrName[key],goods_market_price:0,goods_price:0,goods_stock:0,goods_weight:0});
                    })
                }else{
                    attrName = attrListName[0];
                    attrId = attrList[0];
                    attrId.forEach((items,key)=>{
                        skuList.push({spec_id:[items],sku_name:[attrName[key]],goods_market_price:0,goods_price:0,goods_stock:0,goods_weight:0});
                    })
                }

                // 判断是否有已经设置过金额的则不改变内容
                console.log(skuList.length,this.skuList.length)
                if(!this.$isEmpty(this.skuList[0]) && skuList[0].spec_id.length==this.skuList[0].spec_id.length){ // 如果规格数量不一致了则不变了直接替换
                    // 判断是否是规格减少了
                    if(skuList.length<this.skuList.length){

                        let skuListLength = this.skuList.length;
                        let strList = [];
                        for(let i=0;i<skuListLength;i++){
                            let ngt = false;
                            skuList.forEach(skuItem=>{
                                if(skuItem.spec_id.sort().toString() == this.skuList[i].spec_id.sort().toString()){
                                    ngt = true;
                                }
                            })
                            if(!ngt){
                                strList.push(this.skuList[i].spec_id.sort().toString());
                            }
                        }
                        for(let i=0;i<strList.length;i++){
                            let ngt = false;
                            this.skuList.forEach((skuItem,key)=>{
                                if(strList[i] == skuItem.spec_id.sort().toString()){
                                    ngt = true;
                                }
                                if(ngt){
                                    this.skuList.splice(key,1);
                                }
                            })

                        }
                    }else{
                        skuList.forEach(item=>{
                            let gt = false;
                            this.skuList.forEach(skuItem=>{
                                if(skuItem.spec_id.sort().toString() == item.spec_id.sort().toString()){
                                    gt = true;
                                }
                            })
                            if(!gt){
                                this.skuList.push(item);
                            }
                        })
                    }

                }else{
                    this.skuList = skuList;
                }



            },
            // 多数组求笛卡儿积
            cartesianProduct(array){
                if(array.length==1){
                    return array;
                }
                return array.reduce(function(a,b){
                    return a.map(function(x){
                        return b.map(function(y){
                            return x.concat(y);
                        })
                    }).reduce(function(a,b){ return a.concat(b) },[])
                }, [[]])
            },
            changeGoodsPrice(){
                this.info.goods_market_price = this.$formatFloat(this.info.goods_price * this.market_price_rate);
            },
            changeVideo(e)
            {
                this.videoList = e.fileList;  // 加这句就行了
                console.log(e.file.status);

                if (e.file.status !== 'uploading') {
                    console.log(e.file, e.fileList);
                }
                if (e.file.status === 'removed') {
                    this.info.goods_video = "";
                    console.log(1);
                    return true;
                }
                if (e.file.status === 'done') {
                    console.log(e);
                    if(typeof(e.file.response.code) == "undefined" || e.file.response.code == null || e.file.response.code == 200)
                    {
                        console.log( e.file.response.data[0].url);
                        this.info.goods_video =e.file.response.data[0].url;

                        this.videoList = [
                            {
                                uid: '1',
                                name: this.info.goods_video,
                                status: 'done',
                                url: this.info.goods_video,
                            },
                        ]

                        this.$message.success(`${e.file.name} 上传成功`);
                    }else{
                        this.$message.error(e.file.response.msg);
                    }
                } else if (e.file.status === 'error') {
                    this.$message.error(`${e.file.name} 上传失败.`);
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
    .admin_editor_span{
        margin-right: 10px;
        border:1px solid #efefef;
        line-height: 30px;
        padding: 4px 10px;
        border-radius: 3px;
        margin-bottom: 10px;
        cursor: pointer;
    &:hover{
         border-color: #ccc;
     }
    &.check{
         border-color: #ccc;
     }
    }
    .goods_upload_btn{
        margin-top: 10px;
    }
    .goods_specs{
        border:1px solid #efefef;
        margin-top: 10px;
    }
    .row_td{
        padding:8px;
    }
    .goods_image{
    .item{
    &.noimg{
         width:160px;
         height: 160px;
         background: #efefef;
         text-align: center;
         border-radius: 4px;
    i{
        font-size: 40px;
        line-height: 160px;
        color:#999;
    }
    }
    .item_img{
        width: 160px;
        height: 160px;
        display: block;
        float: left;
        box-sizing: border-box;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        border:1px solid #efefef;
    .item_bg{
        border-radius: 4px;
        text-align: center;
        line-height: 160px;
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        color:#fff;
        top:0;
        left:0;
        background: rgba(0,0,0,0.5);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
    i{
        padding: 0 14px;
        font-size: 16px;
        cursor: pointer;
    }
    }
    @media \0screen\,screen\9 {/* 只支持IE6、7、8 */
        .item_bg{
            background-color:#000;
            filter:Alpha(opacity=50);
            position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
            *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
        }
        .item_bg span{
            position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
        }
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .item_master{
        position: absolute;
        left:0;
        bottom: 0;
        border-radius: 0 0 4px 4px;
        background: #000;
        line-height: 26px;
        height: 26px;
        width: 100%;
        z-index: 3;
        background: rgba(0,0,0,0.5);
        color:#fff;
        text-align: center;
        font-size: 12px;
    }
    &:hover .item_bg{
         display: block;
     }
    }
    }
    }
    .row_th{
        background: #efefef;
    }
    .col_th{
        text-align: center;
    }
</style>