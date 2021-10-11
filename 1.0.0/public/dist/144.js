(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[144],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      loading: false,
      info: {
        store_verify: 2
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    next_step: function next_step() {
      var _this = this;

      if (this.info.store_verify == 2 || this.info.store_verify == 3) {
        return this.$router.push(this.info.store_verify == 2 ? '/' : '/Seller/login');
      }

      if (this.info.store_verify == 0) {
        this.$post(this.$api.homeStoreJoin).then(function (res) {
          if (res.code == 200) {
            return _this.$router.push('/store/join/step_2');
          }

          return _this.$$message.error(res.msg);
        });
      }
    },
    store_verify: function store_verify() {
      var _this2 = this;

      this.$get(this.$api.homeStoreVerify).then(function (res) {
        if (res.code == 200) {
          _this2.info = res.data;

          if (res.data.store_verify == 1) {
            _this2.$router.push('/store/join/step_2');
          }
        } else {
          _this2.$router.push('/store/join/step_1');
        }
      });
    }
  },
  created: function created() {
    this.store_verify();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true& ***!
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
  return _c(
    "div",
    { staticClass: "store_join width_center_1200" },
    [
      _c("div", { staticClass: "step_bar" }, [
        _c("div", { staticClass: "step" }, [
          _c(
            "div",
            { staticClass: "item success" },
            [_c("a-icon", { attrs: { type: "read" } }), _vm._v("阅读协议")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "item success" },
            [_c("a-icon", { attrs: { type: "edit" } }), _vm._v("填写资料")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              class:
                _vm.info.store_verify == 2
                  ? "item check"
                  : _vm.info.store_verify == 3
                  ? "item success"
                  : "item error"
            },
            [
              _c("a-icon", {
                attrs: {
                  type: _vm.info.store_verify == 0 ? "close-circle" : "coffee"
                }
              }),
              _vm._v(
                _vm._s(_vm.info.store_verify == 0 ? "审核失败" : "等待审核")
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { class: _vm.info.store_verify == 3 ? "item success" : "item" },
            [
              _c("a-icon", { attrs: { type: "check-circle" } }),
              _vm._v("审核通过")
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "a-result",
        {
          attrs: {
            title:
              _vm.info.store_verify == 2
                ? "已提交资料，等待管理员审核"
                : _vm.info.store_verify == 3
                ? "审核成功，前往展馆设置"
                : "审核失败，是否重新填写资料",
            status:
              _vm.info.store_verify == 2
                ? "info"
                : _vm.info.store_verify == 3
                ? "success"
                : "error"
          },
          scopedSlots: _vm._u([
            {
              key: "extra",
              fn: function() {
                return [
                  _c(
                    "a-button",
                    {
                      key: "console",
                      attrs: { type: "primary" },
                      on: { click: _vm.next_step }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.info.store_verify == 2
                            ? "返回首页"
                            : _vm.info.store_verify == 3
                            ? "展馆配置"
                            : "重新提交"
                        )
                      )
                    ]
                  )
                ]
              },
              proxy: true
            }
          ])
        },
        [
          _vm._v(" "),
          _vm.info.store_verify == 0
            ? _c("div", { staticClass: "desc" }, [
                _vm.info.store_refuse_info != ""
                  ? _c(
                      "p",
                      { staticStyle: { "font-size": "16px" } },
                      [
                        _c("a-icon", {
                          style: { color: "red" },
                          attrs: { type: "close-circle" }
                        }),
                        _vm._v(
                          " " +
                            _vm._s(_vm.info.store_refuse_info) +
                            "\n            "
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ])
            : _vm._e()
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/store/join/step_3.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_3.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step_3.vue?vue&type=template&id=13159b06&scoped=true& */ "./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true&");
/* harmony import */ var _step_3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step_3.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _step_3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "13159b06",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/store/join/step_3.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_3.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_3.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_3.vue?vue&type=template&id=13159b06&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_3.vue?vue&type=template&id=13159b06&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_3_vue_vue_type_template_id_13159b06_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);