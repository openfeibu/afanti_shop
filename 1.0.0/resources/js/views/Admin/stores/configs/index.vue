<template>
    <div class="qingwu">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            商家配置
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-tabs :default-active-key="0" tab-position="left">
                
                <a-tab-pane :key="0" tab="基本信息">
                    <base-info />
                </a-tab-pane>
                <a-tab-pane :key="1" tab="门面设置">
                    <face />
                </a-tab-pane>
                <a-tab-pane :key="3" tab="幻灯片设置">
                    <pc-slide />
                </a-tab-pane>
            </a-tabs>
            
            
        </div>
    </div>
</template>

<script>
import baseInfo from "./base/index"
import face from "./face/index"
import pcSlide from "./slide/pc"

export default {
    components: {baseInfo,face,pcSlide},
};
</script>
<style lang="scss" scoped>

</style>