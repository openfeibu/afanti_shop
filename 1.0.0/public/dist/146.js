(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[146],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      info: {
        click_num: 0,
        updated_at: '0000-00-00 00:00:00'
      },
      ename: ''
    };
  },
  watch: {},
  computed: {},
  methods: {
    get_info: function get_info() {
      var _this = this;

      this.$get(this.$api.homeArticle + '/' + this.ename).then(function (res) {
        if (res.code == 200) {
          _this.info = res.data;
        } else if (res.code == 401) {
          _this.$router.push('/user/login');
        } else {
          return _this.$router.go(-1);
        }
      });
    }
  },
  created: function created() {
    this.ename = this.$route.params.ename;
    this.get_info();
  },
  mounted: function mounted() {},
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    console.log(to, from);

    if (from.params.ename != to.params.ename) {
      this.ename = to.params.ename;
      this.get_info();
      document.documentElement.scrollTop = 0;
    }

    next(); // react to route changes...
    // don't forget to call next()
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true& ***!
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
        _c(
          "span",
          {
            staticStyle: {
              float: "right",
              "font-size": "12px",
              color: "#999",
              "padding-right": "10px",
              "padding-left": "20px",
              "line-height": "22px"
            }
          },
          [_vm._v("编辑时间：" + _vm._s(_vm.info.updated_at))]
        ),
        _vm._v(" "),
        _c(
          "span",
          {
            staticStyle: {
              float: "right",
              "font-size": "12px",
              color: "#999",
              "padding-right": "20px",
              "line-height": "22px",
              "border-right": "1px solid #efefef"
            }
          },
          [_vm._v("点击量：" + _vm._s(_vm.info.click_num))]
        ),
        _vm._v(
          "\n            " + _vm._s(_vm.info.name || "帮助中心") + "\n        "
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "x20" }),
      _vm._v(" "),
      _c("div", { domProps: { innerHTML: _vm._s(_vm.info.content) } })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/users/article/form.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Home/users/article/form.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=76ab8376&scoped=true& */ "./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "76ab8376",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/users/article/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/article/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=76ab8376&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/article/form.vue?vue&type=template&id=76ab8376&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_76ab8376_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);