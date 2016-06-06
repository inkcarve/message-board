'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('../../../message.json');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import data , then update when change by hot-loader
//import RenewData from './RenewData.js';
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
        //this.setState({data: data});
        console.log(data);
        if (data) {

          //this.setState({data:data});
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
//let data = RenewData.renew();
var MessageList = React.createClass({
  displayName: 'MessageList',


  componentWillMount: function componentWillMount() {
    this.setState({ data: _message2.default });
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ data: _message2.default });
    //this.setState({
    //likesIncreasing: nextProps.likeCount > this.props.likeCount
    //});
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
    //this.loadMessage();

    return (
      <div className="message_box">
      <MessageList url="/api/message.json"/>
    </div>
    );
  }
}
*/