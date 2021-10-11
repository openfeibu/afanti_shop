(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[96],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_admin_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/admin/search */ "./resources/js/components/admin/search.vue");





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    adminSearch: _components_admin_search__WEBPACK_IMPORTED_MODULE_5__["default"]
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
        label: '接口名称',
        name: 'name',
        type: 'text'
      }, {
        label: '接口路由',
        name: 'apis',
        type: 'text'
      }, {
        label: '所属分组',
        name: 'pid',
        type: 'select',
        data: [{
          label: '全部',
          value: ''
        }]
      }],
      selectedRowKeys: [],
      // 被选择的行
      columns: [{
        title: '#',
        dataIndex: 'id',
        fixed: 'left'
      }, {
        title: '接口名称',
        dataIndex: 'name'
      }, {
        title: '所属分组',
        dataIndex: 'permission_group',
        scopedSlots: {
          customRender: 'permission_group'
        }
      }, {
        title: '接口路由',
        dataIndex: 'apis'
      }, {
        title: '接口描述',
        dataIndex: 'content'
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
      var per_page = this.params.per_page;
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
    // 删除
    del: function del() {
      var _this = this;

      if (this.selectedRowKeys.length == 0) {
        return this.$message.error('未选择数据.');
      }

      this.$confirm({
        title: '你确定要删除选择的数据？',
        content: '确定删除后无法恢复.',
        okText: '是',
        okType: 'danger',
        cancelText: '取消',
        onOk: function onOk() {
          var ids = _this.selectedRowKeys.join(',');

          _this.$delete(_this.$api.adminPermissions + '/' + ids).then(function (res) {
            if (res.code == 200) {
              _this.onload();

              _this.$message.success('删除成功');
            } else {
              _this.$message.error(res.msg);
            }
          });
        }
      });
    },
    get_group: function get_group() {
      var _this2 = this;

      this.$get(this.$api.adminPermissionGroups).then(function (res) {
        var list = [];
        res.data.data.forEach(function (item) {
          list.push({
            label: item.name,
            value: item.id
          });
        });

        _this2.searchConfig.forEach(function (item) {
          if (item.name == 'pid') {
            item.data = item.data.concat(list);
          }
        });
      });
    },
    onload: function onload() {
      var _this3 = this;

      this.$get(this.$api.adminPermissions, this.params).then(function (res) {
        _this3.total = res.data.total;
        _this3.list = res.data.data;
      });
    }
  },
  created: function created() {
    this.onload();
    this.get_group(); // 分组
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.join.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.join.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true& ***!
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
      _c("div", { staticClass: "admin_table_page_title" }, [
        _vm._v("接口管理")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "unline underm" }),
      _vm._v(" "),
      _c("admin-search", {
        attrs: { searchConfig: _vm.searchConfig },
        on: { searchParams: _vm.search }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "admin_table_handle_btn" },
        [
          _c(
            "a-button",
            {
              attrs: { type: "primary", icon: "plus" },
              on: {
                click: function($event) {
                  return _vm.$router.push("/Admin/permissions/form")
                }
              }
            },
            [_vm._v("添加")]
          ),
          _vm._v(" "),
          _c(
            "a-button",
            {
              staticClass: "admin_delete_btn",
              attrs: { type: "danger", icon: "delete" },
              on: { click: _vm.del }
            },
            [_vm._v("批量删除")]
          )
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
              "row-selection": {
                selectedRowKeys: _vm.selectedRowKeys,
                onChange: _vm.onSelectChange
              },
              "row-key": "id"
            },
            scopedSlots: _vm._u([
              {
                key: "permission_group",
                fn: function(rows) {
                  return _c(
                    "span",
                    {},
                    [
                      _c("a-tag", { attrs: { color: "blue" } }, [
                        _vm._v(_vm._s(rows.name || "暂无"))
                      ])
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
                          attrs: { icon: "edit" },
                          on: {
                            click: function($event) {
                              return _vm.$router.push(
                                "/Admin/permissions/form/" + rows.id
                              )
                            }
                          }
                        },
                        [_vm._v("编辑")]
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

/***/ "./resources/js/views/Admin/permissions/index.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Admin/permissions/index.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=fdaa3110&scoped=true& */ "./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "fdaa3110",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/permissions/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/permissions/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=fdaa3110&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/permissions/index.vue?vue&type=template&id=fdaa3110&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_fdaa3110_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);