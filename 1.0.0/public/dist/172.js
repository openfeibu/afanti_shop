(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[172],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_admin_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/admin/search */ "./resources/js/components/admin/search.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      total: 0,
      //总页数
      searchConfig: [{
        label: '订单号',
        name: 'order_no',
        type: 'text'
      }, {
        label: '下单时间',
        name: 'created_at',
        type: 'date_picker'
      }, {
        label: '订单状态',
        name: 'order_status',
        type: 'select',
        data: [{
          label: '订单取消',
          value: 0
        }, {
          label: '等待支付',
          value: 1
        }, {
          label: '等待发货',
          value: 2
        }, {
          label: '确认收货',
          value: 3
        }, {
          label: '等待评论',
          value: 4
        }, {
          label: '售后订单',
          value: 5
        }, {
          label: '订单完成',
          value: 6
        }]
      }, {
        label: '用户ID',
        name: 'user_id',
        type: 'text'
      }],
      selectedRowKeys: [],
      // 被选择的行
      columns: [//   {title:'#',dataIndex:'id',fixed:'left'},
      {
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
      }, {
        title: '操作',
        key: 'id',
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      list: []
    };
  },
  watch: {},
  computed: {},
  methods: {
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
    // 选择框被点击
    onSelectChange: function onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 选择分页
    onChange: function onChange(e) {
      this.params.page = e;
    },
    onload: function onload() {
      var _this = this;

      if (!this.$isEmpty(this.$route.query.is_refund)) {
        this.params.is_refund = 1;
      }

      if (!this.$isEmpty(this.$route.query.is_return)) {
        this.params.is_return = 1;
      }

      this.$get(this.$api.sellerOrders, this.params).then(function (res) {
        _this.total = res.data.total;
        _this.list = res.data.data;
      });
    }
  },
  created: function created() {
    if (!this.$isEmpty(this.$route.query.collective_id)) {
      this.params.collective_id = this.$route.query.collective_id;
    }

    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
          _vm._v("订单管理")
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
      _c("div", { staticClass: "admin_table_handle_btn" }),
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
              "row-selection": {
                selectedRowKeys: _vm.selectedRowKeys,
                onChange: _vm.onSelectChange
              },
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
              },
              {
                key: "action",
                fn: function(rows) {
                  return _c(
                    "span",
                    {},
                    [
                      _c(
                        "a-button",
                        {
                          attrs: { icon: "read" },
                          on: {
                            click: function($event) {
                              return _vm.$router.push(
                                "/Seller/orders/form/" + rows.id
                              )
                            }
                          }
                        },
                        [_vm._v("查看详情")]
                      )
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
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Seller/orders/index.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Seller/orders/index.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=be4d172e&scoped=true& */ "./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "be4d172e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Seller/orders/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/orders/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=be4d172e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/orders/index.vue?vue&type=template&id=be4d172e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_be4d172e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);