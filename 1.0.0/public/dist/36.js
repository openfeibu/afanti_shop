(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      address: [],
      order: [],
      address_id: 0,
      total: 0,
      remark: '',
      loading: false,
      freight: 0,
      total_discount: 0,
      province_id: 0,
      modal: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    onload: function onload() {
      this.create_order_before();
    },
    // 获取地址
    get_address: function get_address() {
      var _this = this;

      this.$get(this.$api.homeAddress).then(function (res) {
        res.data.forEach(function (item) {
          if (item.is_default == 1) {
            _this.address_id = item.id;
            _this.province_id = item.province_id;
          }
        });
        _this.address = res.data;

        _this.get_freight();
      });
    },
    // 地址选择
    addressChange: function addressChange(id) {
      var _this2 = this;

      this.$put(this.$api.homeAddress + '/default/set', {
        id: id
      }).then(function (res) {
        if (res.code == 200) {
          _this2.get_address();

          _this2.$message.success('设置地址成功');

          _this2.address_id = id;
        } else {
          _this2.$message.destroy();

          _this2.$message.error(res.msg);
        }
      });
    },
    get_freight: function get_freight() {
      var _this3 = this;

      var params = {
        freight_id: this.order.freight_id,
        total_weight: this.order.total_weight,
        province_id: this.province_id
      };
      this.$get(this.$api.homeOrder + '/get_freight', params).then(function (res) {
        if (res.code == 200) {
          _this3.freight = _this3.$formatFloat(res.data.freight);
        }
      });
    },
    couponChangeHandle: function couponChangeHandle(val) {
      var that = this;
      var hh = that.order.coupon.coupons.filter(function (c, i, a) {
        //第一个参数为当前项,第二个参数为索引,第三个为原值
        if (c.id == that.order.coupon.coupon_id) {
          return c;
        }
      });

      if (this.order.coupon.coupon_id) {
        this.total_discount = this.$formatFloat(this.order.total_discount) + this.$formatFloat(hh[0].money);
      } else {
        this.total_discount = this.$formatFloat(this.order.total_discount);
      }
    },
    // 订单建立前预览商品信息
    create_order_before: function create_order_before() {
      var _this4 = this;

      var that = this;
      this.$get(this.$api.homeOrder + '/create_order_before', {
        params: this.$route.params.params
      }).then(function (res) {
        if (res.code == 200) {
          _this4.order = res.data;

          _this4.get_address();

          _this4.couponChangeHandle();
        } else if (res.code == 8012) {
          // this.$message.destroy();
          console.log(that.$router.history.matched);
          _this4.modal = _this4.$error({
            title: '阿凡提',
            content: '有产品库存信息发生变化，请返回购物车修改',
            onOk: function onOk() {
              return that.$router.push("/cart");
            }
          }); // return this.$router.go(-1)
        }
      });
    },
    // 创建订单
    create_order: function create_order() {
      var _this5 = this;

      if (this.loading) {
        return this.$message.error('请耐心等待，不要重复下单');
      }

      var params = {
        params: this.$route.params.params,
        address_id: this.address_id,
        coupon_id: this.order.coupon.coupon_id,
        remark: this.remark
      };
      this.loading = true;
      this.$post(this.$api.homeOrder + '/create_order', params).then(function (res) {
        if (res.code == 200) {
          var str = window.btoa(JSON.stringify(res.data));

          _this5.$router.push("/order/order_pay/" + str);
        } else {
          _this5.$message.error(res.msg);
        }

        _this5.loading = false;
      });
    }
  },
  created: function created() {
    this.onload();
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {
    if (this.modal != null) {
      this.modal.destroy();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".create_order_1[data-v-4501256e] {\n  padding: 0 0 50px 0;\n}\n.step_bar[data-v-4501256e] {\n  margin: 40px 0;\n}\n.block .title[data-v-4501256e] {\n  font-size: 16px;\n  clear: both;\n  font-weight: bold;\n  padding-bottom: 20px;\n}\n.block .title a[data-v-4501256e] {\n  float: right;\n  font-size: 14px;\n  color: #4bb16f;\n}\n.block .store_list[data-v-4501256e] {\n  margin-top: 20px;\n}\n.block .store_list .og_list[data-v-4501256e] {\n  margin-top: 20px;\n  color: #666;\n  font-size: 12px;\n  border: 1px solid #efefef;\n  padding: 20px 0;\n  line-height: 40px;\n}\n.block .store_list .og_list li[data-v-4501256e] {\n  margin-bottom: 15px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid #efefef;\n}\n.block .store_list .og_list li[data-v-4501256e]:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.block .store_list .og_list .red[data-v-4501256e] {\n  color: #ca151e;\n  font-weight: bold;\n}\n.block .store_list .og_list dl[data-v-4501256e]:after {\n  clear: both;\n  display: block;\n  content: \"\";\n}\n.block .store_list .og_list dl dt[data-v-4501256e] {\n  width: 40px;\n  height: 40px;\n  display: block;\n  float: left;\n  background: #f8f8f8;\n  margin-right: 15px;\n  margin-left: 20px;\n  border: 1px solid #efefef;\n}\n.block .store_list .og_list dl dt img[data-v-4501256e] {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 0;\n  vertical-align: unset;\n}\n.block .store_list .og_list dl dd[data-v-4501256e] {\n  float: left;\n  width: 400px;\n  height: 40px;\n  text-overflow: hidden;\n  line-height: 20px;\n}\n.block .store_list .og_list .goods_info_th[data-v-4501256e] {\n  text-indent: 20px;\n}\n.block .store_list .store_title img[data-v-4501256e] {\n  width: 35px;\n  height: 35px;\n  margin-right: 10px;\n  margin-left: 20px;\n  border-radius: 50%;\n}\n.block .store_list .store_title span[data-v-4501256e] {\n  line-height: 35px;\n}\n.block .sum_block[data-v-4501256e] {\n  width: 340px;\n  float: right;\n  padding: 20px;\n}\n.block .sum_block .sum_block_item[data-v-4501256e] {\n  height: 30px;\n  line-height: 30px;\n  color: #666;\n}\n.block .sum_block .label[data-v-4501256e] {\n  float: left;\n  width: 150px;\n  text-align: right;\n}\n.block .sum_block .con[data-v-4501256e] {\n  float: left;\n  width: 150px;\n  text-align: right;\n}\n.block .total-box[data-v-4501256e] {\n  background-color: #f2f2f2;\n  padding: 10px 20px;\n}\n.block .total-box .total[data-v-4501256e] {\n  width: 300px;\n  float: right;\n  line-height: 40px;\n}\n.block .total-box .total span[data-v-4501256e] {\n  font-size: 24px;\n  color: #ca151e;\n}\n.block .total-box .total .label[data-v-4501256e] {\n  float: left;\n  width: 150px;\n  text-align: right;\n}\n.block .total-box .total .con[data-v-4501256e] {\n  float: left;\n  width: 150px;\n  text-align: right;\n}\n.block .total-box .nowaddress[data-v-4501256e] {\n  width: 100%;\n  float: right;\n  line-height: 40px;\n  text-align: right;\n  color: #666;\n}\n.block .submitBtn[data-v-4501256e] {\n  background: #ca151e;\n  color: #fff;\n  border-radius: 3px;\n  width: 120px;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  display: block;\n  float: right;\n  cursor: pointer;\n  margin: 20px 0;\n}\n.block .submitBtn.hide[data-v-4501256e] {\n  background: #ccc;\n  cursor: not-allowed;\n  color: #666;\n}\n.block .submitBtn[data-v-4501256e]:hover {\n  opacity: 0.8;\n}\n.block .goods_th[data-v-4501256e] {\n  background: #f2f2f2;\n  line-height: 40px;\n  text-indent: 20px;\n}\n.block .remark[data-v-4501256e] {\n  margin-top: 40px;\n}\n.block .remark .remark_input[data-v-4501256e] {\n  margin: 20px 0;\n}\n.block .remark .remark_input textarea[data-v-4501256e] {\n  border-color: #cfcfcf;\n  outline: none;\n  border-radius: 4px;\n  padding: 8px;\n  height: 100px;\n  resize: none;\n}\n.block .empty_address[data-v-4501256e] {\n  margin-bottom: 80px;\n  line-height: 100px;\n  border: 3px solid #efefef;\n  border-radius: 3px;\n  text-align: center;\n  width: 292px;\n  height: 105px;\n}\n.block .empty_address a[data-v-4501256e] {\n  font-weight: bold;\n  color: #ca151e;\n}\n.block .address_list[data-v-4501256e] {\n  margin-bottom: 30px;\n}\n.block .address_list ul[data-v-4501256e]:after {\n  clear: both;\n  content: \"\";\n  display: block;\n}\n.block .address_list ul li[data-v-4501256e] {\n  cursor: pointer;\n  float: left;\n  box-sizing: border-box;\n  width: 292px;\n  height: 105px;\n  border-radius: 3px;\n  border: 2px solid #efefef;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  padding: 20px;\n  position: relative;\n  color: #666;\n}\n.block .address_list ul li[data-v-4501256e]:nth-child(4n) {\n  margin-right: 0;\n}\n.block .address_list ul li .receive_name[data-v-4501256e] {\n  margin-bottom: 10px;\n  font-weight: bold;\n  line-height: 18px;\n  color: #333;\n}\n.block .address_list ul li .receive_name span[data-v-4501256e] {\n  font-weight: normal;\n}\n.block .address_list ul li .cmarker[data-v-4501256e] {\n  position: absolute;\n  right: -10px;\n  bottom: -17px;\n  font-size: 30px;\n  color: #333;\n}\n.block .address_list ul li.red[data-v-4501256e] {\n  border-color: #1c8d44;\n}\n.block .address_list ul li.red .cmarker[data-v-4501256e] {\n  color: #4bb16f;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "create_order_1 w1200 clear" }, [
    _c("div", { staticClass: "step_bar" }, [
      _c("div", { staticClass: "step" }, [
        _c(
          "div",
          { staticClass: "item check" },
          [
            _c("a-icon", { attrs: { type: "shopping-cart" } }),
            _vm._v("我的购物车")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "item check" },
          [_c("a-icon", { attrs: { type: "car" } }), _vm._v("物流地址")],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "item" },
          [
            _c("a-icon", { attrs: { type: "account-book" } }),
            _vm._v("选择支付")
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "item" },
          [
            _c("a-icon", { attrs: { type: "check-circle" } }),
            _vm._v("支付成功")
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "block" }, [
      _c(
        "div",
        { staticClass: "title" },
        [
          _vm._v("选择送货地址"),
          _c("router-link", { attrs: { to: "/user/address/form" } }, [
            _vm._v("新增收货地址")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _vm.address.length > 0
        ? _c("div", { staticClass: "address_list" }, [
            _c(
              "ul",
              _vm._l(_vm.address, function(v, k) {
                return _c(
                  "li",
                  {
                    key: k,
                    class: v.is_default == 1 ? "red" : "",
                    on: {
                      click: function($event) {
                        return _vm.addressChange(v.id)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "receive_name" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(v.receive_name) +
                          "\n                        "
                      ),
                      _c("span", [_vm._v("(" + _vm._s(v.receive_tel) + ")")])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "area_info" }, [
                      _vm._v(_vm._s(v.area_info + " " + v.address))
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "cmarker" },
                      [_c("a-font", { attrs: { type: "iconcmarker" } })],
                      1
                    )
                  ]
                )
              }),
              0
            )
          ])
        : _c(
            "div",
            { staticClass: "empty_address" },
            [
              _vm._v("\n            没有设置收货地址，请先前往"),
              _c("router-link", { attrs: { to: "/user/address/form" } }, [
                _vm._v("设置")
              ])
            ],
            1
          )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "block" }, [
      _c("div", { staticClass: "title" }, [_vm._v("商品信息")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "goods_list" },
        [
          _c(
            "div",
            { staticClass: "goods_th" },
            [
              _c(
                "a-row",
                [
                  _c("a-col", { attrs: { span: 10 } }, [_vm._v("商品信息")]),
                  _vm._v(" "),
                  _c("a-col", { attrs: { span: 4 } }, [_vm._v("属性信息")]),
                  _vm._v(" "),
                  _c("a-col", { attrs: { span: 4 } }, [_vm._v("单价")]),
                  _vm._v(" "),
                  _c("a-col", { attrs: { span: 2 } }, [_vm._v("数量")]),
                  _vm._v(" "),
                  _c("a-col", { attrs: { span: 2 } }, [_vm._v("优惠")]),
                  _vm._v(" "),
                  _c("a-col", { attrs: { span: 2 } }, [_vm._v("小计")])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.order.list, function(v, k) {
            return _c("div", { key: k, staticClass: "store_list" }, [
              _c("div", { staticClass: "store_title" }, [
                _c(
                  "div",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "float_left",
                        attrs: { to: "/store/" + v.store_info.id }
                      },
                      [
                        _c("img", {
                          attrs: {
                            src:
                              v.store_info.store_logo ||
                              __webpack_require__(/*! @/asset/store/default_store_image.png */ "./resources/js/asset/store/default_store_image.png"),
                            alt: v.store_info.store_name
                          }
                        }),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(v.store_info.store_name))])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "clear" })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "og_list" }, [
                  _c(
                    "ul",
                    _vm._l(v.goods_list, function(vo, key) {
                      return _c(
                        "li",
                        { key: key },
                        [
                          _c(
                            "a-row",
                            [
                              _c("a-col", { attrs: { span: 10 } }, [
                                _c("dl", [
                                  _c("dt", [
                                    _c("img", {
                                      attrs: {
                                        src: vo.goods_master_image,
                                        alt: vo.goods_name
                                      }
                                    })
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "dd",
                                    { attrs: { title: vo.goods_name } },
                                    [_vm._v(_vm._s(vo.goods_name))]
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("a-col", { attrs: { span: 4 } }, [
                                _c("div", { staticClass: "goods_info_th" }, [
                                  _vm._v(_vm._s(vo.sku_name))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("a-col", { attrs: { span: 4 } }, [
                                _c("div", { staticClass: "goods_info_th" }, [
                                  _vm._v(_vm._s(vo.goods_price))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("a-col", { attrs: { span: 2 } }, [
                                _c("div", { staticClass: "goods_info_th" }, [
                                  _vm._v(_vm._s(vo.buy_num))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("a-col", { attrs: { span: 2 } }, [
                                _c("div", { staticClass: "goods_info_th" }, [
                                  _vm._v("-")
                                ])
                              ]),
                              _vm._v(" "),
                              _c("a-col", { attrs: { span: 2 } }, [
                                _c(
                                  "div",
                                  { staticClass: "goods_info_th red" },
                                  [_vm._v("￥" + _vm._s(vo.total_price))]
                                )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    0
                  )
                ])
              ])
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "remark" }, [
        _c("div", { staticClass: "goods_th" }, [_vm._v("备注")]),
        _vm._v(" "),
        _c("div", { staticClass: "remark_input" }, [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.remark,
                expression: "remark"
              }
            ],
            attrs: { cols: "60", rows: "3" },
            domProps: { value: _vm.remark },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.remark = $event.target.value
              }
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "sum_block" }, [
        _vm.order.coupon
          ? _c("div", { staticClass: "sum_block_item" }, [
              _c("div", { staticClass: "label" }, [_vm._v("优惠券：")]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "con" },
                [
                  _c(
                    "a-select",
                    {
                      staticStyle: { width: "140px" },
                      on: { change: _vm.couponChangeHandle },
                      model: {
                        value: _vm.order.coupon.coupon_id,
                        callback: function($$v) {
                          _vm.$set(_vm.order.coupon, "coupon_id", $$v)
                        },
                        expression: "order.coupon.coupon_id"
                      }
                    },
                    [
                      _c("a-select-option", { attrs: { value: 0 } }, [
                        _vm._v("不使用优惠券")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.order.coupon.coupons, function(val, key) {
                        return _c(
                          "a-select-option",
                          { key: key, attrs: { value: val.id } },
                          [_vm._v(_vm._s(val.money) + "优惠券")]
                        )
                      })
                    ],
                    2
                  )
                ],
                1
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "order_price sum_block_item" }, [
          _c("div", { staticClass: "label" }, [_vm._v("总商品金额：")]),
          _c("div", { staticClass: "con" }, [
            _c("span", [_vm._v("￥" + _vm._s(_vm.order.order_price))])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "freight sum_block_item" }, [
          _c("div", { staticClass: "label" }, [_vm._v("运费：")]),
          _c("div", { staticClass: "con" }, [
            _c("span", [_vm._v("￥" + _vm._s(_vm.freight))])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "discount sum_block_item" }, [
          _c("div", { staticClass: "label" }, [_vm._v("优惠：")]),
          _c("div", { staticClass: "con" }, [
            _c("span", [_vm._v("-￥" + _vm._s(_vm.total_discount))])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "clear" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "total-box clear" },
        [
          _c("div", { staticClass: "total sum_block_item" }, [
            _c("div", { staticClass: "label" }, [_vm._v("应付金额：")]),
            _c("div", { staticClass: "con" }, [
              _c("span", [
                _vm._v(
                  "￥" +
                    _vm._s(
                      _vm.order.order_price + _vm.freight - _vm.total_discount
                    )
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "clear" }),
          _vm._v(" "),
          _vm._l(_vm.address, function(v, k) {
            return v.is_default == 1
              ? _c("div", { key: k, staticClass: "nowaddress" }, [
                  _vm._v(
                    "寄往：" +
                      _vm._s(v.area_info + " " + v.address) +
                      " 收货人：" +
                      _vm._s(v.receive_name + " " + v.receive_tel)
                  )
                ])
              : _vm._e()
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          class: _vm.loading ? "submitBtn hide" : "submitBtn",
          on: { click: _vm.create_order }
        },
        [_vm._v(_vm._s(_vm.loading ? "加载中.." : "创建订单"))]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/asset/store/default_store_image.png":
/*!**********************************************************!*\
  !*** ./resources/js/asset/store/default_store_image.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/dist/images/default_store_image.png?6d71e205fa88c6dac23c5b3dbe7e12ce";

/***/ }),

/***/ "./resources/js/views/Home/orders/index.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Home/orders/index.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=4501256e&scoped=true& */ "./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& */ "./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4501256e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/orders/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=style&index=0&id=4501256e&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_4501256e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=4501256e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/orders/index.vue?vue&type=template&id=4501256e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_4501256e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);