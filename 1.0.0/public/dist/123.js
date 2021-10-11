(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[123],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      params: {
        page: 1,
        per_page: 30
      },
      total: 0,
      //总页数
      selectedRowKeys: [],
      // 被选择的行
      columns: [{
        title: '#',
        dataIndex: 'id',
        fixed: 'left'
      }, {
        title: '分销名称',
        fixed: 'left',
        dataIndex: 'name'
      }, {
        title: '用户',
        dataIndex: 'nickname'
      }, {
        title: '展馆',
        dataIndex: 'store_name'
      }, {
        title: '订单号',
        dataIndex: 'order_no'
      }, {
        title: '商品金额',
        dataIndex: 'money'
      }, {
        title: '佣金比例',
        dataIndex: 'lev'
      }, {
        title: '佣金',
        dataIndex: 'commission'
      }, {
        title: '结算状态',
        key: 'id',
        scopedSlots: {
          customRender: 'status'
        }
      }, {
        title: '创建时间',
        dataIndex: 'created_at'
      }],
      list: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 选择框被点击
    onSelectChange: function onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    onload: function onload() {
      var _this = this;

      this.$get(this.$api.adminDistributionLogs, this.params).then(function (res) {
        _this.total = res.data.total;
        _this.list = res.data.data;
      });
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "admin_table_page_title" }, [_vm._v("分销日志")]),
    _vm._v(" "),
    _c("div", { staticClass: "unline underm" }),
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
              key: "status",
              fn: function(rows) {
                return _c(
                  "span",
                  {},
                  [
                    rows.status == 0
                      ? _c("a-tag", { attrs: { color: "blue" } }, [
                          _vm._v("未结算")
                        ])
                      : _c("a-tag", { attrs: { color: "green" } }, [
                          _vm._v("已结算")
                        ])
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
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Admin/distribution_logs/index.vue":
/*!**************************************************************!*\
  !*** ./resources/js/views/Admin/distribution_logs/index.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=72cf0184&scoped=true& */ "./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "72cf0184",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/distribution_logs/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=72cf0184&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/distribution_logs/index.vue?vue&type=template&id=72cf0184&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_72cf0184_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);