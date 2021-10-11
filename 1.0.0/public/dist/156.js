(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[156],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      info: {
        order_id: 0,
        refund_type: 0,
        refund_remark: ''
      },
      params: {},
      error_list: ['物品破损', '尺码错误', '颜色不对', '其他原因']
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      this.$post(this.$api.homeRefunds, this.info).then(function (res) {
        _this.$returnInfo(res);

        setTimeout(function () {
          return _this.$router.go(-1);
        }, 1000);
      });
    },
    changeTag: function changeTag(v) {
      this.info.refund_remark = v;
    },
    typeChange: function typeChange(e) {
      this.info.refund_type = e.target.value;
    }
  },
  created: function created() {
    this.info.order_id = this.$route.params.id;
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
              _c(
                "a-form-model-item",
                { attrs: { label: "售后类型" } },
                [
                  _c(
                    "a-radio-group",
                    {
                      attrs: { "default-value": _vm.info.refund_type },
                      on: { change: _vm.typeChange }
                    },
                    [
                      _c("a-radio", { attrs: { value: 0 } }, [_vm._v("退款")]),
                      _vm._v(" "),
                      _c("a-radio", { attrs: { value: 1 } }, [_vm._v("退换货")])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "售后原因" } },
                [
                  _c("a-textarea", {
                    attrs: { rows: 4 },
                    model: {
                      value: _vm.info.refund_remark,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "refund_remark", $$v)
                      },
                      expression: "info.refund_remark"
                    }
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.error_list, function(v, k) {
                    return _c(
                      "a-tag",
                      {
                        key: k,
                        attrs: { color: "red" },
                        on: {
                          click: function($event) {
                            return _vm.changeTag(v)
                          }
                        }
                      },
                      [_vm._v(_vm._s(v))]
                    )
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c(
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

/***/ "./resources/js/views/Home/users/refund/index.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Home/users/refund/index.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=b76ceefa&scoped=true& */ "./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b76ceefa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/users/refund/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=b76ceefa&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/refund/index.vue?vue&type=template&id=b76ceefa&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_b76ceefa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);