(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[122],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/default.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/default.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var g2plot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! g2plot */ "g2plot");
/* harmony import */ var g2plot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(g2plot__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      params: {
        is_type: 0,
        created_at: []
      },
      info: {},
      list: [],
      isUserPlot: false,
      isOrderPlot: false,
      user_plot: [{
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
      order_plot: [{
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
      userObj: null,
      orderObj: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    download: function download() {
      window.open("https://gitee.com/qingwuitcn/qwshop");
    },
    openWeb: function openWeb() {
      window.open("https://www.qwststem.com");
    },
    onChange: function onChange(e) {
      // this.params.created_at = e;
      this.params.created_at[0] = moment(e[0]).format('YYYY-MM-DD');
      this.params.created_at[1] = moment(e[1]).format('YYYY-MM-DD');
      console.log(this.params.created_at);
      this.get_info();
    },
    typeChange: function typeChange(e) {
      this.params.is_type = e;
      this.get_info();
    },
    get_sale_plot: function get_sale_plot() {
      var data = this.order_plot;

      if (this.isOrderPlot) {
        this.orderObj.changeData(data);
        return;
      }

      this.orderObj = new g2plot__WEBPACK_IMPORTED_MODULE_0__["Column"]('container', {
        data: data,
        xField: 'time',
        yField: 'num',
        columnWidthRatio: 0.6,
        meta: {
          time: {
            alias: '时间'
          },
          num: {
            alias: '销售额'
          }
        }
      });
      this.orderObj.render();
      this.isOrderPlot = true;
    },
    get_user_plot: function get_user_plot() {
      var data = this.user_plot;

      if (this.isUserPlot) {
        this.userObj.changeData(data);
        return;
      }

      this.userObj = new g2plot__WEBPACK_IMPORTED_MODULE_0__["Line"]('user_plot', {
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
            alias: '注册数'
          }
        }
      });
      this.userObj.render();
      this.isUserPlot = true;
    },
    get_info: function get_info() {
      var _this = this;

      this.$get(this.$api.adminStatistics + '/all', this.params).then(function (res) {
        _this.info = res.data;
        _this.list = res.data.list;
        _this.user_plot = res.data.user_plot;
        _this.order_plot = res.data.order_plot;

        _this.get_sale_plot();

        _this.get_user_plot();
      });
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.get_info();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "admin_default" },
    [
      _c(
        "a-row",
        { attrs: { gutter: { xs: 24, md: 24 } } },
        [
          _c(
            "a-col",
            { attrs: { span: 8, xs: { span: 24 }, lg: { span: 8 } } },
            [
              _c("div", { staticClass: "admin_card" }, [
                _c("div", { staticClass: "title" }, [_vm._v("总销售额")]),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("div", { staticClass: "total_price" }, [
                    _vm._v("￥ " + _vm._s(_vm.info.total_price || "0.00"))
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "total_rate" }, [
                    _c(
                      "span",
                      [
                        _vm._v(
                          "周同比 " +
                            _vm._s(_vm.info.week_rate || "0.00") +
                            " %"
                        ),
                        _vm.info.week_rate >= 0
                          ? _c("a-icon", {
                              staticStyle: {
                                "margin-left": "5px",
                                color: "red"
                              },
                              attrs: { type: "caret-up" }
                            })
                          : _c("a-icon", {
                              staticStyle: {
                                "margin-left": "5px",
                                color: "green"
                              },
                              attrs: { type: "caret-down" }
                            })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      [
                        _vm._v(
                          "日同比 " + _vm._s(_vm.info.day_rate || "0.00") + " %"
                        ),
                        _vm.info.day_rate >= 0
                          ? _c("a-icon", {
                              staticStyle: {
                                "margin-left": "5px",
                                color: "red"
                              },
                              attrs: { type: "caret-up" }
                            })
                          : _c("a-icon", {
                              staticStyle: {
                                "margin-left": "5px",
                                color: "green"
                              },
                              attrs: { type: "caret-down" }
                            })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "unline" }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "month_rate" },
                    [
                      _c(
                        "a-tooltip",
                        [
                          _c("template", { slot: "title" }, [
                            _vm._v("月订单完成度")
                          ]),
                          _c("a-progress", {
                            attrs: { percent: _vm.info.month_rate || 60.0 }
                          })
                        ],
                        2
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "today_price" }, [
                    _vm._v(
                      "日销售额：￥ " + _vm._s(_vm.info.today_price || "0.00")
                    )
                  ])
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "a-col",
            { attrs: { span: 8, xs: { span: 24 }, lg: { span: 8 } } },
            [
              _c("div", { staticClass: "admin_card" }, [
                _c("div", { staticClass: "title" }, [_vm._v("订单信息")]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "content" },
                  [
                    _c(
                      "a-row",
                      { attrs: { gutter: { xs: 12, md: 12 } } },
                      [
                        _c(
                          "a-col",
                          {
                            attrs: {
                              span: 12,
                              xs: { span: 24 },
                              lg: { span: 12 }
                            }
                          },
                          [
                            _c("div", { staticClass: "color_block" }, [
                              _c(
                                "div",
                                [
                                  _c("a-tag", { attrs: { color: "blue" } }, [
                                    _vm._v("等待付款")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "color_blcok_font" }, [
                                _vm._v(_vm._s(_vm.info.order_wait || "0"))
                              ])
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "a-col",
                          {
                            attrs: {
                              span: 12,
                              xs: { span: 24 },
                              lg: { span: 12 }
                            }
                          },
                          [
                            _c("div", { staticClass: "color_block" }, [
                              _c(
                                "div",
                                [
                                  _c("a-tag", { attrs: { color: "green" } }, [
                                    _vm._v("完成订单")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "color_blcok_font" }, [
                                _vm._v(_vm._s(_vm.info.order_complete || "0"))
                              ])
                            ])
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "a-row",
                      { attrs: { gutter: { xs: 12, md: 12 } } },
                      [
                        _c(
                          "a-col",
                          {
                            attrs: {
                              span: 12,
                              xs: { span: 24 },
                              lg: { span: 12 }
                            }
                          },
                          [
                            _c("div", { staticClass: "color_block" }, [
                              _c(
                                "div",
                                [
                                  _c("a-tag", { attrs: { color: "red" } }, [
                                    _vm._v("等待发货")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "color_blcok_font" }, [
                                _vm._v(_vm._s(_vm.info.order_send || "0"))
                              ])
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "a-col",
                          {
                            attrs: {
                              span: 12,
                              xs: { span: 24 },
                              lg: { span: 12 }
                            }
                          },
                          [
                            _c("div", { staticClass: "color_block" }, [
                              _c(
                                "div",
                                [
                                  _c("a-tag", { attrs: { color: "orange" } }, [
                                    _vm._v("售后处理")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "color_blcok_font" }, [
                                _vm._v(_vm._s(_vm.info.order_refund || "0"))
                              ])
                            ])
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticStyle: { height: "20px" } })
                  ],
                  1
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "a-col",
            { attrs: { span: 8, xs: { span: 24 }, lg: { span: 8 } } },
            [
              _c("div", { staticClass: "admin_card" }, [
                _c("div", { staticClass: "title" }, [_vm._v("版本信息")]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "content",
                    staticStyle: { "margin-top": "0" }
                  },
                  [
                    _c("div", { staticClass: "copyright" }, [
                      _c("span", { staticClass: "copyright_title" }, [
                        _vm._v("当前版本：")
                      ]),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "copyright_rs" },
                        [_c("a-tag", [_vm._v("2.0.0")])],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "unline" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "copyright" }, [
                      _c("span", { staticClass: "copyright_title" }, [
                        _vm._v("商城框架：")
                      ]),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          staticClass: "copyright_rs",
                          on: { click: _vm.openWeb }
                        },
                        [_vm._v("阿凡提·水果巴扎系统（QwSystem）")]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "unline" }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "copyright",
                        staticStyle: { "padding-bottom": "18px" }
                      },
                      [
                        _c("span", { staticClass: "copyright_title" }, [
                          _vm._v("开源地址：")
                        ]),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "copyright_rs" },
                          [
                            _c(
                              "a-button",
                              {
                                attrs: { icon: "download", type: "primary" },
                                on: { click: _vm.download }
                              },
                              [_vm._v("前往下载")]
                            )
                          ],
                          1
                        )
                      ]
                    )
                  ]
                )
              ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "admin_card" }, [
        _c("div", { staticClass: "title" }, [
          _c("div", { staticClass: "right_block" }, [
            _c("ul", [
              _c(
                "li",
                {
                  class: _vm.params.is_type == 0 ? "ck" : "",
                  on: {
                    click: function($event) {
                      return _vm.typeChange(0)
                    }
                  }
                },
                [_vm._v("本周")]
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  class: _vm.params.is_type == 1 ? "ck" : "",
                  on: {
                    click: function($event) {
                      return _vm.typeChange(1)
                    }
                  }
                },
                [_vm._v("本年")]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "daterange" },
              [
                _c("a-range-picker", {
                  attrs: { format: "YYYY-MM-DD" },
                  on: { change: _vm.onChange },
                  model: {
                    value: _vm.params.created_at,
                    callback: function($$v) {
                      _vm.$set(_vm.params, "created_at", $$v)
                    },
                    expression: "params.created_at"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v("\n            销售趋势\n        ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "content" },
          [
            _c(
              "a-row",
              { attrs: { gutter: { xs: 24, md: 24 } } },
              [
                _c(
                  "a-col",
                  { attrs: { span: 16, xs: { span: 24 }, lg: { span: 16 } } },
                  [
                    _c("div", {
                      staticClass: "default_gd",
                      attrs: { id: "container" }
                    })
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a-col",
                  { attrs: { span: 8, xs: { span: 24 }, lg: { span: 8 } } },
                  [
                    _c(
                      "div",
                      { staticClass: "sort_list" },
                      [
                        _c("div", { staticClass: "list_title" }, [
                          _vm._v("门店销售额排名")
                        ]),
                        _vm._v(" "),
                        _vm._l(6, function(v) {
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
                                      _vm.list[v - 1]
                                        ? _vm.list[v - 1]["orders_count"]
                                        : "-"
                                    )
                                  )
                                ]
                              ),
                              _c("span", [_vm._v(_vm._s(v))]),
                              _c(
                                "div",
                                {
                                  staticStyle: {
                                    width: "70%",
                                    display: "inline-block",
                                    height: "20px",
                                    overflow: "hidden"
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.list[v - 1]
                                        ? _vm.list[v - 1]["store_name"]
                                        : "-"
                                    )
                                  )
                                ]
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
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _vm._m(0)
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "admin_card" }, [
      _c("div", { staticClass: "title" }, [_vm._v("入驻会员")]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "default_gd", attrs: { id: "user_plot" } })
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/default.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Admin/default.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default.vue?vue&type=template&id=762e271c&scoped=true& */ "./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true&");
/* harmony import */ var _default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/default.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "762e271c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/default.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/default.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Admin/default.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./default.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/default.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./default.vue?vue&type=template&id=762e271c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/default.vue?vue&type=template&id=762e271c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_template_id_762e271c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);