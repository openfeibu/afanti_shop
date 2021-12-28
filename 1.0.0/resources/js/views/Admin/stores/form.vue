<template>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">

        <a-form-model-item label="展馆名称">
            <a-input v-model="info.store_name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="展馆描述">
            <a-textarea placeholder="展馆描述" v-model="info.store_description" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="是否线上商店">
            <a-switch  v-model="info.is_store" />
        </a-form-model-item>
        <a-form-model-item label="摄像头通道号">
            <a-input v-model="info.monitoring_channel"></a-input>
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
                this.info.is_store = this.info.is_store ? 1 :0;
                console.log( this.info.is_store);
                let that = this;
                this.$post(this.$api.adminStores,this.info).then(res=>{
                    return that.$router.push("/Admin/stores/configs?id="+res.data.id);
                })
            },

        },
        created() {

        },
        mounted() {}
    };
</script>
<style lang="scss" scoped>

</style>