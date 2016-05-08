"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _AppHandler = require("./components/AppHandler.jsx");

var _AppHandler2 = _interopRequireDefault(_AppHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import { Route } from "react-router";


//createClass could not hot-load
var App = _react2.default.createClass({
  displayName: "App",
  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "container" },
      this.props.children,
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: "/about" },
          "About"
        )
      )
    );
  }
});
var Home = _react2.default.createClass({
  displayName: "Home",
  render: function render() {
    return _react2.default.createElement(
      "h1",
      null,
      "Hello, world!test2"
    );
  }
});

//create class and extends
//extends Component could be hot-load

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "h2",
        null,
        "About"
      );
    }
  }]);

  return About;
}(_react2.default.Component);

;

/* method 1 : by router config
const routesConfig = {
  path: '/',
  component: App,
  indexRoute: { component: AppHandler },
  childRoutes: [
    { path: 'about', component: About },
  ]
  }
  export default (<Router history={browserHistory} routes={routesConfig}>
  </Router>);
  */

exports.default =
// method 2: by react router
_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: "/", component: App },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _AppHandler2.default }),
    _react2.default.createElement(_reactRouter.IndexRoute, { component: Home }),
    _react2.default.createElement(_reactRouter.Route, { path: "about", component: About })
  )
);