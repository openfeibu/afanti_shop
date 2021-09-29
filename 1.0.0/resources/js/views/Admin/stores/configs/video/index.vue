<template>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
        <a-form-model-item label="展馆视频">
            <file-uploader
                    :unlimited="true"
                    collection="avatars"
                    :tokens="$getSession('token_type')"
                    notes="Supported types: mp4"
                    accept="video/mp4,video/mpeg,video/x-msvideo,video/quicktime,video/vnd.mpegurl"
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
                loading:false,
            };
        },
        watch: {},
        computed: {},
        methods: {
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