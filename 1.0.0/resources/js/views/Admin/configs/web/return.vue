<template>

    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
        <a-form-model-item label="收货人" >
            <a-input v-model="info.name" placeholder="" />
        </a-form-model-item>
        <a-form-model-item label="收货手机号码" >
            <a-input v-model="info.phone" placeholder="" />
        </a-form-model-item>
        <a-form-model-item label="收货地址" >
            <a-input v-model="info.address" placeholder="" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-model-item>
    </a-form-model>


</template>

<script>
    export default {
        data() {
            return {
                info:{
                },
            };
        },
        methods: {
            handleSubmit(){
                let info = JSON.stringify(this.info);
                this.$post(this.$api.adminConfigs,{'return_address':info}).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        return this.onload();
                    }else{
                        return this.$message.error(res.msg)
                    }
                })
            },
            get_info(){
                this.$get(this.$api.adminConfigs).then(res=>{
                    this.info = res.data.return_address;
                })
            },
            // 获取列表
            onload(){
                this.get_info();
            },

        },
        created() {
            this.onload();
        },
    };
</script>
