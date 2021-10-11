(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      areas: [],
      list: [{
        id: 0,
        name: '自定义运费模版',
        f_weight: 0.00,
        f_price: 0.00,
        o_weight: 0,
        o_price: 0.00,
        area_id: [],
        area_show: false
      }]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleSubmit: function handleSubmit() {
      var _this = this;

      this.$post(this.$api.adminFreights, {
        info: this.list
      }).then(function (res) {
        _this.$returnInfo(res);

        _this.get_info();
      });
    },
    get_info: function get_info() {
      var _this2 = this;

      this.$get(this.$api.adminFreights).then(function (res) {
        if (res.code == 200 && res.data.length > 0) {
          _this2.list = res.data;

          _this2.$forceUpdate();
        }
      });
    },
    // 获取地址
    get_areas: function get_areas() {
      var _this3 = this;

      this.$get(this.$api.adminAreas).then(function (res) {
        _this3.areas = res.data;
      });
    },
    addSetting: function addSetting() {
      var obj = {
        id: 0,
        name: '自定义运费模版',
        f_weight: 0.00,
        f_price: 0.00,
        o_weight: 0,
        o_price: 0.00,
        area_id: [],
        area_show: false
      };
      this.list.push(obj);
    },
    del: function del(id, k) {
      var _this4 = this;

      if (id != 0) {
        this.$delete(this.$api.adminFreights + '/' + id).then(function (res) {
          if (res.code == 200) {
            _this4.list.splice(k, 1);
          } else {
            return _this4.$message.error(res.msg);
          }
        });
      } else {
        this.list.splice(k, 1);
      }
    },
    onChange: function onChange() {
      console.log(this.list[1].area_id);
    },
    showArea: function showArea(k) {
      this.list[k].area_show = !this.list[k].area_show;
    },
    // 获取列表
    onload: function onload() {
      this.get_areas();
      this.get_info();
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".area_list[data-v-6128d054] {\n  margin-top: 10px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true& ***!
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
  return _c("div", { staticClass: "qingwu" }, [
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
        _vm._v("\n        配送运费\n    ")
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "unline underm" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "admin_form" },
      [
        _c(
          "a-form-model",
          { attrs: { "label-col": { span: 3 }, "wrapper-col": { span: 18 } } },
          [
            _c(
              "a-form-model-item",
              { attrs: { label: "默认运费" } },
              [
                _c(
                  "a-row",
                  { attrs: { gutter: 5 } },
                  [
                    _c(
                      "a-col",
                      { attrs: { md: 6, sm: 24 } },
                      [
                        _c("a-input", {
                          attrs: {
                            type: "number",
                            "addon-before": "首重",
                            "addon-after": "kg内"
                          },
                          model: {
                            value: _vm.list[0]["f_weight"],
                            callback: function($$v) {
                              _vm.$set(_vm.list[0], "f_weight", $$v)
                            },
                            expression: "list[0]['f_weight']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "a-col",
                      { attrs: { md: 6, sm: 24 } },
                      [
                        _c("a-input", {
                          attrs: {
                            type: "number",
                            "addon-before": "运费",
                            "addon-after": "￥"
                          },
                          model: {
                            value: _vm.list[0]["f_price"],
                            callback: function($$v) {
                              _vm.$set(_vm.list[0], "f_price", $$v)
                            },
                            expression: "list[0]['f_price']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "a-col",
                      { attrs: { md: 6, sm: 24 } },
                      [
                        _c("a-input", {
                          attrs: {
                            type: "number",
                            "addon-before": "每增加",
                            "addon-after": "kg"
                          },
                          model: {
                            value: _vm.list[0]["o_weight"],
                            callback: function($$v) {
                              _vm.$set(_vm.list[0], "o_weight", $$v)
                            },
                            expression: "list[0]['o_weight']"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "a-col",
                      { attrs: { md: 6, sm: 24 } },
                      [
                        _c("a-input", {
                          attrs: {
                            type: "number",
                            "addon-before": "增加运费",
                            "addon-after": "￥"
                          },
                          model: {
                            value: _vm.list[0]["o_price"],
                            callback: function($$v) {
                              _vm.$set(_vm.list[0], "o_price", $$v)
                            },
                            expression: "list[0]['o_price']"
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { label: "自定义运费" } },
              [
                _c(
                  "a-row",
                  {
                    staticStyle: {
                      background: "#efefef",
                      "text-align": "center"
                    },
                    attrs: { gutter: 5 }
                  },
                  [
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [_vm._v("标题")]),
                    _vm._v(" "),
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [
                      _vm._v("首重（kg）")
                    ]),
                    _vm._v(" "),
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [
                      _vm._v("运费（￥）")
                    ]),
                    _vm._v(" "),
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [
                      _vm._v("续重（kg）")
                    ]),
                    _vm._v(" "),
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [
                      _vm._v("续费（￥）")
                    ]),
                    _vm._v(" "),
                    _c("a-col", { attrs: { md: 4, sm: 24 } }, [_vm._v("操作")])
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._l(_vm.list, function(v, k) {
                  return _c("div", { key: k }, [
                    k > 0
                      ? _c(
                          "div",
                          [
                            _c(
                              "a-row",
                              {
                                staticStyle: {
                                  background: "#efefef",
                                  "text-align": "center",
                                  "padding-bottom": "10px"
                                },
                                attrs: { gutter: 5 }
                              },
                              [
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c("a-input", {
                                      model: {
                                        value: v.name,
                                        callback: function($$v) {
                                          _vm.$set(v, "name", $$v)
                                        },
                                        expression: "v.name"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c("a-input", {
                                      attrs: {
                                        type: "number",
                                        "addon-after": "kg"
                                      },
                                      model: {
                                        value: v.f_weight,
                                        callback: function($$v) {
                                          _vm.$set(v, "f_weight", $$v)
                                        },
                                        expression: "v.f_weight"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c("a-input", {
                                      attrs: {
                                        type: "number",
                                        "addon-after": "￥"
                                      },
                                      model: {
                                        value: v.f_price,
                                        callback: function($$v) {
                                          _vm.$set(v, "f_price", $$v)
                                        },
                                        expression: "v.f_price"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c("a-input", {
                                      attrs: {
                                        type: "number",
                                        "addon-after": "kg"
                                      },
                                      model: {
                                        value: v.o_weight,
                                        callback: function($$v) {
                                          _vm.$set(v, "o_weight", $$v)
                                        },
                                        expression: "v.o_weight"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c("a-input", {
                                      attrs: {
                                        type: "number",
                                        "addon-after": "￥"
                                      },
                                      model: {
                                        value: v.o_price,
                                        callback: function($$v) {
                                          _vm.$set(v, "o_price", $$v)
                                        },
                                        expression: "v.o_price"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "a-col",
                                  { attrs: { md: 4, sm: 24 } },
                                  [
                                    _c(
                                      "a-button",
                                      {
                                        attrs: { size: "small" },
                                        on: {
                                          click: function($event) {
                                            return _vm.showArea(k)
                                          }
                                        }
                                      },
                                      [_vm._v("区域编辑")]
                                    ),
                                    _c(
                                      "a-button",
                                      {
                                        staticStyle: { "margin-left": "10px" },
                                        attrs: {
                                          type: "danger",
                                          size: "small"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.del(v.id, k)
                                          }
                                        }
                                      },
                                      [_vm._v("删除")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: v.area_show,
                                    expression: "v.area_show"
                                  }
                                ],
                                staticClass: "area_list"
                              },
                              [
                                _c(
                                  "a-checkbox-group",
                                  {
                                    attrs: { name: "groupcheckbox" + k },
                                    on: { change: _vm.onChange },
                                    model: {
                                      value: v.area_id,
                                      callback: function($$v) {
                                        _vm.$set(v, "area_id", $$v)
                                      },
                                      expression: "v.area_id"
                                    }
                                  },
                                  _vm._l(_vm.areas, function(vo, key) {
                                    return _c(
                                      "span",
                                      {
                                        key: key,
                                        staticStyle: {
                                          "margin-right": "20px",
                                          "padding-bottom": "10px",
                                          display: "inline-block"
                                        }
                                      },
                                      [
                                        _c(
                                          "a-checkbox",
                                          { attrs: { value: "" + vo.id } },
                                          [_vm._v(_vm._s(vo.name))]
                                        )
                                      ],
                                      1
                                    )
                                  }),
                                  0
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ])
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "a-form-model-item",
              { attrs: { "wrapper-col": { span: 12, offset: 3 } } },
              [
                _c(
                  "a-button",
                  {
                    attrs: { type: "primary" },
                    on: { click: _vm.handleSubmit }
                  },
                  [_vm._v("提交")]
                ),
                _vm._v(" "),
                _c(
                  "a-button",
                  {
                    staticStyle: { "margin-left": "10px" },
                    attrs: { icon: "edit" },
                    on: {
                      click: function($event) {
                        return _vm.addSetting()
                      }
                    }
                  },
                  [_vm._v("添加配置")]
                )
              ],
              1
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

/***/ "./resources/js/views/Admin/freights/form.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Admin/freights/form.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=6128d054&scoped=true& */ "./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& */ "./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6128d054",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Admin/freights/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=style&index=0&id=6128d054&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_6128d054_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=6128d054&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Admin/freights/form.vue?vue&type=template&id=6128d054&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6128d054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);