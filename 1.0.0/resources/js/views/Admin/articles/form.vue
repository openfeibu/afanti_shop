<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            文章编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="文章分类" :rules="{ required: true}">
                    <a-select v-model="info.article_category_id" :filter-option="false">
                        <a-select-option v-for="(v,k) in article_categories" :key="k" :value="v.id">{{v.name}}</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="标题">
                    <a-input v-model="info.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="英文名">
                    <a-input v-model="info.ename"></a-input>
                </a-form-model-item>
                <a-form-model-item label="内容">
                    <wang-editor :contents="info.content" @goods_content="goods_content_fun" />
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>
            
        </div>
    </div>
</template>

<script>
import wangEditor from "@/components/wangeditor"
export default {
    components: {wangEditor},
    props: {},
    data() {
      return {
          info:{
              article_category_id:0,
          },
          list:[],
          id:0,
          article_categories:[],
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            if(this.$isEmpty(this.info.article_category_id)){
                return this.$message.error('请选择分类');
            }

            // 验证代码处
            if(this.$isEmpty(this.info.name)){
                return this.$message.error('标题不能为空');
            }
//            if(this.$isEmpty(this.info.ename)){
//                return this.$message.error('英文名不能为空');
//            }

            let api = this.$apiHandle(this.$api.adminArticles,this.id);
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
        get_article_categories(){
            this.$get(this.$api.adminArticleCategories,this.params).then(res=>{
                this.article_categories = res.data;
            });
        },
        get_info(){
            this.$get(this.$api.adminArticles+'/'+this.id).then(res=>{
                this.info = res.data;
                console.log(this.info.content);
            })
        },
        // 获取菜单列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
            this.get_article_categories();
        },
        // 编辑器内容修改
        goods_content_fun(val){
            this.info.content = val;
        },
        
    },
    created() {
        this.onload();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>