"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = [{ id: 1, author: "Pete Hunt", text: "This is one comment" }, { id: 2, author: "Jordan Walke", text: "This is another comment " }];

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
          )
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

var MessageList = function (_React$Component2) {
  _inherits(MessageList, _React$Component2);

  function MessageList() {
    _classCallCheck(this, MessageList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageList).apply(this, arguments));
  }

  _createClass(MessageList, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({ data: data });
    }
  }, {
    key: "render",
    value: function render() {
      var messages = this.state.data.map(function (data) {
        return React.createElement(MessageItem, { key: data.id, data: data });
      });
      return React.createElement(
        "div",
        { className: "message_list" },
        messages
      );
    }
  }]);

  return MessageList;
}(React.Component);

;

var MessageBox = function (_React$Component3) {
  _inherits(MessageBox, _React$Component3);

  function MessageBox() {
    _classCallCheck(this, MessageBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageBox).apply(this, arguments));
  }

  _createClass(MessageBox, [{
    key: "render",
    value: function render() {
      //this.loadMessage();

      return React.createElement(
        "div",
        { className: "message_box" },
        React.createElement(MessageList, null)
      );
    }
  }]);

  return MessageBox;
}(React.Component);

exports.default = MessageBox;