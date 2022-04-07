<link rel="stylesheet" href="assets/common/plugins/umeditor/themes/default/css/umeditor.css">
<link rel="stylesheet" href="assets/store/css/diy.css?v=<?= $version ?>">
<div class="row-content am-cf">
    <div class="widget am-cf">
        <div class="widget-body">
            <!-- diy 工作区 -->
            <div id="app" class="work-diy dis-flex flex-x-between">
                <!--手机diy容器-->
                <div class="diy-phone" v-cloak>

                    <!-- 小程序内容区域 -->
                    <div id="phone-main" class="phone-main" v-cloak>
                        <draggable :list="diyData.items" class="dragArea" @update="onDragItemEnd"
                                   :options="{animation: 120, filter: '.drag__nomove' }">
                            <template v-for="(item, index) in diyData.items">

                                <!-- diy元素: 图片轮播 -->
                                <template v-if="item.type == 'banner'">
                                    <div class="drag optional" @click.stop="onEditer(index)"
                                         :class="{selected: index === selectedIndex}">
                                        <div class="diy-banner">
                                            <img v-for="(banner, index) in item.data" v-if="index <= 1"
                                                 :src="banner.imgUrl">
                                            <div class="dots center" :class="item.style.btnShape">
                                                    <span v-for="banner in item.data"
                                                          :style="{background:item.style.btnColor}"></span>
                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                </template>

                            </template>
                        </draggable>
                    </div>
                </div>

                <!-- 编辑器容器 -->
                <div id="diy-editor" ref="diy-editor" class="diy-editor form-horizontal"
                     :style="{ visibility: selectedIndex != -1 ? 'visible' : 'hidden' } " v-cloak>

                    <template v-if="diyData.items.length && curItem">
                        <!-- 编辑器: 图片轮播 -->
                        <div id="tpl_editor_banner" v-if="curItem.type == 'banner'">
                            <div class="editor-title"><span>{{curItem.name}}</span></div>
                            <form class="am-form tpl-form-line-form">
                                <div class="am-form-group">
                                    <label class="am-u-sm-3 am-form-label am-text-xs">指示点形状 </label>
                                    <div class="am-u-sm-9 am-u-end">
                                        <label class="am-radio-inline">
                                            <input type="radio" value="round"
                                                   v-model="curItem.style.btnShape"> 圆形
                                        </label>
                                        <label class="am-radio-inline">
                                            <input type="radio" value="square"
                                                   v-model="curItem.style.btnShape"> 正方形
                                        </label>
                                        <label class="am-radio-inline">
                                            <input type="radio" value="rectangle"
                                                   v-model="curItem.style.btnShape"> 长方形
                                        </label>
                                    </div>
                                </div>
                                <div class="am-form-group">
                                    <label class="am-u-sm-3 am-form-label am-text-xs">指示点颜色 </label>
                                    <div class="am-u-sm-9 am-u-end">
                                        <input class="" type="color"
                                               v-model="curItem.style.btnColor">
                                        <button type="button" class="btn-resetColor am-btn am-btn-xs"
                                                @click.stop="onEditorResetColor(curItem.style, 'btnColor', '#ffffff')">
                                            重置
                                        </button>
                                    </div>
                                </div>
                                <div class="am-form-group">
                                    <label class="am-u-sm-3 am-form-label am-text-xs"> 切换时间 </label>
                                    <div class="am-u-sm-8 am-u-end">
                                        <input class="tpl-form-input" type="number"
                                               v-model="curItem.params.interval">
                                        <div class="help-block">
                                            <small>轮播图自动切换的间隔时间，单位：毫秒</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-items">
                                    <draggable :list="curItem.data"
                                               :options="{ animation: 120, filter: 'input', preventOnFilter: false }">
                                        <div class="form-item"
                                             v-for="(banner, index) in curItem.data">
                                            <i class="iconfont icon-shanchu item-delete"
                                               @click="onEditorDeleleData(index, selectedIndex)"></i>
                                            <div class="item-inner">
                                                <div class="am-form-group">
                                                    <label class="am-u-sm-3 am-form-label am-text-xs">图片 </label>
                                                    <div class="am-u-sm-8 am-u-end">
                                                        <div class="data-image">
                                                            <img :src="banner.imgUrl" alt=""
                                                                 @click="onEditorSelectImage(banner, 'imgUrl')">
                                                        </div>
                                                        <div class="help-block">
                                                            <small>建议尺寸750x360</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label class="am-u-sm-3 am-form-label am-text-xs">链接地址 </label>
                                                    <div class="am-u-sm-8 am-u-end">
                                                        <input type="text" value=""
                                                               v-model='banner.linkUrl'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </draggable>
                                </div>
                                <div class="j-data-add form-item-add" @click="onEditorAddData">
                                    <i class="fa fa-plus"></i> 添加一个
                                </div>
                            </form>
                        </div>

                    </template>
                </div>
            </div>
            <!-- 提示 -->
            <div class="tips am-margin-top-lg am-margin-bottom-sm">
                <div class="pre">
                    <p>1. 设计完成后点击"保存页面"，在小程序端页面下拉刷新即可看到效果。</p>
                    <p>2. 如需填写链接地址请参考<a href="<?= url('wxapp.page/links') ?>" target="_blank">页面链接</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 文件库弹窗 -->
{{include file="layouts/_template/file_library" /}}

<script src="assets/common/js/vue.min.js?v=<?= $version ?>"></script>
<script src="assets/common/js/Sortable.min.js?v=<?= $version ?>"></script>
<script src="assets/common/js/vuedraggable.min.js?v=<?= $version ?>"></script>
<script src="assets/store/js/select.data.js?v=<?= $version ?>"></script>
<script src="assets/common/plugins/umeditor/umeditor.config.js?v=<?= $version ?>"></script>
<script src="assets/common/plugins/umeditor/umeditor.min.js?v=<?= $version ?>"></script>
<script src="assets/store/js/diy.js?v=<?= $version ?>"></script>
<script>

    $(function () {

        // 渲染diy页面
        new diyPhone(<?= $defaultData ?>, <?= $jsonData ?>, <?= $opts ?>);

    });

</script>