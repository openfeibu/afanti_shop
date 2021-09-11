<template>
    <div class="fb-loading" >
        <div class="loader-inner ball-clip-rotate-pulse">
                <div></div>
                <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading' // 定义的组件名称 使用时写法：loading
    
};
</script>
<style lang="scss" scoped>

.fb-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99999;
    top: 0;
    left: 0;
  
}

.ball-clip-rotate-pulse {
    position: relative;
    -webkit-transform: translateY(-15px);
    -ms-transform: translateY(-15px);
    transform: translateY(-15px);
    width: 120px;
    height: 120px;
    left: 50%;
    margin-left: -60px;
    top: 50%;
    margin-top: -60px;
}

.ball-clip-rotate-pulse>div {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 100%;
}

.ball-clip-rotate-pulse>div:first-child {
    background: #fff;
    height: 100px;
    width: 100px;
    top: 10px;
    left: 10px;
   background: #fff url('~@/asset/pc/logo.png') no-repeat center / 80% auto;
    -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
}

.ball-clip-rotate-pulse>div:last-child {
    position: absolute;
    border: 2px solid #fff;
    width: 120px;
    height: 120px;
    background: transparent;
    border: 2px solid;
    border-color: #fff transparent #fff transparent;
    -webkit-animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(0.6);
        transform: rotate(180deg) scale(0.6);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}

@-webkit-keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(0.6);
        transform: rotate(180deg) scale(0.6);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}

@-webkit-keyframes scale {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
    45% {
        -webkit-transform: scale(0.3);
        transform: scale(0.3);
        opacity: 0.9;
    }
    80% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes scale {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1
    }
    45% {
        -webkit-transform: scale(0.3);
        transform: scale(0.3);
        opacity: 0.9;
    }
    80% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

</style>