(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[111],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);

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
      info: {
        adv_type: 0
      },
      list: [],
      id: 0,
      loading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    moment: moment__WEBPACK_IMPORTED_MODULE_1___default.a,
    handleSubmit: function handleSubmit() {
      var _this = this;

      // 验证代码处
      if (this.$isEmpty(this.info.ap_id)) {
        return this.$message.error('广告位不能为空');
      }

      if (this.$isEmpty(this.info.name)) {
        return this.$message.error('广告名不能为空');
      }

      var api = this.$apiHandle(this.$api.adminAdvs, this.id);

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

      this.$get(this.$api.adminAdvs + '/' + this.id).then(function (res) {
        _this2.info = res.data;
      });
    },
    // 获取菜单列表
    onload: function onload() {
      var _this3 = this;

      // 判断你是否是编辑
      if (!this.$isEmpty(this.$route.params.id)) {
        this.id = this.$route.params.id;
        this.get_info();
      } // 判断是否从广告位过来


      if (!this.$isEmpty(this.$route.query.ap_id)) {
        this.info.ap_id = parseInt(this.$route.query.ap_id);
      }

      this.$get(this.$api.adminAdvPositions, {
        per_page: 100
      }).then(function (res) {
        _this3.list = res.data.data;
      });
    },
    time_format: function time_format(val) {
      this.info.adv_start = moment__WEBPACK_IMPORTED_MODULE_1___default()(val[0]._d).format("YYYY-MM-DD HH:mm:ss");
      this.info.adv_end = moment__WEBPACK_IMPORTED_MODULE_1___default()(val[1]._d).format("YYYY-MM-DD HH:mm:ss");
      this.$forceUpdate();
    },
    upload: function upload(e) {
      if (e.file.status == 'done') {
        this.loading = false;
        var rs = e.file.response;

        if (rs.code == 200) {
          this.$set(this.info, 'image_url', rs.data);
        } else {
          return this.$message.error(rs.msg);
        }
      } else {
        this.loading = true;
      }
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        广告编辑\n    ")
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
              { attrs: { label: "广告位" } },
              [
                _c(
                  "a-select",
                  {
                    model: {
                      value: _vm.info.ap_id,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "ap_id", $$v)
                      },
                      expression: "info.ap_id"
                    }
                  },
                  _vm._l(_vm.list, function(v, k) {
                    return _c(
                      "a-select-option",
                      { key: k, attrs: { value: v.id } },
                      [_vm._v(_vm._s(v.ap_name))]
                    )
                  }),
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "广告名" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.name,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "name", $$v)
                    },
                    expression: "info.name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "广告图片" } },
              [
                _c(
                  "a-upload",
                  {
                    staticClass: "avatar-uploader",
                    attrs: {
                      "list-type": "picture-card",
                      "show-upload-list": false,
                      action: _vm.$api.adminAdvsUploadThumb,
                      data: { token: _vm.$getSession("token_type") }
                    },
                    on: { change: _vm.upload }
                  },
                  [
                    _vm.info.image_url
                      ? _c("img", {
                          staticStyle: { "max-width": "600px" },
                          attrs: { src: _vm.info.image_url }
                        })
                      : _c(
                          "div",
                          [
                            !_vm.loading
                              ? _c("a-font", { attrs: { type: "iconplus" } })
                              : _c("a-icon", { attrs: { type: "loading" } })
                          ],
                          1
                        )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "链接" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.url,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "url", $$v)
                    },
                    expression: "info.url"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "时间" } },
              [
                _c("a-range-picker", {
                  attrs: {
                    value: [
                      _vm.moment(_vm.info.adv_start),
                      _vm.moment(_vm.info.adv_end)
                    ],
                    format: "YYYY-MM-DD HH:mm:ss",
                    "show-time": ""
                  },
                  on: { change: _vm.time_format }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "类型" } },
              [
                _c(
                  "a-select",
                  {
                    model: {
                      value: _vm.info.adv_type,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "adv_type", $$v)
                      },
                      expression: "info.adv_type"
                    }
                  },
                  [
                    _c("a-select-option", { attrs: { value: 0 } }, [
                      _vm._v("默认")
                    ])
                  ],
                  1
                )
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

/***/ "./resources/js/views/Admin/advs/form.vue":
/*!************************************************!*\
  !*** ./resources/js/views/Admin/advs/form.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=47882e44&scoped=true& */ "./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "47882e44",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/advs/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/advs/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=47882e44&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/advs/form.vue?vue&type=template&id=47882e44&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_47882e44_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);