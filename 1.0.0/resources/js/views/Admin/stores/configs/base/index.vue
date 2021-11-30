<template>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
        <a-form-model-item label="展馆LOGO">
            <a-upload
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="$api.adminStoreConfigs+'/upload/images'"
                :data="{token:$getSession('token_type'),name:'store_logo',id:this.$route.params.id}"
                @change="upload"
            >
                <img v-if="info.store_logo" :src="info.store_logo" />
                <div v-else>
                    <a-font v-if="!loading" type='iconplus' />
                    <a-icon v-else type="loading" />
                </div>
            </a-upload>
        </a-form-model-item>
        <a-form-model-item label="展馆名称">
            <a-input v-model="info.store_name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="展馆描述">
            <a-textarea placeholder="展馆描述" v-model="info.store_description" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="是否线上商店">
            <a-switch  v-model="info.is_store" />
        </a-form-model-item>
        
        <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import wangEditor from "@/components/wangeditor"
export default {
    components: {wangEditor},
    props: {},
    data() {
      return {
          info:{
              is_store: 1,
          },
          loading:false,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){
            this.info.edit_type = 'base';
            this.info.is_store = this.info.is_store ? 1 :0;
            console.log( this.info.is_store);
            this.$put(this.$api.adminStoreConfigs,this.info).then(res=>{
                this.get_info();
                return this.$returnInfo(res);
            })
        },
        upload(e){
            if(e.file.status == 'done'){
                this.loading = false;
                let rs = e.file.response;
                if(rs.code == 200){
                    this.$set(this.info,'store_logo',rs.data);
                }else{
                    return this.$message.error(rs.msg);
                }
            }else{
                this.loading = true;
            }
            
        },
        // 编辑器内容修改
        goods_content_fun(val){
            this.info.after_sale_service = val;
        },
        get_info(){
            this.$get(this.$api.adminStoreConfigs,{'id':this.$route.query.id}).then(res=>{
                this.info = res.data;
            })
        }
    },
    created() {
        this.get_info();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>

</style>