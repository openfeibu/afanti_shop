(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[116],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      info: {}
    };
  },
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      var info = JSON.stringify(this.info);
      this.$post(this.$api.adminConfigs, {
        alioss: info
      }).then(function (res) {
        if (res.code == 200) {
          _this.$message.success(res.msg);

          return _this.onload();
        } else {
          return _this.$message.error(res.msg);
        }
      });
    },
    get_info: function get_info() {
      var _this2 = this;

      this.$get(this.$api.adminConfigs).then(function (res) {
        _this2.info = res.data.alioss;
      });
    },
    // 获取列表
    onload: function onload() {
      this.get_info();
    }
  },
  created: function created() {
    this.onload();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "qingwu" }, [
    _c(
      "div",
      { staticClass: "admin_table_page_title" },
      [
        _c(
          "a-button",
          {
            staticClass: "float_right",
            attrs: { icon: "arrow-left" },
            on: {
              click: function($event) {
                return _vm.$router.back()
              }
            }
          },
          [_vm._v("返回")]
        ),
        _vm._v("\n        上传配置\n    ")
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "unline underm" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "admin_form" },
      [
        _c(
          "a-form-model",
          { attrs: { "label-col": { span: 4 }, "wrapper-col": { span: 12 } } },
          [
            _c(
              "a-form-model-item",
              { attrs: { label: "存储方式(默认本地)" } },
              [
                _c("a-switch", {
                  attrs: {
                    "checked-children": "OSS",
                    "un-checked-children": "Local"
                  },
                  model: {
                    value: _vm.info.status,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "status", $$v)
                    },
                    expression: "info.status"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "OssAccessKeyId" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.access_id,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "access_id", $$v)
                    },
                    expression: "info.access_id"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "OssSecretAccess" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.access_key,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "access_key", $$v)
                    },
                    expression: "info.access_key"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "OssBucket" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.bucket,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "bucket", $$v)
                    },
                    expression: "info.bucket"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "OssEndpoint" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.endpoint,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "endpoint", $$v)
                    },
                    expression: "info.endpoint"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "CDN域名" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.cdnDomain,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "cdnDomain", $$v)
                    },
                    expression: "info.cdnDomain"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "是否SSL" } },
              [
                _c("a-switch", {
                  model: {
                    value: _vm.info.ssl,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "ssl", $$v)
                    },
                    expression: "info.ssl"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "内部节点" } },
              [
                _c("a-switch", {
                  model: {
                    value: _vm.info.isCName,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "isCName", $$v)
                    },
                    expression: "info.isCName"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { "wrapper-col": { span: 12, offset: 4 } } },
              [
                _c(
                  "a-button",
                  {
                    attrs: { type: "primary" },
                    on: { click: _vm.handleSubmit }
                  },
                  [_vm._v("提交")]
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/configs/oss/alioss.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/Admin/configs/oss/alioss.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alioss.vue?vue&type=template&id=46721724&scoped=true& */ "./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true&");
/* harmony import */ var _alioss_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alioss.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _alioss_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "46721724",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/configs/oss/alioss.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_alioss_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./alioss.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_alioss_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./alioss.vue?vue&type=template&id=46721724&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/oss/alioss.vue?vue&type=template&id=46721724&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_alioss_vue_vue_type_template_id_46721724_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);