webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./component/nav/nav.jsx":
/*!*******************************!*\
  !*** ./component/nav/nav.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Nav; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _nav_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./nav.less */ "./component/nav/nav.less");
/* harmony import */ var _nav_less__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_nav_less__WEBPACK_IMPORTED_MODULE_8__);











var Nav =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Nav, _Component);

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Nav, [{
    key: "render",
    value: function render() {
      var path = "";
      path = this.props.pathname;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "common-nav"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "nav-content"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "nav-logo"
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "nav-list"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", null, this.menu.map(function (list) {
        var CLASS = "";

        if (path === list.url) {
          CLASS = "active";
        }

        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", {
          key: list.url
        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
          className: CLASS,
          href: list.url
        }, list.value));
      })))));
    }
  }]);

  function Nav() {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Nav);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(Nav).call(this));
    _this.state = {
      pathname: ""
    };
    _this.menu = [{
      value: "首页",
      url: "/"
    }, {
      value: "动态",
      url: "/activities"
    }, {
      value: "话题",
      url: "/topics"
    }, {
      value: "小册",
      url: "/books"
    }, {
      value: "活动",
      url: "/events"
    }];
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Nav, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }]);

  return Nav;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);



/***/ })

})
//# sourceMappingURL=index.js.1e16f4785252fbac82ed.hot-update.js.map