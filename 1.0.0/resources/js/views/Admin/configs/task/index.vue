<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            自动任务
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
                <a-form-model-item label="完成订单" :rules="{ required: true}"  extra="如果在期间未确认收货，系统自动完成收货，设置0天不自动收货">
                    <a-input-number  type="number" v-model="info.confirm" suffix="天" :min="0"></a-input-number >
                    天后自动关闭
                </a-form-model-item>
                <a-form-model-item label="取消订单" :rules="{ required: true}" extra="订单下单未付款，n天后自动关闭，设置0天则不自动关闭">
                    <a-input-number  type="number" v-model="info.cancel" suffix="天" :min="0"></a-input-number >
                    天后自动取消
                </a-form-model-item>
                <a-form-model-item label="结算订单" :rules="{ required: true}">
                    <a-input-number  type="number" v-model="info.settlement" suffix="天" :min="0"></a-input-number>
                    天后自动结算
                </a-form-model-item>
                <a-form-model-item label="售后" :rules="{ required: true}" extra="订单完成后 ，用户在n天内可以发起售后申请，设置0天不允许申请售后">
                    <a-input-number v-model="info.refund_days" suffix="天" style="width: 200px" :min="0"></a-input-number>
                    天内允许申请售后
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 12, offset: 4 }">
                    <a-button type="primary" @click="handleSubmit">提交</a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>

<script>

export default {
    data() {
      return {
          info:{},
      };
    },
    methods: {
        handleSubmit(){
            console.log(this.info)
            let info = JSON.stringify(this.info);
            this.$post(this.$api.adminConfigs,{task:info}).then(res=>{
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
                this.info = res.data.task;
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
<style lang="scss" scoped>

</style>