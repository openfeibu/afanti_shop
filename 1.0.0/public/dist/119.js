(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[119],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      info: {}
    };
  },
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      console.log(this.info);
      var info = JSON.stringify(this.info);
      this.$post(this.$api.adminConfigs, {
        task: info
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
        _this2.info = res.data.task;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true& ***!
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
        _vm._v("\n        自动任务\n    ")
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
              { attrs: { label: "完成订单" } },
              [
                _c("a-input", {
                  attrs: { type: "number", suffix: "天" },
                  model: {
                    value: _vm.info.confirm,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "confirm", $$v)
                    },
                    expression: "info.confirm"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "取消订单" } },
              [
                _c("a-input", {
                  attrs: { type: "number", suffix: "天" },
                  model: {
                    value: _vm.info.cancel,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "cancel", $$v)
                    },
                    expression: "info.cancel"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "结算订单" } },
              [
                _c("a-input", {
                  attrs: { type: "number", suffix: "天" },
                  model: {
                    value: _vm.info.settlement,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "settlement", $$v)
                    },
                    expression: "info.settlement"
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

/***/ "./resources/js/views/Admin/configs/task/index.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/Admin/configs/task/index.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=c5843df6&scoped=true& */ "./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c5843df6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/configs/task/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/task/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=c5843df6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/configs/task/index.vue?vue&type=template&id=c5843df6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c5843df6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);