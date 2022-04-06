<script id="tpl-video-item" type="text/template">

    <div class="file-item {{ class_name }}-item " >
        <a href="uploads/{{ file_name }}" title="点击查看视频" target="_blank">
            {{ file_name}}
        </a>
        <input type="hidden" name="{{ name }}" value="{{ file_name }}">
        <i class="iconfont icon-shanchu file-item-delete {{ class_name }}-item-delete"></i>
    </div>

</script>


