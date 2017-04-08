"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require("react-router");

var _Home = require("./components/Home.jsx");

var _Home2 = _interopRequireDefault(_Home);

var _MessageBox = require("./components/MessageBox.jsx");

var _MessageBox2 = _interopRequireDefault(_MessageBox);

var _MessageList = require("./components/MessageList.jsx");

var _MessageList2 = _interopRequireDefault(_MessageList);

var _MessageForm = require("./components/MessageForm.jsx");

var _MessageForm2 = _interopRequireDefault(_MessageForm);

var _RenewData = require("./components/RenewData.js");

var _RenewData2 = _interopRequireDefault(_RenewData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//createClass could not hot-load
var App = React.createClass({
  displayName: "App",
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "nav",
        { className: "navbar navbar-default" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "navbar-header" },
            React.createElement(
              "button",
              { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false" },
              " ",
              React.createElement(
                "span",
                { className: "sr-only" },
                "Toggle navigation"
              ),
              " ",
              React.createElement("span", { className: "icon-bar" }),
              " ",
              React.createElement("span", { className: "icon-bar" }),
              " ",
              React.createElement("span", { className: "icon-bar" }),
              " "
            ),
            React.createElement(
              "a",
              { className: "navbar-brand", href: "/" },
              "M",
              React.createElement(
                "span",
                null,
                "."
              ),
              "to",
              React.createElement(
                "span",
                null,
                "."
              ),
              "Me"
            )
          ),
          React.createElement(
            "div",
            { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
            React.createElement(
              "ul",
              { className: "nav navbar-nav" },
              React.createElement(NavLink, { data: { title: 'Home', path: "/", pathnow: this.props.location.pathname } }),
              React.createElement(NavLink, { data: { title: 'About', path: "/about", pathnow: this.props.location.pathname } }),
              React.createElement(NavLink, { data: { title: 'Message List', path: "/message", pathnow: this.props.location.pathname } }),
              React.createElement(NavLink, { data: { title: 'Write', path: "/message/write", pathnow: this.props.location.pathname } })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        this.props.children
      )
    );
  }
});

var NavLink = React.createClass({
  displayName: "NavLink",
  render: function render() {
    var data = this.props.data;
    return React.createElement(
      "li",
      { className: data.path == data.pathnow ? 'active' : '' },
      React.createElement(
        _reactRouter.Link,
        { to: data.path },
        data.title
      )
    );
  }
});

//create class and extends

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "about" },
        React.createElement(
          "h2",
          null,
          "About"
        ),
        React.createElement(
          "h3",
          { className: "sub_title" },
          "React ",
          React.createElement(
            "span",
            null,
            "+"
          ),
          " Babel ",
          React.createElement(
            "span",
            null,
            "+"
          ),
          " Webpack ",
          React.createElement(
            "span",
            null,
            "+"
          ),
          " ..."
        ),
        React.createElement(
          "p",
          null,
          "Practice of Learning New Skill."
        )
      );
    }
  }]);

  return About;
}(React.Component);

;

//import extends Component could be hot-load
//file of Router couldn't hotupdate
exports.default =
// method 2: by react router
React.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  React.createElement(
    _reactRouter.Route,
    { path: "/", component: App },
    React.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
    React.createElement(_reactRouter.Route, { path: "about", component: About }),
    React.createElement(
      _reactRouter.Route,
      { path: "message", component: _MessageBox2.default },
      React.createElement(_reactRouter.IndexRoute, { component: _MessageList2.default }),
      React.createElement(_reactRouter.Route, { path: "write", component: _MessageForm2.default })
    )
  )
);