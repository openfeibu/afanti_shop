(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[51],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_home_public_loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/home/public/loading.vue */ "./resources/js/components/home/public/loading.vue");
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
  components: {
    Loading: _components_home_public_loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {},
  data: function data() {
    return {
      list: [],
      params: {
        page: 1,
        per_page: 30,
        total: 0,
        is_collective: 1
      },
      isLoading: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    onload: function onload() {
      this.isLoading = true;
      this.get_list();
    },
    get_list: function get_list() {
      var _this = this;

      this.$post(this.$api.homeGoods + '/search/all', this.params).then(function (res) {
        _this.params.total = res.data.total;
        _this.list = res.data.data;
        _this.isLoading = false;
      });
    },
    onChange: function onChange(e) {
      this.params.page = e;
      this.onload();
    },
    timeChange: function timeChange(e) {
      this.params.start_time = e;
      this.page = 1;
      this.timeIndex = e;
      this.onload();
    }
  },
  created: function created() {
    this.onload();
    this.timing();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".home_seckills[data-v-6cef7244] {\n  min-height: 600px;\n}\n.home_seckills .goods_list[data-v-6cef7244] {\n  margin-top: 30px;\n}\n.home_seckills .goods_list .item[data-v-6cef7244] {\n  float: left;\n  padding: 16px 40px 16px 16px;\n  background: #FFFFFF;\n  border-radius: 8px;\n  margin: 0 15px 20px 0;\n}\n.home_seckills .goods_list .item .img[data-v-6cef7244] {\n  float: left;\n}\n.home_seckills .goods_list .item .img img[data-v-6cef7244] {\n  display: block;\n  width: 214px;\n  height: 214px;\n}\n.home_seckills .goods_list .product_info[data-v-6cef7244] {\n  margin-left: 234px;\n}\n.home_seckills .goods_list .product_info .p_name[data-v-6cef7244] {\n  font-size: 16px;\n  color: #000000;\n  line-height: 20px;\n  width: 290px;\n  margin-top: 12px;\n  height: 60px;\n  overflow: hidden;\n  font-family: PingFangSC-Regular;\n}\n.home_seckills .goods_list .product_info .label_t[data-v-6cef7244] {\n  margin-top: 14px;\n}\n.home_seckills .goods_list .product_info .label_t .price_r[data-v-6cef7244] {\n  font-size: 14px;\n  color: #999999;\n  font-family: Microsoft YaHei;\n}\n.home_seckills .goods_list .product_info .label_t .label[data-v-6cef7244] {\n  font-size: 12px;\n  color: #FF463C;\n  border: 1px solid #FF463C;\n  border-radius: 2px;\n  display: inline-block;\n  padding: 1px 2px;\n}\n.home_seckills .goods_list .product_info .label_t .num[data-v-6cef7244] {\n  font-size: 14px;\n  color: #353535;\n  margin-left: 5px;\n}\n.home_seckills .goods_list .product_info .price[data-v-6cef7244] {\n  font-size: 20px;\n  margin-top: 16px;\n}\n.home_seckills .goods_list .product_info .price .now_price[data-v-6cef7244] {\n  color: #FF4433;\n  font-size: 20px;\n  font-family: Microsoft YaHei;\n}\n.home_seckills .goods_list .product_info .price .kan_success[data-v-6cef7244] {\n  font-size: 14px;\n}\n.home_seckills .goods_list .product_info .price .origin_price[data-v-6cef7244] {\n  font-size: 12px;\n  color: #999999;\n  text-decoration: line-through;\n  margin-left: 7px;\n  font-family: \"Microsoft YaHei\";\n}\n.home_seckills .goods_list ul li:hover .product_act_in[data-v-6cef7244] {\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  margin-top: -3px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "home_seckills" },
    [
      _c(
        "div",
        { staticClass: "mbx w1200" },
        [
          _c(
            "a-breadcrumb",
            [
              _c("a-breadcrumb-item", [
                _c("a", { attrs: { href: "/" } }, [_vm._v("首页")])
              ]),
              _vm._v(" "),
              _c("a-breadcrumb-item", [_vm._v("砍价专区")])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.list.length > 0
        ? _c("div", { staticClass: "goods_list w1200" }, [
            _c(
              "ul",
              _vm._l(_vm.list, function(v, k) {
                return _c("li", { key: k }, [
                  _c("div", { staticClass: "product_act_in" }, [
                    _c("div", { staticClass: "img" }, [
                      _c("img", {
                        directives: [
                          {
                            name: "lazy",
                            rawName: "v-lazy",
                            value: v.goods_master_image || "",
                            expression: "v.goods_master_image||''"
                          }
                        ],
                        attrs: { alt: v.goods_name }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "product_info" }, [
                      _c("div", { staticClass: "p_name" }, [
                        _vm._v(_vm._s(v.goods_name))
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "label_t" }, [
                        _c("span", { staticClass: "price_r" }, [
                          _vm._v("售价 ¥" + _vm._s(v.goods_price))
                        ])
                      ]),
                      _vm._v(" "),
                      _vm._m(0, true),
                      _vm._v(" "),
                      _vm._m(1, true)
                    ])
                  ])
                ])
              }),
              0
            ),
            _vm._v(" "),
            _c("div", { staticClass: "clear" }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "fy", staticStyle: { "margin-top": "30px" } },
              [
                _c("a-pagination", {
                  attrs: {
                    "default-page-size": _vm.params.per_page,
                    total: _vm.params.total
                  },
                  on: { change: _vm.onChange },
                  model: {
                    value: _vm.params.page,
                    callback: function($$v) {
                      _vm.$set(_vm.params, "page", $$v)
                    },
                    expression: "params.page"
                  }
                })
              ],
              1
            )
          ])
        : _c("a-empty", { staticStyle: { "margin-top": "250px" } }),
      _vm._v(" "),
      _vm.isLoading ? _c("loading") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "price" }, [
      _c("div", { staticClass: "kan_success" }, [
        _vm._v("已有"),
        _c("span", { staticClass: "now_price" }, [_vm._v("5")]),
        _vm._v("人砍价成功")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "main_show" }, [
      _c("div", { staticClass: "btn" }, [_vm._v("去砍价")]),
      _vm._v(" "),
      _c("div", { staticClass: "remind_word" }, [
        _c("span", { staticClass: "ling" }, [_vm._v("砍价1元得")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/bargain/index.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/Home/bargain/index.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=6cef7244&scoped=true& */ "./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& */ "./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6cef7244",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/bargain/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=style&index=0&id=6cef7244&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cef7244_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=6cef7244&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/bargain/index.vue?vue&type=template&id=6cef7244&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_6cef7244_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);