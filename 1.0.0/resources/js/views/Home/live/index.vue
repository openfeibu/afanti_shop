<template>
    <div class="home_store_info">
  
        <div id="monitoring_video"></div>
      
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
          id:0,
          
          store_info:{
              area_info:'',
              store_address:'',
              sale_list:[],
          },
        
          isFav:false,
          isLoading:true,
          visible:false

      };
    },
    watch: {},
    computed: {},
    methods: {
        monitoringFun(){
             var that = this;
            
              if(that.store_info.equipment_url && that.store_info.access_token)
                {
                    that.visible = true;
                    
                    setTimeout(function(){
                        new EZUIKit.EZUIKitPlayer({
                            id: "monitoring_video", // 视频容器ID
                            accessToken: that.store_info.access_token,
                            url: that.store_info.equipment_url,
                            template: 'theme',//
                            autoplay: true,
                            plugin: [],// 加载插件，talk-对讲
                            //startTalk: ()=> that.playr.startTalk(),
                            //stopTalk: ()=> that.playr.stopTalk(),
                            width: '100%',
                            height:'300px',
                        })
                    },500)
                    
                    
                }
        },
        monitoringonClose(){
            this.visible = false;
            $("#monitoring_video").html('');
        },
        get_store_info(){
            this.$get(this.$api.homeStore+'/'+this.id).then(res=>{
                this.store_info = res.data;
                this.monitoringFun();
            })
        },
       
     
      
    },
    created() {
        if(!this.$isEmpty(this.$route.query.id)){
            this.id = this.$route.query.id;
        }
        console.log(this.$route.query.id)
        this.get_store_info();
   
    },
    mounted() {}
};
</script>
<style lang="scss" >
body{background: #000;}
.home,.home_store_info{height: 100%;overflow: hidden;}
.home .shop_head3,.footerbg{display: none;}
#monitoring_video{height: 300px;top: 50%;margin-top:-200px;position: absolute;}
</style>