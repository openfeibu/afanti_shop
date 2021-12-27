<template>
    <div class="create_order_1 w1200 clear">
        <div id="video_content" v-for="(value,name) in equipments" :key="index">
            <div :id="'myPlayer_'+name">{{ value }}</div>
        </div>

    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {
                equipments:[],
            };
        },
        watch: {},
        computed: {},
        methods: {
            onload(){
                this.get_equipments();
            },
            get_equipments()
            {
                var vm = this;
                this.$get(this.$api.homeEzviz+"/equipments").then(res=>{
                    var access_token = res.data.access_token;
                    //console.log(access_token);

                    //console.log( JSON.stringify(res.data.equipments));return false;
                    var equipments = [];
                    Object.getOwnPropertyNames(res.data.equipments).forEach(function(key){
                        equipments[key] = res.data.equipments[key];
                    });

                    vm.equipments = equipments;
                    console.log(vm.equipments);
                })
            },
        },
        created() {
            this.onload();
        },
        mounted() {

            this.equipments.forEach((item, index) => {
                console.log("myPlayer_" + index);
                new EZUIKit.EZUIKitPlayer({
                    id: "myPlayer_" + index, // 视频容器ID
                    accessToken: access_token,
                    url: item,
                    template: 'theme',//
                    autoplay: true,
                    plugin: [],// 加载插件，talk-对讲
                    //startTalk: ()=> this.playr.startTalk(),
                    //stopTalk: ()=> this.playr.stopTalk(),
                    width: 600,
                    height:400,
                })
            })
        },
        beforeDestroy(){
            if(this.modal != null){
                this.modal.destroy();
            }

        }
    };
</script>
