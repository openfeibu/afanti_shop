<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            信标编辑
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

                <a-form-model-item label="Major ID">
                    <a-input v-model="info.major_id"></a-input>
                </a-form-model-item>

                <a-form-model-item label="展馆" :rules="{ required: true}">
                    <a-select v-model="info.store_id" :filter-option="false">
                        <a-select-option v-for="(v,k) in storeList" :key="k" :value="v.id">{{v.store_name}}</a-select-option>
                    </a-select>
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

          },
          storeList:[],
          list:[],
          id:0,
      };
    },
    watch: {},
    computed: {},
    methods: {
        handleSubmit(){

            let api = this.$apiHandle(this.$api.adminBeacons,this.id);
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
            this.$get(this.$api.adminBeacons+'/'+this.id).then(res=>{
                this.info = res.data;
            })
        },
        // 获取菜单列表
        onload(){
            // 判断你是否是编辑
            if(!this.$isEmpty(this.$route.params.id)){
                this.id = this.$route.params.id;
                this.get_info();
            }
            this.$get(this.$api.adminStores).then(res=>{
                this.storeList = res.data.data;
            })
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