(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[173],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_admin_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/admin/search */ "./resources/js/components/admin/search.vue");
/* harmony import */ var g2plot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! g2plot */ "g2plot");
/* harmony import */ var g2plot__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(g2plot__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    adminSearch: _components_admin_search__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {},
  data: function data() {
    return {
      params: {
        page: 1,
        per_page: 30
      },
      searchConfig: [{
        label: '时间查询',
        name: 'created_at',
        type: 'date_picker'
      }, {
        label: '查询方式',
        name: 'is_type',
        type: 'select',
        data: [{
          label: '默认',
          value: 0
        }, {
          label: '月份',
          value: 1
        }, {
          label: '年度',
          value: 2
        }]
      }],
      columns: [{
        title: '#',
        dataIndex: 'id',
        fixed: 'left'
      }, {
        title: '订单名称',
        key: 'id',
        fixed: 'left',
        scopedSlots: {
          customRender: 'name'
        }
      }, {
        title: '订单号',
        dataIndex: 'order_no'
      }, {
        title: '展馆',
        dataIndex: 'store_name'
      }, {
        title: '买家',
        dataIndex: 'buyer_name'
      }, {
        title: '订单总额',
        key: 'id',
        scopedSlots: {
          customRender: 'total_price'
        }
      }, {
        title: '订单状态',
        key: 'id',
        scopedSlots: {
          customRender: 'order_status'
        }
      }, {
        title: '下单时间',
        dataIndex: 'created_at'
      } //   {title:'操作',key:'id',fixed:'right',scopedSlots: { customRender: 'action' }},
      ],
      list: [],
      store: [],
      goods: [],
      plot: [{
        time: '2012-12-00',
        num: 9.00
      }, {
        time: '2012-12-01',
        num: 2.00
      }, {
        time: '2012-12-02',
        num: 1.00
      }, {
        time: '2012-12-03',
        num: 5.00
      }, {
        time: '2012-12-04',
        num: 7.00
      }, {
        time: '2012-12-05',
        num: 5.00
      }, {
        time: '2012-12-06',
        num: 1.00
      }],
      isPlot: false,
      plotObj: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 选择分页
    onChange: function onChange(e) {
      this.params.page = e;
    },
    search: function search(params) {
      var page = this.params.page;
      var per_page = this.params.per_page; // 事件需要格式化，后面再看看有没有更好得到办法

      if (!this.$isEmpty(params.created_at) && !this.$isEmpty(params.created_at[0])) {
        params.created_at[0] = moment(params.created_at[0]).format('YYYY-MM-DD HH:mm:ss');
        params.created_at[1] = moment(params.created_at[1]).format('YYYY-MM-DD HH:mm:ss');
      }

      this.params = params;
      this.params.page = page;
      this.params.per_page = per_page;
      this.onload();
    },
    get_info: function get_info() {
      var _this = this;

      this.$get(this.$api.sellerStatistics + '/order', this.params).then(function (res) {
        _this.plot = res.data.plot;
        _this.list = res.data.list.data;
        _this.total = res.data.list.total;
        _this.goods = res.data.goods;
        _this.store = res.data.store;

        _this.get_user_plot();
      });
    },
    get_user_plot: function get_user_plot() {
      if (this.isPlot) {
        this.plotObj.changeData(this.plot);
        return;
      }

      var data = this.plot;
      this.plotObj = new g2plot__WEBPACK_IMPORTED_MODULE_1__["Line"]('order_plot2', {
        data: data,
        xField: 'time',
        yField: 'num',
        label: {},
        point: {
          size: 4,
          style: {
            stroke: '#fff',
            lineWidth: 2
          }
        },
        meta: {
          time: {
            alias: '时间'
          },
          num: {
            alias: '统计金额'
          }
        }
      });
      this.plotObj.render();
      this.isPlot = true;
    },
    // 获取列表
    onload: function onload() {
      this.get_info();
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.onload();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true& ***!
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
  return _c(
    "div",
    { staticClass: "qingwu" },
    [
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
          _vm._v("\n        销售分析\n    ")
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "unline underm" }),
      _vm._v(" "),
      _c("admin-search", {
        attrs: { searchConfig: _vm.searchConfig },
        on: { searchParams: _vm.search }
      }),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "admin_form", staticStyle: { "margin-bottom": "30px" } },
        [
          _c(
            "a-raw",
            { attrs: { gutter: { xs: 34, md: 34 } } },
            [
              _c(
                "a-col",
                { attrs: { span: 12, xs: { span: 24 }, lg: { span: 10 } } },
                [
                  _c(
                    "div",
                    { staticClass: "sort_list" },
                    [
                      _c("div", { staticClass: "list_title" }, [
                        _vm._v("商品下单排名 TOP 10")
                      ]),
                      _vm._v(" "),
                      _vm._l(10, function(v) {
                        return _c(
                          "div",
                          { key: v, staticClass: "list_block" },
                          [
                            _c(
                              "font",
                              {
                                staticStyle: { color: "#999", float: "right" }
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.store[v - 1]
                                      ? _vm.store[v - 1]["orders_count"]
                                      : "-"
                                  )
                                )
                              ]
                            ),
                            _c("span", [_vm._v(_vm._s(v))]),
                            _vm._v(
                              _vm._s(
                                _vm.store[v - 1]
                                  ? _vm.store[v - 1]["goods_name"]
                                  : "-"
                              )
                            )
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                ]
              ),
              _vm._v(" "),
              _c("a-col", {
                attrs: { span: 12, xs: { span: 24 }, lg: { span: 2 } }
              }),
              _vm._v(" "),
              _c(
                "a-col",
                { attrs: { span: 12, xs: { span: 24 }, lg: { span: 10 } } },
                [
                  _c(
                    "div",
                    { staticClass: "sort_list" },
                    [
                      _c("div", { staticClass: "list_title" }, [
                        _vm._v("商品销售额排名 TOP 10")
                      ]),
                      _vm._v(" "),
                      _vm._l(10, function(v) {
                        return _c(
                          "div",
                          { key: v, staticClass: "list_block" },
                          [
                            _c(
                              "font",
                              {
                                staticStyle: { color: "#999", float: "right" }
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.goods[v - 1]
                                      ? _vm.goods[v - 1]["orders_count"]
                                      : "-"
                                  )
                                )
                              ]
                            ),
                            _c("span", [_vm._v(_vm._s(v))]),
                            _vm._v(
                              _vm._s(
                                _vm.goods[v - 1]
                                  ? _vm.goods[v - 1]["goods_name"]
                                  : "-"
                              )
                            )
                          ],
                          1
                        )
                      })
                    ],
                    2
                  )
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "clear" })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "admin_table_list" },
        [
          _c("a-table", {
            attrs: {
              columns: _vm.columns,
              "data-source": _vm.list,
              pagination: false,
              "row-key": "id"
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
                          rows.order_image
                            ? _c("img", { attrs: { src: rows.order_image } })
                            : _c("a-icon", { attrs: { type: "picture" } })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "text" }, [
                        _vm._v(_vm._s(rows.order_name))
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "clear" })
                    ])
                  ])
                }
              },
              {
                key: "total_price",
                fn: function(rows) {
                  return _c(
                    "span",
                    {},
                    [
                      _c("font", { attrs: { color: "red" } }, [
                        _vm._v("￥" + _vm._s(rows.total_price))
                      ])
                    ],
                    1
                  )
                }
              },
              {
                key: "order_status",
                fn: function(rows) {
                  return _c(
                    "span",
                    {},
                    [
                      rows.order_status == 0
                        ? _c("a-tag", { attrs: { color: "red" } }, [
                            _vm._v(_vm._s(rows.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      rows.order_status == 1
                        ? _c("a-tag", { attrs: { color: "orange" } }, [
                            _vm._v(_vm._s(rows.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      rows.order_status > 1 && rows.order_status < 6
                        ? _c("a-tag", { attrs: { color: "blue" } }, [
                            _vm._v(_vm._s(rows.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      rows.order_status == 6
                        ? _c("a-tag", { attrs: { color: "cyan" } }, [
                            _vm._v(_vm._s(rows.order_status_cn))
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      rows.order_status >= 7
                        ? _c("a-tag", { attrs: { color: "green" } }, [
                            _vm._v(_vm._s(rows.order_status_cn))
                          ])
                        : _vm._e()
                    ],
                    1
                  )
                }
              }
            ])
          }),
          _vm._v(" "),
          _vm.total > 0
            ? _c(
                "div",
                { staticClass: "admin_pagination" },
                [
                  _c("a-pagination", {
                    attrs: {
                      "page-size": _vm.params.per_page,
                      total: _vm.total,
                      "show-less-items": ""
                    },
                    on: {
                      "update:pageSize": function($event) {
                        return _vm.$set(_vm.params, "per_page", $event)
                      },
                      "update:page-size": function($event) {
                        return _vm.$set(_vm.params, "per_page", $event)
                      },
                      change: _vm.onChange
                    },
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
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "admin_form" }, [
      _c("div", {
        staticStyle: { "margin-top": "20px", "margin-bottom": "40px" },
        attrs: { id: "order_plot2" }
      })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Seller/statistics/order.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Seller/statistics/order.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.vue?vue&type=template&id=0cf25dba&scoped=true& */ "./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true&");
/* harmony import */ var _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order.vue?vue&type=script&lang=js& */ "./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0cf25dba",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Seller/statistics/order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./order.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/statistics/order.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./order.vue?vue&type=template&id=0cf25dba&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/statistics/order.vue?vue&type=template&id=0cf25dba&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_vue_vue_type_template_id_0cf25dba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);