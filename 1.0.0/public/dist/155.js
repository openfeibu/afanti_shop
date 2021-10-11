(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[155],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
        refund_type: 0,
        order_id: 0,
        delivery_no: '',
        delivery_code: 'yd'
      },
      params: {}
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      this.$put(this.$api.homeRefunds + '/' + this.info.order_id, {
        delivery_no: this.info.delivery_no
      }).then(function (res) {
        _this.$returnInfo(res);

        return _this.get_info();
      });
    },
    handleSubmit2: function handleSubmit2() {
      var _this2 = this;

      this.$put(this.$api.homeRefunds + '/' + this.info.order_id, {
        refund_step: 3
      }).then(function (res) {
        _this2.$returnInfo(res);

        return _this2.get_info();
      });
    },
    get_info: function get_info() {
      var _this3 = this;

      this.$get(this.$api.homeRefunds + '/' + this.info.order_id).then(function (res) {
        _this3.info = res.data;
      });
    }
  },
  created: function created() {
    this.info.order_id = this.$route.params.id;
    this.get_info();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "user_user_info" }, [
    _c("div", { staticClass: "user_main" }, [
      _c("div", { staticClass: "block_title" }, [
        _vm._v("\n            申请售后\n        ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "x20" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "uif_block" },
        [
          _c(
            "a-form-model",
            {
              attrs: { "label-col": { span: 5 }, "wrapper-col": { span: 12 } }
            },
            [
              _c("a-form-model-item", { attrs: { label: "售后类型" } }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(
                      _vm.info.refund_type == 0
                        ? "退款"
                        : _vm.info.refund_type == 1
                        ? "退换货"
                        : "售后结束"
                    ) +
                    "\n                "
                )
              ]),
              _vm._v(" "),
              _c("a-form-model-item", { attrs: { label: "售后原因" } }, [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.info.refund_remark) +
                    "\n                "
                )
              ]),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "申请售后状态" } },
                [
                  _vm.info.refund_verify == 0
                    ? _c("a-tag", [_vm._v("等待审核")])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.info.refund_verify == 1
                    ? _c("a-tag", { attrs: { color: "green" } }, [
                        _vm._v("审核成功")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.info.refund_verify == 2
                    ? _c("a-tag", { attrs: { color: "red" } }, [
                        _vm._v("申请拒绝")
                      ])
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _vm.info.refund_type == 1
                ? _c(
                    "a-form-model-item",
                    { attrs: { label: "退换货进度" } },
                    [
                      _vm.info.refund_verify == 0
                        ? _c("a-tag", { attrs: { color: "red" } }, [
                            _vm._v("等待审核")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.refund_verify == 2
                        ? _c("a-tag", { attrs: { color: "red" } }, [
                            _vm._v("拒绝申请")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.refund_step == 0 &&
                      _vm.refund_info.refund_verify == 1
                        ? _c("a-tag", { attrs: { color: "orange" } }, [
                            _vm._v("等待用户发货")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.refund_step == 1
                        ? _c("a-tag", { attrs: { color: "orange" } }, [
                            _vm._v("等待确认发货")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.refund_step == 2
                        ? _c("a-tag", { attrs: { color: "blue" } }, [
                            _vm._v("等待用户确认")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.refund_step == 3
                        ? _c("a-tag", { attrs: { color: "green" } }, [
                            _vm._v("售后处理完成")
                          ])
                        : _vm._e()
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.info.refund_type == 1 && _vm.info.refund_verify == 1
                ? _c(
                    "a-form-model-item",
                    { attrs: { label: "填写寄回物流" } },
                    [
                      _c("a-input", {
                        staticStyle: { width: "75%" },
                        attrs: { placeholder: "输入快递单号发货" },
                        model: {
                          value: _vm.info.delivery_no,
                          callback: function($$v) {
                            _vm.$set(_vm.info, "delivery_no", $$v)
                          },
                          expression: "info.delivery_no"
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.info.refund_verify == 2
                ? _c("a-form-model-item", { attrs: { label: "拒绝原因" } }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.info.refuse_remark) +
                        "\n                "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.info.re_delivery_no != ""
                ? _c(
                    "a-form-model-item",
                    { attrs: { label: "重新发货单号" } },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.info.re_delivery_no) +
                          "\n                "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.info.refund_step == 0 &&
              _vm.info.refund_type == 1 &&
              _vm.info.refund_verify == 1
                ? _c(
                    "a-form-model-item",
                    { attrs: { "wrapper-col": { span: 12, offset: 5 } } },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "submit_btn",
                          on: { click: _vm.handleSubmit }
                        },
                        [_vm._v("确定提交")]
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.info.refund_step == 2
                ? _c(
                    "a-form-model-item",
                    { attrs: { "wrapper-col": { span: 12, offset: 5 } } },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "submit_btn",
                          on: { click: _vm.handleSubmit2 }
                        },
                        [_vm._v("完成售后")]
                      )
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/users/refund/form.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Home/users/refund/form.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=80269fba&scoped=true& */ "./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "80269fba",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/users/refund/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=80269fba&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/form.vue?vue&type=template&id=80269fba&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_80269fba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);