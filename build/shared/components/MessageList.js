'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RenewData = require('./RenewData.js');

var _RenewData2 = _interopRequireDefault(_RenewData);

var _Socket = require('./Socket.js');

var _Socket2 = _interopRequireDefault(_Socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url_message = "/api/message.json";
var url_delete = '/api/message/delete';
//const socket = io.connect();
var MessageItem = React.createClass({
  displayName: 'MessageItem',

  delete: function _delete(data) {
    _Socket2.default.emit('delete_message', data);
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
    _Socket2.default.on('update_message', function (data) {
      console.log('update_message');
      _RenewData2.default.renew(data);
      this.setState({ data: data });
    }.bind(this));
  },
  setList: function setList(list) {
    this.setState({ data: list });
  },

  render: function render() {
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