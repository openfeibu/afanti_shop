(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[145],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js& ***!
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
//
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  props: {},
  data: function data() {
    return {
      info: {
        is_default: 0,
        area_id: []
      },
      areas: [],
      id: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      // 验证代码处
      if (this.$isEmpty(this.info.receive_name)) {
        return this.$message.error('收货人不能为空');
      }

      if (this.$isEmpty(this.info.receive_tel)) {
        return this.$message.error('手机不能为空');
      }

      if (this.$isEmpty(this.info.area_id)) {
        return this.$message.error('详细地址');
      }

      if (this.$isEmpty(this.info.address)) {
        return this.$message.error('地区');
      }

      var api = this.$apiHandle(this.$api.homeAddress, this.id);

      if (api.status) {
        this.$put(api.url, this.info).then(function (res) {
          if (res.code == 200) {
            _this.$message.success(res.msg);

            return _this.$router.back();
          } else {
            return _this.$message.error(res.msg);
          }
        });
      } else {
        this.$post(api.url, this.info).then(function (res) {
          if (res.code == 200) {
            _this.$message.success(res.msg);

            return _this.$router.back();
          } else {
            return _this.$message.error(res.msg);
          }
        });
      }
    },
    area_change: function area_change(row, info) {
      this.info.province_id = row[0];
      this.info.city_id = row[1];
      this.info.region_id = row[2];
    },
    // 获取地址
    get_areas: function get_areas() {
      var _this2 = this;

      this.$get(this.$api.homeAreas).then(function (res) {
        _this2.areas = res.data;
      });
    },
    onChange: function onChange(e) {
      this.info.is_default = e ? 1 : 0;
    },
    get_info: function get_info() {
      var _this3 = this;

      this.$get(this.$api.homeAddress + '/' + this.id).then(function (res) {
        _this3.info = res.data;
      });
    },
    // 获取列表
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
    this.get_areas();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true& ***!
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
  return _c("div", { staticClass: "user_address" }, [
    _c(
      "div",
      { staticClass: "user_main" },
      [
        _c("div", { staticClass: "block_title" }, [
          _vm._v("\n            收货地址编辑\n        ")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "x20" }),
        _vm._v(" "),
        _c(
          "a-form-model",
          { attrs: { "label-col": { span: 3 }, "wrapper-col": { span: 18 } } },
          [
            _c(
              "a-form-model-item",
              { attrs: { label: "收货人" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.receive_name,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "receive_name", $$v)
                    },
                    expression: "info.receive_name"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "手机" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.receive_tel,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "receive_tel", $$v)
                    },
                    expression: "info.receive_tel"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "地区" } },
              [
                _c("a-cascader", {
                  attrs: {
                    "field-names": {
                      label: "name",
                      value: "id",
                      children: "children"
                    },
                    options: _vm.areas,
                    placeholder: ""
                  },
                  on: { change: _vm.area_change },
                  model: {
                    value: _vm.info.area_id,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "area_id", $$v)
                    },
                    expression: "info.area_id"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "详细地址" } },
              [
                _c("a-input", {
                  model: {
                    value: _vm.info.address,
                    callback: function($$v) {
                      _vm.$set(_vm.info, "address", $$v)
                    },
                    expression: "info.address"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "设置默认地址" } },
              [
                _c("a-switch", {
                  attrs: { checked: _vm.info.is_default == 1 ? true : false },
                  on: { change: _vm.onChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { "wrapper-col": { span: 12, offset: 3 } } },
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Home/users/address/form.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/Home/users/address/form.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=c5dd25f2&scoped=true& */ "./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c5dd25f2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/users/address/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/address/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=c5dd25f2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/users/address/form.vue?vue&type=template&id=c5dd25f2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_c5dd25f2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);