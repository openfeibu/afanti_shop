<template>
    <div class="afanti">
        <div class="admin_table_page_title">
            <a-button @click="$router.back()" class="float_right" icon="arrow-left">返回</a-button>
            网站配置
        </div>
        <div class="unline underm"></div>
        <div class="admin_form">
            <a-tabs :default-active-key="0" tab-position="left">
                <a-tab-pane :key="0" tab="网站配置">
                    <web-config></web-config>
                </a-tab-pane>
                <a-tab-pane :key="1" tab="退货地址">
                    <return-config></return-config>
                </a-tab-pane>
                <!--<a-tab-pane :key="2" tab="积分配置">-->
                    <!--<integral-config></integral-config>-->
                <!--</a-tab-pane>-->
            </a-tabs>
            
            
        </div>
    </div>
</template>

<script>
import webConfig from "./web.vue"
import returnConfig from "./return.vue"

export default {
    components: {webConfig,returnConfig},
};
</script>