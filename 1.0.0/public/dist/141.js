(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[141],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      info: {},
      id: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      // 验证代码处
      if (this.$isEmpty(this.info.username)) {
        return this.$message.error('用户名不能为空');
      }

      if (this.$isEmpty(this.info.phone)) {
        return this.$message.error('手机不能为空');
      }

      var api = this.$apiHandle(this.$api.adminUsers, this.id);

      if (api.status) {
        this.$put(api.url, this.info).then(function (res) {
          if (res.code == 200) {
            _this.$message.success(res.msg);

            return _this.$router.back();
          } else {
            return _this.$message.error(res.msg);
          }
        });
      } else {
        this.$post(api.url, this.info).then(function (res) {
          if (res.code == 200) {
            _this.$message.success(res.msg);

            return _this.$router.back();
          } else {
            return _this.$message.error(res.msg);
          }
        });
      }
    },
    get_info: function get_info() {
      var _this2 = this;

      this.$get(this.$api.adminUsers + '/' + this.id).then(function (res) {
        res.data.password = undefined;
        _this2.info = res.data;
      });
    },
    // 获取列表
    onload: function onload() {
      // 判断你是否是编辑
      if (!this.$isEmpty(this.$route.params.id)) {
        this.id = this.$route.params.id;
        this.get_info();
      }
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        平台用户编辑\n    ")
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
          { attrs: { "label-col": { span: 5 }, "wrapper-col": { span: 12 } } },
          [
            _c(
              "a-form-model-item",
              { attrs: { label: "用户名" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.username,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "username", $$v)
                    },
                    expression: "info.username"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "手机号码" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.phone,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "phone", $$v)
                    },
                    expression: "info.phone"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "密码" } },
              [
                _c("a-input", {
                  attrs: { type: "password", placeholder: "" },
                  model: {
                    value: _vm.info.password,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "password", $$v)
                    },
                    expression: "info.password"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "昵称" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.nickname,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "nickname", $$v)
                    },
                    expression: "info.nickname"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { "wrapper-col": { span: 12, offset: 5 } } },
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

/***/ "./resources/js/views/Admin/users/form.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/Admin/users/form.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=00436a6c&scoped=true& */ "./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "00436a6c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/users/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/users/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=00436a6c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/users/form.vue?vue&type=template&id=00436a6c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_00436a6c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);