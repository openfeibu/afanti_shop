(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
      username: "",
      password: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 登录
    login: function login() {
      // 重新赋值vm使 axios可用vue实例
      var vm = this;

      if (this.username == "" || this.password == "") {
        this.$message.error("用户名和密码不能为空！");
        return;
      }

      this.$post(this.$api.homeLogin, {
        phone: this.username,
        password: this.password
      }).then(function (res) {
        if (res.code == 200) {
          // console.log(res);
          // 存储用户的token
          localStorage.setItem("token", res.data.token);
          vm.$store.dispatch('homeLogin/login', res);
          vm.$message.success('登录成功！');
          vm.$router.push({
            name: "home_user_default"
          });
        } else {
          vm.$message.error(res.msg);
        }
      });
    },
    wechat_login: function wechat_login() {
      window.location.href = "/api/oauth/weixinweb";
    }
  },
  created: function created() {
    var _this = this; // 判断token是否失效


    this.$get(this.$api.homeCheckLogin).then(function (res) {
      // console.log(res);
      if (res.code == 200) {
        _this.$router.push({
          name: "home_user_default"
        });
      }
    });
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".login_block[data-v-2d8d01a3] {\n  text-align: right;\n}\n.login_block .login_btn_b[data-v-2d8d01a3] {\n  text-align: right;\n  font-size: 12px;\n  margin-top: 15px;\n  margin-bottom: 40px;\n}\n.login_block .login_btn_b a[data-v-2d8d01a3] {\n  margin: 0 8px;\n  color: #999;\n}\n.login_block .other_login_block[data-v-2d8d01a3] {\n  cursor: pointer;\n  text-align: center;\n  line-height: 30px;\n}\n.login_block .other_login_block i[data-v-2d8d01a3] {\n  font-size: 30px;\n}\n.login_block .login_item[data-v-2d8d01a3] {\n  width: 400px;\n  background: #fff;\n  height: 450px;\n  float: right;\n  box-sizing: border-box;\n  padding: 40px;\n  margin-top: 50px;\n  text-align: left;\n}\n.login_block .login_item .login_btn[data-v-2d8d01a3] {\n  cursor: pointer;\n  color: #fff;\n  background: #ca151e;\n  line-height: 35px;\n  width: 100%;\n  text-align: center;\n  font-size: 16px;\n}\n.login_block .login_item .login_input[data-v-2d8d01a3] {\n  margin-top: 30px;\n}\n.login_block .login_item .login_input .input_block[data-v-2d8d01a3] {\n  margin: 15px auto;\n  width: 320px;\n}\n.login_block .login_item .login_input .input_block input[data-v-2d8d01a3] {\n  width: 100%;\n  border: 1px solid #e1e1e1;\n  height: 35px;\n  text-indent: 6px;\n  outline: none;\n}\n.login_block .login_item .login_title ul[data-v-2d8d01a3] {\n  margin-left: 55px;\n}\n.login_block .login_item .login_title ul[data-v-2d8d01a3]:after {\n  content: \"\";\n  display: block;\n  clear: both;\n}\n.login_block .login_item .login_title ul li[data-v-2d8d01a3] {\n  cursor: pointer;\n  float: left;\n  margin-right: 20px;\n  font-size: 20px;\n}\n.login_block .login_item .login_title ul li.red[data-v-2d8d01a3] {\n  color: #ca151e;\n}\n.login_block .login_item .login_title ul li[data-v-2d8d01a3]:hover {\n  color: #ca151e;\n}\n.home_login[data-v-2d8d01a3] {\n  height: 550px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "home_login",
      style:
        "background: url(" + __webpack_require__(/*! @/asset/login/user_login__bgs.png */ "./resources/js/asset/login/user_login__bgs.png") + ");"
    },
    [
      _c("div", { staticClass: "login_block w1200" }, [
        _c(
          "div",
          { staticClass: "login_item" },
          [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "login_input" }, [
              _c("div", { staticClass: "input_block" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.username,
                      expression: "username"
                    }
                  ],
                  attrs: { type: "text", placeholder: "手机" },
                  domProps: { value: _vm.username },
                  on: {
                    keyup: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.login($event)
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.username = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "input_block" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.password,
                      expression: "password"
                    }
                  ],
                  attrs: { type: "password", placeholder: "密码" },
                  domProps: { value: _vm.password },
                  on: {
                    keyup: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.login($event)
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.password = $event.target.value
                    }
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "login_btn", on: { click: _vm.login } }, [
              _vm._v("登 录")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "login_btn_b" },
              [
                _c("router-link", { attrs: { to: "/user/register" } }, [
                  _vm._v("注册")
                ]),
                _vm._v("|"),
                _c("router-link", { attrs: { to: "/user/forget_password" } }, [
                  _vm._v("忘记密码？")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("a-divider", [_vm._v("其他登录方式")]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "other_login_block",
                on: {
                  click: function($event) {
                    return _vm.wechat_login()
                  }
                }
              },
              [
                _c("a-font", { attrs: { type: "iconweixin" } }),
                _vm._v(" "),
                _c("p", [_vm._v("微信登录")])
              ],
              1
            )
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "login_title" }, [
      _c("ul", [
        _c("li", { staticClass: "red" }, [_vm._v("帐号登录")]),
        _vm._v(" "),
        _c("li", [_vm._v("|")]),
        _vm._v(" "),
        _c("li", [_vm._v("扫码登录")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/asset/login/user_login__bgs.png":
/*!******************************************************!*\
  !*** ./resources/js/asset/login/user_login__bgs.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/dist/images/user_login__bgs.png?55dc3196390ddaa7207e463391ce4cf3";

/***/ }),

/***/ "./resources/js/views/Home/auth/login.vue":
/*!************************************************!*\
  !*** ./resources/js/views/Home/auth/login.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=2d8d01a3&scoped=true& */ "./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true&");
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ "./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& */ "./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2d8d01a3",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home/auth/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=style&index=0&id=2d8d01a3&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_id_2d8d01a3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./login.vue?vue&type=template&id=2d8d01a3&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home/auth/login.vue?vue&type=template&id=2d8d01a3&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_2d8d01a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);