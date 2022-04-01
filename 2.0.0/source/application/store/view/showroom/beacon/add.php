<div class="row-content am-cf">
    <div class="row">
        <div class="am-u-sm-12 am-u-md-12 am-u-lg-12">
            <div class="widget am-cf">
                <form id="my-form" class="am-form tpl-form-line-form" method="post">
                    <div class="widget-body">
                        <fieldset>
                            <div class="widget-head am-cf">
                                <div class="widget-title am-fl">添加蓝牙信标</div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label"> 所属展馆 </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <select name="beacon[showroom_id]"
                                            data-am-selected="{searchBox: 1, btnSize: 'sm', placeholder:'请选择', maxHeight: 400}"
                                            >
                                        <option value=""></option>
                                        <?php if (isset($showroomList) && !$showroomList->isEmpty()):
                                            foreach ($showroomList as $item): ?>
                                                <option value="<?= $item['showroom_id'] ?>">
                                                    <?= $item['showroom_name'] ?></option>
                                            <?php endforeach; endif; ?>
                                    </select>
                                </div>
                            </div>

                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-u-lg-2 am-form-label form-require"> Major ID </label>
                                <div class="am-u-sm-9 am-u-end">
                                    <input type="text" class="tpl-form-input" name="beacon[major_id]"
                                           placeholder="请输入Major ID" value="" required>
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


<script>
    $(function () {



        /**
         * 表单验证提交
         * @type {*}
         */
        $('#my-form').superForm();
    });
</script>
