(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[154],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      id: 0,
      info: {},
      columns: [//   {title:'#',dataIndex:'id',fixed:'left'},
      {
        title: '商品名称',
        key: 'id',
        fixed: 'left',
        scopedSlots: {
          customRender: 'name'
        }
      }, {
        title: '规格属性',
        dataIndex: 'sku_name'
      }, {
        title: '购买数量',
        key: 'id',
        scopedSlots: {
          customRender: 'buy_num'
        }
      }, {
        title: '商品价格',
        key: 'id',
        scopedSlots: {
          customRender: 'goods_price'
        }
      }],
      list: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    get_info: function get_info() {
      var _this = this;

      this.$get(this.$api.homeOrder + '/get_order_info/' + this.id).then(function (res) {
        _this.info = res.data;
      });
    },
    // 获取菜单列表
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "user_order_info" }, [
    _c("div", { staticClass: "user_main" }, [
      _c("div", { staticClass: "block_title" }, [
        _vm._v("\n            订单详情\n        ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "x20" }),
      _vm._v(" "),
      _c("div", { staticClass: "admin_form" }, [
        _c(
          "div",
          { staticClass: "order_info_list" },
          [
            _c(
              "a-row",
              [
                _c("a-col", { attrs: { span: 12 } }, [
                  _vm._v("\n                        订单号："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.order_no || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("a-col", { attrs: { span: 12 } }, [
                  _vm._v(
                    "\n                        状态：\n                        "
                  ),
                  _c(
                    "span",
                    { staticClass: "content" },
                    [
                      _vm.info.order_status == 0
                        ? _c("a-tag", { attrs: { color: "red" } }, [
                            _vm._v(_vm._s(_vm.info.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.order_status == 1
                        ? _c("a-tag", { attrs: { color: "orange" } }, [
                            _vm._v(_vm._s(_vm.info.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.order_status > 1 && _vm.info.order_status < 6
                        ? _c("a-tag", { attrs: { color: "blue" } }, [
                            _vm._v(_vm._s(_vm.info.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.order_status == 6
                        ? _c("a-tag", { attrs: { color: "cyan" } }, [
                            _vm._v(_vm._s(_vm.info.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.info.order_status >= 7
                        ? _c("a-tag", { attrs: { color: "green" } }, [
                            _vm._v(_vm._s(_vm.info.order_status_cn))
                          ])
                        : _vm._e()
                    ],
                    1
                  )
                ])
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "order_info_list" },
          [
            _c(
              "a-row",
              [
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        支付方式："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.payment_name_cn || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        支付时间："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.pay_time || "-"))
                  ])
                ]),
                _vm._v(" "),
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        快递单号："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.delivery_no || "-"))
                  ])
                ])
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "order_info_list" },
          [
            _c(
              "a-row",
              [
                _c("a-col", { attrs: { span: 24 } }, [
                  _vm._v("\n                        备注："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.remark || "-"))
                  ])
                ])
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "unline underm" }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "order_info_list" },
          [
            _c(
              "a-row",
              [
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        收货人："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.receive_name))
                  ])
                ]),
                _vm._v(" "),
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        联系电话："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(_vm._s(_vm.info.receive_tel))
                  ])
                ]),
                _vm._v(" "),
                _c("a-col", { attrs: { span: 8 } }, [
                  _vm._v("\n                        取货地址："),
                  _c("span", { staticClass: "content" }, [
                    _vm._v(
                      _vm._s(_vm.info.receive_area + _vm.info.receive_address)
                    )
                  ])
                ])
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "unline underm" }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "admin_table_list" },
          [
            _c("a-table", {
              attrs: {
                columns: _vm.columns,
                "data-source": _vm.info.order_goods,
                pagination: false
              },
              scopedSlots: _vm._u([
                {
                  key: "name",
                  fn: function(rows) {
                    return _c("span", {}, [
                      _c("div", { staticClass: "admin_pic_txt" }, [
                        _c(
                          "div",
                          { staticClass: "img" },
                          [
                            rows.goods_image
                              ? _c("img", { attrs: { src: rows.goods_image } })
                              : _c("a-icon", { attrs: { type: "picture" } })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "text",
                            staticStyle: {
                              "max-width": "475px",
                              "line-height": "20px"
                            }
                          },
                          [_vm._v(_vm._s(rows.goods_name))]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "clear" })
                      ])
                    ])
                  }
                },
                {
                  key: "buy_num",
                  fn: function(rows) {
                    return _c("span", {}, [
                      _vm._v(
                        "\n                        x " +
                          _vm._s(rows.buy_num) +
                          "\n                    "
                      )
                    ])
                  }
                },
                {
                  key: "goods_price",
                  fn: function(rows) {
                    return _c(
                      "span",
                      {},
                      [
                        _c("font", { attrs: { color: "#ca151e" } }, [
                          _vm._v("￥" + _vm._s(rows.goods_price))
                        ])
                      ],
                      1
                    )
                  }
                }
              ])
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "order_info_right_price" }, [
          _vm._v("总计：￥ " + _vm._s(_vm.info.total_price)),
          _c("span", { attrs: { "data-v-01d38243": "" } }, [
            _vm._v("（运费：" + _vm._s(_vm.info.freight_money) + "）")
          ])
        ]),
        _vm._v(" "),
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "unline underm" }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "order_info_kd" },
          [
            _vm.list.length > 0
              ? _c(
                  "a-timeline",
                  _vm._l(_vm.info.delivery_list, function(v, k) {
                    return _c(
                      "a-timeline-item",
                      { key: k, attrs: { color: k == 0 ? "red" : "gray" } },
                      [_c("p", [_vm._v(_vm._s(v.context + " " + v.time))])]
                    )
                  }),
                  1
                )
              : _c("a-empty")
          ],
          1
        ),
        _vm._v(" "),
        _c("br")
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticStyle: { "margin-top": "40px" } }, [
      _c(
        "span",
        { staticStyle: { "font-size": "14px", "font-weight": "bold" } },
        [_vm._v("物流地址")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticStyle: { "margin-top": "40px" } }, [
      _c(
        "span",
        { staticStyle: { "font-size": "14px", "font-weight": "bold" } },
        [_vm._v("商品信息")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticStyle: { "margin-top": "40px" } }, [
      _c(
        "span",
        { staticStyle: { "font-size": "14px", "font-weight": "bold" } },
        [_vm._v("快递信息")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/users/order/info.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Home/users/order/info.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.vue?vue&type=template&id=ce239452&scoped=true& */ "./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true&");
/* harmony import */ var _info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ce239452",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/users/order/info.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./info.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/order/info.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_info_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./info.vue?vue&type=template&id=ce239452&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/order/info.vue?vue&type=template&id=ce239452&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_info_vue_vue_type_template_id_ce239452_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);