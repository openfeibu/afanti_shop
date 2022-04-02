<script id="tpl-video-item" type="text/template">
    {{ each list }}
    <div class="file-item {{ class_name }}-item " >
        <a href="{{ $value.file_name }}" title="点击查看视频" target="_blank">
            {{ $value.file_name}}
        </a>
        <input type="hidden" name="{{ name }}" value="{{ $value.file_name }}">
        <i class="iconfont icon-shanchu file-item-delete {{ class_name }}-item-delete"></i>
    </div>
    {{ /each }}
</script>


