<template>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
        <a-form-model-item label="展馆视频">
            <file-uploader
                    :media="$info.store_video"
                    :unlimited="false"
                    collection="store_video"
                    name="store_video"
                    :tokens="$getSession('token_type')"
                    notes="格式要求: mp4"
                    accept="video/*"
                    @complete="handleComplete()"
            >

            </file-uploader>
        </a-form-model-item>


        <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script src="https://cdn.jsdelivr.net/npm/laravel-file-uploader"></script>
<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                info:{},
                media:'',
                loading:false,
            };
        },
        watch: {},
        computed: {},
        methods: {
            handleSubmit(){
                this.info.edit_type = 'store_video';
                this.$put(this.$api.adminStoreConfigs,this.info).then(res=>{
                    this.get_info();
                    return this.$returnInfo(res);
                })
            },
            get_info(){
                this.$get(this.$api.adminStoreConfigs,{'id':this.$route.query.id}).then(res=>{
                    this.info = res.data;
                })
            },
            handleComplete()
            {
                console.log(this)
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