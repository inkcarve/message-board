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

  render: function render() {
    console.log(this.props.data);
    var messages = this.props.data.map(function (data) {
      return React.createElement(MessageItem, { key: data.id, data: data });
    });
    return React.createElement(
      "div",
      { className: "message_list" },
      messages
    );
  }
});

var MessageForm = React.createClass({
  displayName: "MessageForm",

  getInitialState: function getInitialState() {
    return { author: '', text: '' };
  },
  handleAuthorChange: function handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onMessageSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "messageForm", onSubmit: this.handleSubmit },
      React.createElement("input", {
        type: "text",
        placeholder: "Your name",
        value: this.state.author,
        onChange: this.handleAuthorChange
      }),
      React.createElement("input", {
        type: "text",
        placeholder: "Say something...",
        value: this.state.text,
        onChange: this.handleTextChange
      }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }
});

var MessageBox = React.createClass({
  displayName: "MessageBox",

  /*
  loadMessage: function() {
    $.ajax({
      url: url_message,
      dataType: 'json',
      cache: false,
      beforeSend: function() {
        console.log('beforeSend')
      },
      success: function(data) {
        console.log(data);
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err);
      }.bind(this)
    });
  },
  */
  messageSubmit: function messageSubmit(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: url_message,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        //this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({ data: comments });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentWillMount: function componentWillMount() {
    this.setState({ data: _message2.default });
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "message_box" },
      React.createElement(MessageList, { data: this.state.data }),
      React.createElement(MessageForm, { onMessageSubmit: this.messageSubmit })
    );
  }
});

exports.default = MessageBox;

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