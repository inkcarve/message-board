"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require("react-router");

var _AppHandler = require("./components/AppHandler.jsx");

var _AppHandler2 = _interopRequireDefault(_AppHandler);

var _MessageBox = require("./components/MessageBox.jsx");

var _MessageBox2 = _interopRequireDefault(_MessageBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//createClass could not hot-load
var App = React.createClass({
  displayName: "App",
  render: function render() {

    //console.log(this)
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        null,
        React.createElement(
          _reactRouter.Link,
          { to: "/" },
          "Home"
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          _reactRouter.Link,
          { to: "/about" },
          "About"
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          _reactRouter.Link,
          { to: "/message" },
          "Message"
        )
      ),
      this.props.children
    );
  }
});
var Home = React.createClass({
  displayName: "Home",
  render: function render() {
    return React.createElement(
      "h1",
      null,
      "Hello, world!test2"
    );
  }
});

//create class and extends

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "About"
        ),
        React.createElement(
          "p",
          null,
          "Nothing..."
        )
      );
    }
  }]);

  return About;
}(React.Component);

;

//import extends Component could be hot-load
//file of Router couldn't hotupdate


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
React.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  React.createElement(
    _reactRouter.Route,
    { path: "/", component: App },
    React.createElement(_reactRouter.IndexRoute, { component: _AppHandler2.default }),
    React.createElement(_reactRouter.Route, { path: "about", component: About }),
    React.createElement(_reactRouter.Route, { path: "message", component: _MessageBox2.default })
  )
);