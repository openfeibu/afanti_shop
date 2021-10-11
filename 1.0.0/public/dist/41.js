(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      webSocketLink: "ws://127.0.0.1:2346",
      music: "/default.mp3",
      // 播放音频地址
      upload_headers: {},
      page: 1,
      // 聊天页码
      socketObj: null,
      isOnline: false,
      // 是否链接上socket
      isBind: false,
      // 是否已经绑定
      connect_info: {
        // 用户信息，包括聊天好友信息
        user_id: 0,
        to_user_id: 0
      },
      onChat: [],
      onChatIndex: -1,
      sendMsg: {
        type: 'text',
        // 类型
        content: '',
        // 内容
        uid: 0,
        send_type: 1,
        store_id: 0
      },
      chat_friend: [],
      // 好友列表
      storeInfo: {}
    };
  },
  watch: {},
  computed: {},
  methods: {
    websocketInit: function websocketInit() {
      // 判断是否登录
      // console.log(this.storeInfo)
      // if(!this.isLogin){
      //     this.$router.push('/user/login');
      // }
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socketObj = new WebSocket(this.webSocketLink); // 监听socket连接

        this.socketObj.onopen = this.open; // 监听socket错误信息

        this.socketObj.onerror = this.error; // 监听socket消息

        this.socketObj.onmessage = this.getMessage;
      }
    },
    open: function open() {
      // 如果已经链接则不再重复链接
      if (this.socketObj.readyState == 1 && this.isBind) {
        return true;
      } // eslint-disable-next-line no-console


      console.log("socket连接成功"); // 如果登录了，且用户ID存在

      this.sendMsg.type = 'bind';
      this.sendMsg.uid = this.storeInfo.id;
      this.sendMsg.store_id = this.storeInfo.id;
      var infoStr = JSON.stringify(this.sendMsg);

      if (this.storeInfo.id > 0) {
        this.socketObj.send(infoStr); // 发送用户ID到服务器

        this.isBind = true; // 发送完了绑定信息

        this.get_chat_friend();
      }
    },
    error: function error() {
      // eslint-disable-next-line no-console
      console.log("连接错误");
    },
    getMessage: function getMessage(msg) {
      var _this = this;

      var obj = JSON.parse(msg.data);

      if (obj == undefined) {
        return;
      } // eslint-disable-next-line no-console


      var chatType = 1;

      switch (obj.type) {
        case 'bind':
          // 绑定用户成功
          this.isOnline = true;
          break;

        case 'error':
          this.$message.error('服务端消息接收失败!');
          break;

        case 'text':
          // 文字接收
          break;

        case 'image':
          // 图片接收
          break;

        default:
          // 都不是
          chatType = -1;
          break;
      }

      if (chatType == -1) {
        return;
      }

      console.log(obj); // 只要不是心跳检测，就查询一次好友列表
      // if(obj.type != '@heart@'){
      //     this.get_chat_msg({uid:obj.user_id});
      // }
      // 只要不是就处理到指定位置

      if (obj.type != 'bind' && obj.type != 'error' && obj.type != 'other') {
        // 判断如果发送人不是自己则提示音
        if (obj.send_type == 0) {
          console.log(this.music);
          var audio = new Audio(this.music);
          audio.play();
        }

        this.scrollDown(); // 如果没有正在聊天的窗口 直接返回不管

        if (this.chat_friend.length <= 0) {
          return false;
        }

        console.log(this.chat_friend);
        this.chat_friend.forEach(function (item, key) {
          // 正在聊天则将聊天记录放入到onChat内
          if (item.user_id == obj.user_id && key == _this.onChatIndex) {
            obj.avatar = _this.chat_friend[key].avatar;
            obj.nickname = _this.chat_friend[key].nickname;
            obj.store_logo = _this.chat_friend[key].store_logo || '';
            obj.store_name = _this.chat_friend[key].store_name || '';

            _this.chat_friend[key].chat_msg.data.push(obj); // 放入


            _this.scrollDown(); // 如果消息存在onChat 则要清空未读记录
            // if(obj.uid != this.user_info.id){
            //     this.clearNoRead(obj.content.user_id,obj.content.to_user_id);
            // }

          }
        });
        this.$forceUpdate();
      }
    },
    send: function send(type) {
      var _this2 = this;

      if (this.onChatIndex == -1) {
        return this.$message.error('请选择聊天对象');
      }

      this.sendMsg.type = type;
      this.sendMsg.uid = this.chat_friend[this.onChatIndex].user_id; // 发送信息

      this.$post(this.$api.sellerChatChatEvent, {
        data: this.sendMsg
      }).then(function (res) {
        if (res.code == 200) {
          _this2.$set(_this2.sendMsg, 'content', ''); // console.log(this.onChat)


          _this2.scrollDown();
        } else {
          _this2.$message.error(res.msg);
        }
      });
    },
    close: function close() {
      // eslint-disable-next-line no-console
      console.log("socket已经关闭");
    },
    // 滚动条到底部
    scrollDown: function scrollDown() {
      var _this3 = this;

      this.$nextTick(function () {
        setTimeout(function () {
          _this3.$refs['myScrollbar'].scrollTop = _this3.$refs['myScrollbar'].scrollHeight;
        }, 600);
      });
    },
    // 清空未读信息
    clearNoRead: function clearNoRead(user_id, to_user_id) {
      this.$post(this.$api.sellerChatReadMsg, {
        user_id: user_id,
        to_user_id: to_user_id
      }).then(function () {});
    },
    // 图片上传成功
    chatUpload: function chatUpload(e) {
      var _this4 = this;

      if (e.file.status == 'done') {
        var rs = e.file.response;
        var info = {
          type: 'image',
          uid: 0,
          send_type: 1,
          store_id: this.storeInfo.id,
          content: ''
        };

        if (rs.code == 200) {
          info.uid = this.chat_friend[this.onChatIndex].user_id;
          info.content = rs.data; // 发送信息

          this.$post(this.$api.sellerChatChatEvent, {
            data: info
          }).then(function (res) {
            if (res.code == 200) {
              _this4.scrollDown();
            } else {
              _this4.$message.error(res.msg);
            }
          });
          this.$forceUpdate();
        } else {
          return this.$message.error(rs.msg);
        }
      }
    },
    // 获取聊天好友列表
    get_chat_friend: function get_chat_friend() {
      var _this5 = this;

      this.$get(this.$api.sellerChatFriends).then(function (res) {
        if (res.code == 200) {
          _this5.chat_friend = res.data.data;

          _this5.$forceUpdate();
        } else {
          _this5.$message.error(res.msg);
        }
      });
    },
    // 获取聊天信息列表
    get_chat_msg: function get_chat_msg(info) {
      var _this6 = this;

      this.$post(this.$api.sellerChatChatMsg, {
        uid: info.id,
        page: this.page
      }).then(function (res) {
        if (res.code == 200) {
          _this6.chat_friend.forEach(function (item, key) {
            if (item.user_id == info.id) {
              res.data.data = res.data.data.reverse();
              _this6.chat_friend[key].chat_msg = res.data;

              _this6.clearNoRead(_this6.storeInfo.id, item.id); // 将该正在聊天未读标记已读


              _this6.$forceUpdate();
            }
          });

          _this6.scrollDown();
        } else {
          _this6.$message.error('聊天信息加载失败');
        }
      });
    }
  },
  created: function created() {
    var _this7 = this;

    // this.upload_headers.Authorization = 'Bearer '+localStorage.getItem('token'); // 要保证取到
    // this.get_user_info();
    // 判断token是否失效
    this.$get(this.$api.sellerCheckLogin).then(function (res) {
      if (res.code == 200) {
        _this7.storeInfo = res.data;

        _this7.websocketInit();
      }
    });
  },
  mounted: function mounted() {},
  destroyed: function destroyed() {// 销毁监听
    // this.socket.onclose = this.close
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.chat_image[data-v-8683c8a6] {\n  max-width: 200px;\n  max-height: 200px;\n}\n.chat_image img[data-v-8683c8a6] {\n  width: 100%;\n}\n.emoji_block[data-v-8683c8a6] {\n  height: 170px;\n  position: absolute;\n  background: #fff;\n  top: 150px;\n}\n.emoji_block .el-scrollbar[data-v-8683c8a6] {\n  height: 170px;\n}\n.emoji_class[data-v-8683c8a6] {\n  margin-right: 10px;\n  padding-top: 10px;\n  float: left;\n}\n.chat_interface[data-v-8683c8a6] {\n  border-radius: 3px;\n  width: 800px;\n  height: 460px;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  z-index: 1005;\n  position: relative;\n  left: 50%;\n  top: 50%;\n  margin-top: 330px;\n  background: #fff;\n  transform: translate(-50%, -50%);\n  /* 50%为自身尺寸的一半 */\n}\n.chat_interface .chat_interface_left[data-v-8683c8a6] {\n  float: left;\n  width: 200px;\n  background: #333;\n  height: 100%;\n  border-radius: 3px 0 0 3px;\n}\n.chat_interface .chat_interface_left dl[data-v-8683c8a6] {\n  padding: 10px 0;\n  clear: both;\n}\n.chat_interface .chat_interface_left dl dt[data-v-8683c8a6] {\n  width: 40px;\n  height: 40px;\n  float: left;\n  margin-right: 15px;\n  margin-left: 15px;\n}\n.chat_interface .chat_interface_left dl dt img[data-v-8683c8a6] {\n  width: 100%;\n  height: 100%;\n}\n.chat_interface .chat_interface_left dl dd[data-v-8683c8a6] {\n  float: left;\n  overflow: hidden;\n  color: #999;\n  line-height: 40px;\n  height: 30px;\n  width: 100px;\n}\n.chat_interface .chat_interface_left dl dd.close[data-v-8683c8a6] {\n  float: right;\n  width: 20px;\n  height: 30px;\n  margin-right: 5px;\n  cursor: pointer;\n  display: none;\n}\n.chat_interface .chat_interface_left dl.active[data-v-8683c8a6] {\n  background: #222;\n}\n.chat_interface .chat_interface_left dl.active dd[data-v-8683c8a6] {\n  color: #fff;\n}\n.chat_interface .chat_interface_left dl.active2[data-v-8683c8a6] {\n  background: #333;\n}\n.chat_interface .chat_interface_left dl.active2 dd[data-v-8683c8a6] {\n  color: #fff;\n}\n.chat_interface .chat_interface_left dl:nth-child(1).active[data-v-8683c8a6] {\n  border-radius: 3px 0 0 0;\n}\n.chat_interface .chat_interface_left dl:hover dd.close[data-v-8683c8a6] {\n  display: block;\n  color: #fff;\n}\n.chat_interface .chat_interface_left dl[data-v-8683c8a6]:after {\n  content: \"\";\n  clear: both;\n  display: block;\n}\n.chat_interface .chat_interface_right[data-v-8683c8a6] {\n  float: right;\n  width: 600px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_top[data-v-8683c8a6] {\n  background: #efefef;\n  line-height: 40px;\n  text-align: center;\n  font-size: 14px;\n  border-radius: 0 3px 0 0;\n}\n.chat_interface .chat_interface_right .chat_interface_right_top i[data-v-8683c8a6] {\n  float: right;\n  line-height: 40px;\n  margin-right: 15px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content[data-v-8683c8a6] {\n  height: 280px;\n  padding-bottom: 15px;\n  box-sizing: border-box;\n  overflow-y: scroll;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item[data-v-8683c8a6] {\n  padding: 15px 0 0 15px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg_avatar[data-v-8683c8a6] {\n  background-color: #efefef;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  float: left;\n  margin-right: 15px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg_avatar img[data-v-8683c8a6] {\n  border-radius: 50%;\n  width: 100%;\n  height: 100%;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg_time[data-v-8683c8a6] {\n  font-size: 12px;\n  margin-top: 10px;\n  color: #666;\n  line-height: 20px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg_time span[data-v-8683c8a6] {\n  float: left;\n  font-size: 14px;\n  color: #333;\n  margin-right: 15px;\n  font-weight: bold;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg_time[data-v-8683c8a6]:after {\n  content: \"\";\n  display: block;\n  clear: both;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .chat_interface_msg_item .chat_interface_msg[data-v-8683c8a6] {\n  font-size: 12px;\n  line-height: 20px;\n  padding: 5px 8px;\n  background: #efefef;\n  border-radius: 5px;\n  margin-top: 10px;\n  word-wrap: break-word;\n  min-width: 140px;\n  max-width: 250px;\n  height: 100%;\n  margin-left: 52px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .me .chat_interface_msg_avatar[data-v-8683c8a6] {\n  float: right;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .me .chat_interface_msg_time[data-v-8683c8a6] {\n  float: right;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .me .chat_interface_msg_time span[data-v-8683c8a6] {\n  float: right;\n  margin-left: 20px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .me .chat_interface_msg[data-v-8683c8a6] {\n  background: #67C23A;\n  color: #fff;\n  float: right;\n  clear: both;\n  margin-right: 65px;\n  text-align: right;\n}\n.chat_interface .chat_interface_right .chat_interface_right_content .me[data-v-8683c8a6]:after {\n  content: \"\";\n  display: block;\n  clear: both;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send[data-v-8683c8a6] {\n  border-top: 1px solid #efefef;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool .tool_item[data-v-8683c8a6] {\n  line-height: 18px;\n  margin-left: 20px;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  padding: 4px 6px;\n  float: left;\n  border-radius: 3px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool .tool_item i[data-v-8683c8a6] {\n  font-size: 18px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool .tool_item[data-v-8683c8a6]:hover {\n  background: #efefef;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool .other_tool_item[data-v-8683c8a6] {\n  float: right;\n  margin-right: 15px;\n  font-size: 14px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool .other_tool_item i[data-v-8683c8a6] {\n  margin-right: 10px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_tool[data-v-8683c8a6]:after {\n  content: \"\";\n  clear: both;\n  display: block;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_text[data-v-8683c8a6] {\n  height: 60px;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_text textarea[data-v-8683c8a6] {\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\", Arial, sans-serif;\n  width: 100%;\n  height: 60px;\n  padding: 5px;\n  color: #666;\n  outline: none;\n  border: none;\n  box-sizing: border-box;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_text_btn button[data-v-8683c8a6] {\n  background: #fff;\n  border: 1px solid #efefef;\n  border-radius: 3px;\n  float: right;\n  margin-right: 15px;\n  line-height: 25px;\n  margin-top: 5px;\n  outline: none;\n  cursor: pointer;\n}\n.chat_interface .chat_interface_right .chat_interface_right_send .chat_interface_right_send_text_btn button[data-v-8683c8a6]:nth-child(1) {\n  border: none;\n  background: #333;\n  color: #fff;\n}\n.chat_friend_interface_tab ul[data-v-8683c8a6] {\n  border-bottom: 1px solid #efefef;\n}\n.chat_friend_interface_tab ul li[data-v-8683c8a6] {\n  float: left;\n  width: 50%;\n  text-align: center;\n  line-height: 40px;\n  color: #999;\n  position: relative;\n}\n.chat_friend_interface_tab ul li .border_b[data-v-8683c8a6] {\n  border-bottom: 1px solid #333;\n  display: none;\n  width: 80%;\n  margin: 0 auto;\n  margin-bottom: -1px;\n}\n.chat_friend_interface_tab ul li[data-v-8683c8a6]:hover {\n  color: #333;\n}\n.chat_friend_interface_tab ul li.border_b_show[data-v-8683c8a6] {\n  color: #333;\n}\n.chat_friend_interface_tab ul li.border_b_show .border_b[data-v-8683c8a6] {\n  display: block;\n}\n.chat_friend_interface_tab ul[data-v-8683c8a6]:after {\n  content: \"\";\n  clear: both;\n  display: block;\n}\n.chat_friend_interface[data-v-8683c8a6] {\n  z-index: 1000;\n  width: 260px;\n  height: 520px;\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  background: #fff;\n}\n.red[data-v-8683c8a6] {\n  width: 12px;\n  height: 12px;\n  display: block;\n  border-radius: 50%;\n  background: #ca151e;\n}\n.green[data-v-8683c8a6] {\n  width: 12px;\n  height: 12px;\n  display: block;\n  border-radius: 50%;\n  background: #67C23A;\n}\n.chat_shodow[data-v-8683c8a6] {\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n}\n.chat_handle[data-v-8683c8a6] {\n  cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        在线聊天\n    ")
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
        _vm.chat_friend.length >= 0
          ? _c("div", { staticClass: "chat_interface" }, [
              _c(
                "div",
                { staticClass: "chat_interface_left" },
                _vm._l(_vm.chat_friend, function(v, k) {
                  return _c(
                    "dl",
                    {
                      key: k,
                      class: k == _vm.onChatIndex ? "active" : "active2",
                      on: {
                        click: function($event) {
                          _vm.onChatIndex = k
                          _vm.get_chat_msg({ id: v.user_id })
                        }
                      }
                    },
                    [
                      _c("dt", [
                        _c("img", {
                          attrs: {
                            src:
                              v.avatar ||
                              __webpack_require__(/*! @/asset/user/user_default.png */ "./resources/js/asset/user/user_default.png"),
                            alt: ""
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("dd", [_vm._v(_vm._s(v.nickname || "-"))])
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c("div", { staticClass: "chat_interface_right" }, [
                _vm.chat_friend[_vm.onChatIndex]
                  ? _c("div", { staticClass: "chat_interface_right_top" }, [
                      _vm._v(
                        _vm._s(
                          _vm.chat_friend[_vm.onChatIndex].nickname ||
                            "加载中..."
                        )
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.chat_friend[_vm.onChatIndex]
                  ? _c("div", { staticClass: "chat_interface_right_top" }, [
                      _vm._v("暂无聊天")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "myScrollbar",
                    staticClass: "chat_interface_right_content"
                  },
                  [
                    _vm.chat_friend[_vm.onChatIndex] &&
                    _vm.chat_friend[_vm.onChatIndex].chat_msg != undefined
                      ? _c("div", [
                          _c(
                            "div",
                            _vm._l(
                              _vm.chat_friend[_vm.onChatIndex].chat_msg.data,
                              function(v, k) {
                                return _c(
                                  "div",
                                  {
                                    key: k,
                                    class:
                                      v.send_type == 1
                                        ? "chat_interface_msg_item me"
                                        : "chat_interface_msg_item"
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass: "chat_interface_msg_avatar"
                                      },
                                      [
                                        _c("img", {
                                          attrs: {
                                            src:
                                              v.send_type == 1
                                                ? _vm.storeInfo.store_logo
                                                : v.avatar ||
                                                  __webpack_require__(/*! @/asset/user/user_default.png */ "./resources/js/asset/user/user_default.png"),
                                            alt: ""
                                          }
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass: "chat_interface_msg_time"
                                      },
                                      [
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              v.send_type == 1
                                                ? _vm.storeInfo.store_name
                                                : v.nickname || "-"
                                            )
                                          )
                                        ]),
                                        _vm._v(" " + _vm._s(v.created_at))
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "chat_interface_msg" },
                                      [
                                        v.type == "image"
                                          ? _c(
                                              "div",
                                              { staticClass: "chat_image" },
                                              [
                                                _c("img", {
                                                  key: v.content,
                                                  attrs: { src: v.content }
                                                })
                                              ]
                                            )
                                          : v.type == "text"
                                          ? _c("div", [
                                              _vm._v(_vm._s(v.content))
                                            ])
                                          : _c("div", [_vm._v("无法识别！")])
                                      ]
                                    )
                                  ]
                                )
                              }
                            ),
                            0
                          )
                        ])
                      : _vm._e()
                  ]
                ),
                _vm._v(" "),
                _vm.chat_friend[_vm.onChatIndex]
                  ? _c("div", { staticClass: "chat_interface_right_send" }, [
                      _c(
                        "div",
                        { staticClass: "chat_interface_right_send_tool" },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "tool_item chat_handle",
                              on: {
                                click: function($event) {
                                  return _vm.$message.error("暂时未开放")
                                }
                              }
                            },
                            [_c("a-icon", { attrs: { type: "smile" } })],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "tool_item chat_handle" },
                            [
                              _c(
                                "a-upload",
                                {
                                  attrs: {
                                    action: _vm.$api.chatImage,
                                    data: {
                                      token: _vm.$getSession("token_type")
                                    },
                                    multiple: true,
                                    "show-upload-list": false
                                  },
                                  on: { change: _vm.chatUpload }
                                },
                                [_c("a-icon", { attrs: { type: "picture" } })],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "tool_item other_tool_item chat_handle",
                              on: {
                                click: function($event) {
                                  return _vm.$message.error("暂时未开放")
                                }
                              }
                            },
                            [
                              _c("a-icon", { attrs: { type: "bar-chart" } }),
                              _vm._v("聊天记录")
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "chat_interface_right_send_text" },
                        [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.sendMsg.content,
                                expression: "sendMsg.content"
                              }
                            ],
                            domProps: { value: _vm.sendMsg.content },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.sendMsg,
                                  "content",
                                  $event.target.value
                                )
                              }
                            }
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "chat_interface_right_send_text_btn" },
                        [
                          _c(
                            "button",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.send("text")
                                }
                              }
                            },
                            [_vm._v("发送消息(E)")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.closeWin(
                                    _vm.chat_friend[_vm.onChatIndex]
                                  )
                                }
                              }
                            },
                            [_vm._v("关闭窗口(C)")]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "clear" })
            ])
          : _c("a-empty")
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/asset/user/user_default.png":
/*!**************************************************!*\
  !*** ./resources/js/asset/user/user_default.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/dist/images/user_default.png?d59985d9a74364355bc5ed553b87362b";

/***/ }),

/***/ "./resources/js/views/Seller/chats/index.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/Seller/chats/index.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=8683c8a6&scoped=true& */ "./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& */ "./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8683c8a6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Seller/chats/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=style&index=0&id=8683c8a6&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_8683c8a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=8683c8a6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Seller/chats/index.vue?vue&type=template&id=8683c8a6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_8683c8a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);