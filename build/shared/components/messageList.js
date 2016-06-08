'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RenewData = require('./RenewData.js');

var _RenewData2 = _interopRequireDefault(_RenewData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url_message = "/api/message.json";
var url_delete = '/api/message/delete';
var MessageItem = React.createClass({
  displayName: 'MessageItem',

  delete: function _delete(data) {
    var comment = {};
    comment.id = data.id;
    console.log(comment);

    $.ajax({
      url: url_delete,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        console.log(data);
        if (data) {
          this.props.setList(data);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'col-md-4 col-sm-6' },
      React.createElement(
        'div',
        { className: 'post-block' },
        React.createElement(
          'h4',
          null,
          this.props.data.author,
          ':'
        ),
        React.createElement(
          'p',
          null,
          this.props.data.text
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default', onClick: function onClick() {
              _this.delete(_this.props.data);
            } },
          'Delete !'
        )
      )
    );
  }
});

var MessageList = React.createClass({
  displayName: 'MessageList',


  componentWillMount: function componentWillMount() {
    var data = _RenewData2.default.data;
    this.setState({ data: data });
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
    console.log('componentWillMount');
  },
  setList: function setList(list) {
    this.setState({ data: list });
  },

  render: function render() {
    console.log(this.props);
    var messages = this.state.data.map(function (data) {
      return React.createElement(MessageItem, { key: data.id, data: data, setList: this.setList });
    }.bind(this));
    return React.createElement(
      'div',
      { className: 'message_list' },
      React.createElement(
        'div',
        { className: 'row' },
        messages
      )
    );
  }
});

exports.default = MessageList;

/*
export
default class MessageBox extends React.Component {
  render() {
    return (
      <div className="message_box">
      <MessageList url="/api/message.json"/>
    </div>
    );
  }
}
*/