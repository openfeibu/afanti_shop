(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      loading: false,
      info: {},
      goodsClasses: [],
      choseClasses: [],
      areas: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    next_step: function next_step() {
      var _this = this;

      console.log(this.choseClasses);

      if (this.$isEmpty(this.info.store_name)) {
        return this.$message.error('展馆名称不能为空');
      }

      if (this.$isEmpty(this.info.store_company_name)) {
        return this.$message.error('公司名称不能为空');
      }

      if (this.$isEmpty(this.info.area_info)) {
        return this.$message.error('地址不能为空');
      }

      if (this.$isEmpty(this.info.store_address)) {
        return this.$message.error('详细地址不能为空');
      }

      if (this.$isEmpty(this.info.business_license)) {
        return this.$message.error('营业执照不能为空');
      }

      if (this.$isEmpty(this.info.business_license_no)) {
        return this.$message.error('统一社会信用代码不能为空');
      }

      if (this.$isEmpty(this.info.legal_person)) {
        return this.$message.error('法人不能为空');
      }

      if (this.$isEmpty(this.info.store_phone)) {
        return this.$message.error('法人电话不能为空');
      }

      if (this.$isEmpty(this.info.id_card_no)) {
        return this.$message.error('身份证号码不能为空');
      }

      if (this.$isEmpty(this.info.id_card_t)) {
        return this.$message.error('身份证(上)不能为空');
      }

      if (this.$isEmpty(this.info.id_card_b)) {
        return this.$message.error('身份证(下)不能为空');
      }

      if (this.$isEmpty(this.info.emergency_contact)) {
        return this.$message.error('紧急联系人不能为空');
      }

      if (this.$isEmpty(this.info.emergency_contact_phone)) {
        return this.$message.error('紧急联系人电话不能为空');
      }

      if (this.choseClasses.length <= 0) {
        return this.$message.error('申请商品栏目不能为空');
      }

      var params = {};
      params = this.info;
      params.store_classes = this.choseClasses;
      this.$post(this.$api.homeStoreJoin, params).then(function (res) {
        if (res.code == 200) {
          return _this.$router.push('/store/join/step_3');
        }

        return _this.$$message.error(res.msg);
      });
    },
    store_verify: function store_verify() {
      var _this2 = this;

      this.$get(this.$api.homeStoreVerify).then(function (res) {
        if (res.code == 200) {
          if (res.data.store_verify == 2 || res.data.store_verify == 3 || res.data.store_verify == 0) {
            _this2.$router.push('/store/join/step_3');
          }
        } else {
          _this2.$router.push('/store/join/step_1');
        }
      });
    },
    // 获取商品栏目
    goods_classes: function goods_classes() {
      var _this3 = this;

      this.$get(this.$api.homeGoodsClasses).then(function (res) {
        _this3.goodsClasses = res.data;
      });
    },
    // 商品栏目修改
    goods_class_change: function goods_class_change(row, info) {
      console.log(info);

      if (info != undefined) {
        if (this.choseClasses.length > 0) {
          var isSame = false;
          this.choseClasses.forEach(function (item) {
            if (item[0].name + item[1].name + item[2].name == info[0].name + info[1].name + info[2].name) {
              isSame = true;
            }
          });

          if (!isSame) {
            this.choseClasses.push(info);
          }
        } else {
          this.choseClasses.push(info);
        }
      }
    },
    // 删除标签
    closeTag: function closeTag(e) {
      this.choseClasses.splice(e, 1);
    },
    // 获取地址
    get_areas: function get_areas() {
      var _this4 = this;

      this.$get(this.$api.homeAreas).then(function (res) {
        _this4.areas = res.data;
      });
    },
    // 获取展馆信息
    get_store: function get_store() {
      var _this5 = this;

      this.$get(this.$api.homeStoreJoin).then(function (res) {
        if (res.code == 200) {
          _this5.choseClasses = res.data.chose_store_classes;
          return _this5.info = res.data;
        }

        return _this5.$$message.error(res.msg);
      });
    },
    area_change: function area_change(row, info) {
      this.info.province_id = row[0];
      this.info.city_id = row[1];
      this.info.region_id = row[2];
      this.info.area_info = info[0].name + ' ' + info[1].name + ' ' + info[2].name;
      console.log(this.info);
    },
    upload: function upload(e) {
      if (e.file.status == 'done') {
        this.loading = false;
        var rs = e.file.response;

        if (rs.code == 200) {
          this.$set(this.info, rs.data.name, rs.data.url);
        } else {
          return this.$message.error(rs.msg);
        }
      } else {
        this.loading = true;
      }
    }
  },
  created: function created() {
    this.store_verify();
    this.goods_classes();
    this.get_areas();
    this.get_store();
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

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".agreement_btn[data-v-13078385] {\n  margin: 20px 0 10px 0;\n  text-align: center;\n}\n.store_join_form[data-v-13078385] {\n  margin-top: 60px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "store_join width_center_1200" },
    [
      _c("div", { staticClass: "step_bar" }, [
        _c("div", { staticClass: "step" }, [
          _c(
            "div",
            { staticClass: "item success" },
            [_c("a-icon", { attrs: { type: "read" } }), _vm._v("阅读协议")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "item check" },
            [_c("a-icon", { attrs: { type: "edit" } }), _vm._v("填写资料")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "item" },
            [_c("a-icon", { attrs: { type: "coffee" } }), _vm._v("等待审核")],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "item" },
            [
              _c("a-icon", { attrs: { type: "check-circle" } }),
              _vm._v("审核通过")
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "a-divider",
        [
          _c("font", { staticStyle: { "font-size": "20px" } }, [
            _vm._v("入驻资料填写")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "store_join_form" },
        [
          _c(
            "a-form-model",
            {
              attrs: { "label-col": { span: 5 }, "wrapper-col": { span: 12 } }
            },
            [
              _c(
                "a-form-model-item",
                { attrs: { label: "展馆名称" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.store_name,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "store_name", $$v)
                      },
                      expression: "info.store_name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "展馆LOGO" } },
                [
                  _c(
                    "a-upload",
                    {
                      staticClass: "avatar-uploader",
                      attrs: {
                        "list-type": "picture-card",
                        "show-upload-list": false,
                        action: _vm.$api.homeStoreJoinUpload,
                        data: {
                          token: _vm.$getSession("token_type"),
                          name: "store_logo"
                        }
                      },
                      on: { change: _vm.upload }
                    },
                    [
                      _vm.info.store_logo
                        ? _c("img", {
                            attrs: { height: "150px", src: _vm.info.store_logo }
                          })
                        : _c(
                            "div",
                            [
                              !_vm.loading
                                ? _c("a-font", { attrs: { type: "iconplus" } })
                                : _c("a-icon", { attrs: { type: "loading" } })
                            ],
                            1
                          )
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "申请产品栏目" } },
                [
                  _c("a-cascader", {
                    attrs: {
                      "field-names": {
                        label: "name",
                        value: "id",
                        children: "children"
                      },
                      options: _vm.goodsClasses,
                      placeholder: ""
                    },
                    on: { change: _vm.goods_class_change }
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.choseClasses, function(v, k) {
                    return _c(
                      "a-tag",
                      {
                        key: k,
                        attrs: { closable: "" },
                        on: {
                          close: function($event) {
                            return _vm.closeTag(k)
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(v[0].name) +
                            " / " +
                            _vm._s(v[1].name) +
                            " / " +
                            _vm._s(v[2].name)
                        )
                      ]
                    )
                  })
                ],
                2
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
        { staticClass: "store_join_form" },
        [
          _c(
            "a-form-model",
            {
              attrs: { "label-col": { span: 5 }, "wrapper-col": { span: 12 } }
            },
            [
              _c(
                "a-form-model-item",
                { attrs: { label: "公司名称" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.store_company_name,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "store_company_name", $$v)
                      },
                      expression: "info.store_company_name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "公司地址" } },
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
                      value: _vm.info.store_address,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "store_address", $$v)
                      },
                      expression: "info.store_address"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "营业执照" } },
                [
                  _c(
                    "a-upload",
                    {
                      staticClass: "avatar-uploader",
                      attrs: {
                        "list-type": "picture-card",
                        "show-upload-list": false,
                        action: _vm.$api.homeStoreJoinUpload,
                        data: {
                          token: _vm.$getSession("token_type"),
                          name: "business_license"
                        }
                      },
                      on: { change: _vm.upload }
                    },
                    [
                      _vm.info.business_license
                        ? _c("img", {
                            attrs: {
                              height: "150px",
                              src: _vm.info.business_license
                            }
                          })
                        : _c(
                            "div",
                            [
                              !_vm.loading
                                ? _c("a-font", { attrs: { type: "iconplus" } })
                                : _c("a-icon", { attrs: { type: "loading" } })
                            ],
                            1
                          )
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "统一社会信用代码" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.business_license_no,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "business_license_no", $$v)
                      },
                      expression: "info.business_license_no"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "法人" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.legal_person,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "legal_person", $$v)
                      },
                      expression: "info.legal_person"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "法人联系方式" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.store_phone,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "store_phone", $$v)
                      },
                      expression: "info.store_phone"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "身份证号码" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.id_card_no,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "id_card_no", $$v)
                      },
                      expression: "info.id_card_no"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "身份证(上)" } },
                [
                  _c(
                    "a-upload",
                    {
                      staticClass: "avatar-uploader",
                      attrs: {
                        "list-type": "picture-card",
                        "show-upload-list": false,
                        action: _vm.$api.homeStoreJoinUpload,
                        data: {
                          token: _vm.$getSession("token_type"),
                          name: "id_card_t"
                        }
                      },
                      on: { change: _vm.upload }
                    },
                    [
                      _vm.info.id_card_t
                        ? _c("img", {
                            attrs: { height: "150px", src: _vm.info.id_card_t }
                          })
                        : _c(
                            "div",
                            [
                              !_vm.loading
                                ? _c("a-font", { attrs: { type: "iconplus" } })
                                : _c("a-icon", { attrs: { type: "loading" } })
                            ],
                            1
                          )
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "身份证(下)" } },
                [
                  _c(
                    "a-upload",
                    {
                      staticClass: "avatar-uploader",
                      attrs: {
                        "list-type": "picture-card",
                        "show-upload-list": false,
                        action: _vm.$api.homeStoreJoinUpload,
                        data: {
                          token: _vm.$getSession("token_type"),
                          name: "id_card_b"
                        }
                      },
                      on: { change: _vm.upload }
                    },
                    [
                      _vm.info.id_card_b
                        ? _c("img", {
                            attrs: { height: "150px", src: _vm.info.id_card_b }
                          })
                        : _c(
                            "div",
                            [
                              !_vm.loading
                                ? _c("a-font", { attrs: { type: "iconplus" } })
                                : _c("a-icon", { attrs: { type: "loading" } })
                            ],
                            1
                          )
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "紧急联系人" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.emergency_contact,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "emergency_contact", $$v)
                      },
                      expression: "info.emergency_contact"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "a-form-model-item",
                { attrs: { label: "紧急联系人电话" } },
                [
                  _c("a-input", {
                    model: {
                      value: _vm.info.emergency_contact_phone,
                      callback: function($$v) {
                        _vm.$set(_vm.info, "emergency_contact_phone", $$v)
                      },
                      expression: "info.emergency_contact_phone"
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
        "div",
        { staticClass: "agreement_btn" },
        [
          _c(
            "a-button",
            { attrs: { type: "primary" }, on: { click: _vm.next_step } },
            [_vm._v("确认资料，提交审核")]
          )
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

/***/ "./resources/js/views/Home/store/join/step_2.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_2.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step_2.vue?vue&type=template&id=13078385&scoped=true& */ "./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true&");
/* harmony import */ var _step_2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step_2.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& */ "./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _step_2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "13078385",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/store/join/step_2.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_2.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=style&index=0&id=13078385&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_style_index_0_id_13078385_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./step_2.vue?vue&type=template&id=13078385&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/store/join/step_2.vue?vue&type=template&id=13078385&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_step_2_vue_vue_type_template_id_13078385_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);