<template>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
        <!--
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
        -->
        <a-form-model-item label="展馆视频"  extra="格式要求: mp4">
            <template>
            <a-upload
                    action="/api/uploader/media/upload"
                    accept="video/*"
                    @change="change"
                    :file-list="fileList"

            >
                <a-button> <a-icon type="upload" /> Upload </a-button>
            </a-upload>
            </template>
        </a-form-model-item>
        <!--
        <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-model-item>
        -->
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
                //store_video:{},
                loading:false,
                fileList: null,
            };
        },
        watch: {},
        computed: {},
        methods: {
            change(e)
            {
                this.fileList = e.fileList;  // 加这句就行了
                console.log(e.file.status);

                if (e.file.status !== 'uploading') {
                    console.log(e.file, e.fileList);
                }
                if (e.file.status === 'removed') {
                    this.info.store_video = "";
                    console.log(1);
                    this.handleSubmit();
                    return true;
                }
                if (e.file.status === 'done') {
                    console.log(e);
                    if(typeof(e.file.response.code) == "undefined" || e.file.response.code == null || e.file.response.code == 200)
                    {
                        console.log( e.file.response.data[0].url);
                        this.info.store_video =e.file.response.data[0].url;
                        this.$message.success(`${e.file.name} 上传成功`);
                        this.handleSubmit();
                    }else{
                        this.$message.error(e.file.response.msg);
                    }
                } else if (e.file.status === 'error') {
                    this.$message.error(`${e.file.name} 上传失败.`);
                }
            },
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
                    if(this.info.store_video)
                    {
                        this.fileList = [
                            {
                                uid: '1',
                                name: this.info.store_video,
                                status: 'done',
                                url: this.info.store_video,
                            },
                        ]
                    }
                })
            },
            handleComplete(e)
            {
                console.log(e);
            },

        },
        created() {
            this.get_info();
        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>

</style>