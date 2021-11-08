<div style="text-align: center;margin: 100px auto;height: 500px;width: 400px">授权登陆中...</div>

<script>

    window.onload = function () {
        //窗口通信函数api 将token发送给前一个页面 文档说明地址 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
        var data = {!! json_encode($data) !!};
        console.log(data);
        window.opener.postMessage(data, "{{ $domain }}");
        window.close();
    }
</script>