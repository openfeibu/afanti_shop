<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <form id="my-form" class="am-form tpl-form-line-form" method="post">
                    <div class="widget-body">
                        <fieldset>
                            <div class="widget-head am-cf">
                                <div class="widget-title am-fl">编辑展馆</div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require"> 展馆名称 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="text" class="tpl-form-input" name="showroom[showroom_name]"
                                           placeholder="请输入展馆名称" value="" required>
                                </div>
                            </div>
                            <div class="am-form-group am-padding-top">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label"> 展馆简介 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <textarea class="am-field-valid" rows="5" placeholder="请输入展馆简介"
                                              name="showroom[description]"></textarea>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require"> 展馆门面 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <div class="am-form-file">
                                        <div class="am-form-file">
                                            <button type="button"
                                                    class="upload-file upload-file-face am-btn am-btn-secondary am-radius">
                                                <i class="am-icon-cloud-upload"></i> 选择图片
                                            </button>
                                            <div class="uploader-list uploader-list-face am-cf">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">展馆轮播图 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <div class="am-form-file">
                                        <button type="button"
                                                class="upload-file upload-file-slide am-btn am-btn-secondary am-radius">
                                            <i class="am-icon-cloud-upload"></i> 选择图片
                                        </button>
                                        <div class="uploader-list uploader-list-slide am-cf">

                                        </div>
                                    </div>
                                    <div class="help-block am-margin-top-sm">
                                        <small>大小2M以下 (可拖拽图片调整显示顺序 )</small>
                                    </div>
                                </div>
                            </div>
                            <div class="am-form-group am-form-file">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label">展馆视频 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <div class="am-form-file">
                                        <div class="upload-video" id="upload-video"> <i class="am-icon-cloud-upload"></i> 选择视频</div>
                                        <div class="uploader-list uploader-list-video am-cf">

                                        </div>
                                    </div>

                                    <div class="help-block am-margin-top-sm">
                                        <small>大小20M以下 (必须mp4)</small>
                                    </div>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label"> 监控频道号 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="text" class="tpl-form-input" name="showroom[monitoring_channel]"
                                           placeholder="请输入展馆监控频道号" value="">
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require">展馆排序 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="number" class="tpl-form-input" name="showroom[sort]"
                                           value="100" required>
                                    <small>数字越小越靠前</small>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require"> 线上展馆（可线上购物） </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <label class="am-radio-inline">
                                        <input type="radio" name="showroom[is_store]" value="1" data-am-ucheck checked>
                                        是
                                    </label>
                                    <label class="am-radio-inline">
                                        <input type="radio" name="showroom[is_store]" value="0" data-am-ucheck>
                                        否
                                    </label>
                                </div>
                            </div>
                            <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3 am-margin-top-lg">
                                    <button type="submit" class="j-submit am-btn am-btn-secondary">提交
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 图片文件列表模板 -->
{{include file="layouts/_template/tpl_file_item" /}}
{{include file="layouts/_template/tpl_video_item" /}}

<!-- 文件库弹窗 -->
{{include file="layouts/_template/file_library" /}}

<script src="assets/common/js/vue.min.js"></script>
<script src="assets/common/js/ddsort.js"></script>

<script>
    /**
     * 设置坐标
     */
    function setCoordinate(value) {
        var $coordinate = $('#coordinate');
        $coordinate.val(value);
        // 触发验证
        $coordinate.trigger('change');
    }
</script>
<script>
    $(function () {

        // 选择图片
        $('.upload-file-logo').selectImages({
            name: 'showroom[logo_image_id]'
            ,className: 'logo'
            , imagesList: '.uploader-list-logo'    // 图片列表容器
            , imagesItem: '.logo-item'       // 图片元素容器
            , imageDelete: '.logo-item-delete'  // 删除按钮元素
        });
        // 选择图片
        $('.upload-file-face').selectImages({
            name: 'showroom[face_image_id]'
            ,className: 'face'
            , imagesList: '.uploader-list-face'    // 图片列表容器
            , imagesItem: '.face-item'       // 图片元素容器
            , imageDelete: '.face-item-delete'  // 删除按钮元素
        });
        // 选择图片
        $('.upload-file-slide').selectImages({
            name: 'showroom[slides][]'
            ,className: 'slide'
            , imagesList: '.uploader-list-slide'    // 图片列表容器
            , imagesItem: '.slide-item'       // 图片元素容器
            , imageDelete: '.slide-item-delete'  // 删除按钮元素
            , multiple: true
        });
        // 图片列表拖动
        $('.uploader-list-slide').DDSort({
            target: '.slide-item',
            delay: 100, // 延时处理，默认为 50 ms，防止手抖点击 A 链接无效
            floatStyle: {
                'border': '1px solid #ccc',
                'background-color': '#fff'
            }
        });
        $('.upload-video').selectVideo({
            name: 'showroom[video]'
            ,pick:'#upload-video'
            ,className: 'video'
            , imagesList: '.uploader-list-video'    // 图片列表容器
            , imagesItem: '.video-item'       // 图片元素容器
            , imageDelete: '.video-item-delete'  // 删除按钮元素
            , multiple: true
        });
        /**
         * 表单验证提交
         * @type {*}
         */
        $('#my-form').superForm();
    });
</script>
