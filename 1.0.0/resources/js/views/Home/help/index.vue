<template>
    <div class="user_default">
        <div class="user_default_in w1200">
            <!-- 用户左侧栏目 -->
            <div class="user_left">
                <div class="user_nav">
                    <div class="block" v-for="(v,k) in helpList" :key="k">
                        <div class="title">
                            <!-- <a-font :type="v.icon"></a-font> -->
                            <span>{{v.name}}</span>
                        </div>
                        <div class="nav_item" :class="{'active':vo.id == id}" v-for="(vo,key) in v.articles" :key="key" @click="getDetail(vo.id)">{{vo.name}}</div>
                    </div>
                </div>
            </div>

            <div class="user_right">
                <div class="user_default2">
                    <div class="user_main">
                        <div class="block_title">
                            {{helpDetail.name}}
                        </div>
                        <div class="x20"></div>
                        <div class="content" v-html="helpDetail.content">
                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <loading v-if="isLoading" />
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            helpList:[],
            id:null,
            helpDetail:{
                name:''
            },
            isLoading:true
        };
    },
    watch: {},
    computed: {},
    methods: {
        homeHelp(){
            this.$get(this.$api.homeHelp).then(res=>{
                this.helpList = res.data;
                if(this.id == null){
                    this.id = this.helpList[0].articles[0].id;
                    
                }
                this.getDetail(this.id)
            })
        },
        getDetail(id){
            this.id  = id;
            this.isLoading=true;
            this.$get(this.$api.homeHelpDetail+'/'+id).then(res=>{
                this.helpDetail = res.data;
                this.isLoading=false
            })
        }
    },
    created() {
        this.id = this.$route.query.id || null
        this.homeHelp();
    },
    mounted() {},
    
};
</script>
<style lang="scss" scoped>
.user_default{
    background: #f1f1f1;
    padding-bottom: 30px;
}
.user_left{
    float: left;
    width: 234px;
    margin-right: 20px;
    .user_nav{
        margin-top: 20px;
        background: #fff;
        padding: 20px;
        .block{
            border-bottom: 1px solid #efefef;
            padding-bottom: 15px;
            margin-bottom: 15px;
            .nav_item{
                line-height: 35px;
                margin-left: 55px;
                cursor: pointer;
                color:#666;
                .router-link-active{
                    color: #4bb16f;
                    font-weight: bold;
                }
                &:hover{
                    color:#4bb16f;
                }
                &.active{
                    color:#4bb16f;
                }
            }
            &:last-child{
                border-bottom: none;
            }
        }
        .title{
            font-size: 16px;
            margin-bottom: 10px;
            i{
                color:#4bb16f;
                margin:0 6px 0 24px;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
    .user_info_block{
        background: #fff;
        padding: 20px;
        .user_stepbar{
            margin-top: 20px;
        }
        .user_safe{
            margin-top: 10px;
            i{
                margin-right: 6px;
            }
            .safe_icon .success{
                color:#67c23a;
            }
        }
        .progress{
            width: 120px;
        }
        dl{
            &:after{
                clear:both;
                display: block;
                content:'';
            }
            dt{
                float: left;
                margin-right: 15px;
                width: 60px;
                height: 60px;
                border: 1px solid #f4f4f4;
                border-radius: 50%;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
            }
            dd{
                font-size: 14px;
                float: left;
                margin-top: 10px;
                &.edit_user_info{
                    border: 1px solid #4bb16f;
                    line-height: 20px;
                    text-align: center;
                    padding: 0 15px;
                    margin-top: 5px;
                    a{
                        color: #1e8d44;
                    }
                }
            }
        }
    }
}
.user_right{
    float: left;
    width: 946px;
    padding-top: 20px;
}
</style>