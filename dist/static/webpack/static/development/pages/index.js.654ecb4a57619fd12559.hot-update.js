webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _component_nav_nav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../component/nav/nav */ "./component/nav/nav.jsx");
/* harmony import */ var next_server_dynamic__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next-server/dynamic */ "./node_modules/next-server/dynamic.js");
/* harmony import */ var next_server_dynamic__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_server_dynamic__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../style/index.less */ "./style/index.less");
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_style_index_less__WEBPACK_IMPORTED_MODULE_14__);















 // const Nav = dynamic(import('../component/nav/nav'),{
//     ssr:false
// })

var Index =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(Index, _Component);

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(Index, [{
    key: "render",
    value: function render() {
      // console.log(this.props.pathname);
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_component_nav_nav__WEBPACK_IMPORTED_MODULE_12__["default"], {
        pathname: this.props.pathname,
        longinUserInfo: this.state.longinUserInfo
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "common-content-box"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "common-main-content radio5"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "list-title"
      }, "\u6587\u7AE0\u5217\u8868"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "list-box"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "content-list"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "share-info"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: "share-title-color"
      }, "\u5206\u4EAB"), " \xB7 \u897F\u74DC\u592A\u90CE \xB7 4\u5C0F\u65F6\u524D / javascript \xB7 node"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "content-list-f"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", {
        className: "title pt-5"
      }, "Node.js\u5F00\u53D1\u5FAE\u4FE1\u516C\u4F17\u53F7"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "describe"
      }, "\u4F46\u662F\u5F88\u591A\u5E74\u8F7B\u4EBA\u8FD8\u662F\u9009\u62E9\u53BB\u76F8\u4EB2\u3002 \u4ECA\u5929\u6211\u5C31\u53C2\u4E0E\u4E86\u4E00\u573A\u76F8\u4EB2\u6D3B\u52A8\uFF0C\u600E\u4E48\u8BF4\u5462\uFF1F\u8FD8\u662F\u86EE\u6709\u610F\u601D\u7684\uFF0C\u4E24\u4E2A\u964C\u751F\u4EBA\u4E00\u4E0A\u6765\u5C31\u804A\u4E9B\u6211\u4EEC\u505A\u4E86\u5F88...")), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "content-list-img"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: "/static/image/github.png",
        alt: ""
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "action-list"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "fa fa-heart fa-icon"
      }, " 10"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "fa fa-comments fa-icon"
      }, " 10"))))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "common-main-tool"
      }, this.state.ifLogin ? react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "user-info radio5"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        className: "head-img",
        src: this.state.longinUserInfo.avatar_url
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "github-name"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        href: this.state.longinUserInfo.html_url
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("strong", null, this.state.longinUserInfo.login_name), "(", this.state.longinUserInfo.name, ")")), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "t-l-c"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("i", {
        className: "fa fa-smile-o"
      }), "\xA0\xA0", react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null, "Welcome to here."))) : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "login radio5"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        href: "/api/getGithubCode"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("i", {
        className: "fa fa-github"
      }))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "common-part radio5"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "title"
      }, "\u5B66\u4E60\u7F51\u7AD9"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "learn-tool-box"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "http://nodejs.cn/"
      }, "Node"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "https://www.webpackjs.com/"
      }, "webpack"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "https://reactjs.org/"
      }, "react"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "https://cn.vuejs.org/"
      }, "vue"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "https://juejin.im/"
      }, "\u6398\u91D1"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "https://www.jianshu.com/"
      }, "\u7B80\u4E66"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        href: "http://nextjs.frontendx.cn/"
      }, "next.js"))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "common-part radio5"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "title"
      }, "\u63A8\u8350\u6587\u7AE0"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "article-tool-box"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        title: "\u6D4F\u89C8\u5668\u6E32\u67D3\u673A\u5236",
        href: "https://www.jianshu.com/p/b22ff1771225"
      }, "\u6D4F\u89C8\u5668\u6E32\u67D3\u673A\u5236"), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("a", {
        className: "list",
        title: "nodejs\u5F00\u53D1\u5FAE\u4FE1\u516C\u4F17\u53F7",
        href: "https://juejin.im/post/5be3af8ae51d4554b54b0a0d"
      }, "nodejs\u5F00\u53D1\u5FAE\u4FE1\u516C\u4F17\u53F7"))))));
    } //异步获取数据，在服务端执行

  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var req;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req;
                return _context.abrupt("return", {
                  pathname: req.url //获取当前路径用于选中菜单

                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function Index() {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Index);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Index).call(this));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__["default"])(_this), "login", function () {
      axios__WEBPACK_IMPORTED_MODULE_10___default.a.post("/api/getGithubCode");
    });

    _this.state = {
      ifLogin: false,
      longinUserInfo: {}
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_10___default.a.post("/api/getUserInfo", {}, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      }).then(function (data) {
        console.log(data);

        if (data.data.code === "0") {
          _this2.setState({
            ifLogin: true,
            longinUserInfo: data.data.data[0]
          });
        }
      });
      window.onscroll = debounce(); //防抖函数

      function debounce() {
        var time;
        return function () {
          if (time) clearTimeout(time);
          time = setTimeout(function () {
            var st = document.documentElement.scrollTop;
            var ch = document.documentElement.clientHeight;
            var bh = document.body.clientHeight; //判断滚动条是否滚动到底

            if (st + ch === bh) {
              console.log("到底了");
            }
          }, 100);
        };
      }
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);



/***/ })

})
//# sourceMappingURL=index.js.654ecb4a57619fd12559.hot-update.js.map