"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require("../../../message.json");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import data , then update when change by hot-loader

var url_message = "/api/message.json";

var MessageItem = function (_React$Component) {
  _inherits(MessageItem, _React$Component);

  function MessageItem() {
    _classCallCheck(this, MessageItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageItem).apply(this, arguments));
  }

  _createClass(MessageItem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-3" },
          React.createElement(
            "h4",
            null,
            this.props.data.author
          ),
          " "
        ),
        React.createElement(
          "div",
          { className: "col-md-9" },
          React.createElement(
            "p",
            null,
            this.props.data.text
          )
        )
      );
    }
  }]);

  return MessageItem;
}(React.Component);

;

var MessageList = React.createClass({
  displayName: "MessageList",

  componentWillMount: function componentWillMount() {
    this.setState({ data: _message2.default });
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  render: function render() {
    console.log(this.props.data);
    var messages = this.state.data.map(function (data) {
      return React.createElement(MessageItem, { key: data.id, data: data });
    });
    return React.createElement(
      "div",
      { className: "message_list" },
      messages
    );
  }
});

exports.default = MessageList;

/*
export
default class MessageBox extends React.Component {
  render() {
    //this.loadMessage();

    return (
      <div className="message_box">
      <MessageList url="/api/message.json"/>
    </div>
    );
  }
}
*/