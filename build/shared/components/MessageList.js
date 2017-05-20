'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RenewData = require('./RenewData.js');

var _RenewData2 = _interopRequireDefault(_RenewData);

var _reactRouter = require('react-router');

var _Socket = require('./Socket.js');

var _Socket2 = _interopRequireDefault(_Socket);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Pagination from './Pagination.jsx';
var url_message = "/api/message.json";
var url_delete = '/api/message/delete';
//const socket = io.connect();
var MessageItem = React.createClass({
  displayName: 'MessageItem',

  delete: function _delete(data) {
    _Socket2.default.emit('delete_message', data);
    _Socket2.default.emit('read_message', function (data) {
      self.setState({
        data: _RenewData2.default.renew(data.data),
        totalPage: Math.ceil(data.total / self.state.itemsPerPage)
      });
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
  getInitialState: function getInitialState() {
    return {
      activePage: 1,
      totalPage: 0,
      itemsPerPage: 6,
      data: _RenewData2.default.renew()
    };
  },
  handleSelect: function handleSelect(eventKey) {
    console.log(eventKey);
    _Socket2.default.emit('read_message', {
      itemsPerPage: this.state.itemsPerPage,
      activePage: eventKey
    });
    /*    this.setState({
          activePage: eventKey
        });*/
  },


  //super(props);
  state: {
    activePage: 1,
    totalPage: 0,
    itemsPerPage: 6,
    data: _RenewData2.default.renew()
  },

  componentWillMount: function componentWillMount() {
    var _this2 = this;

    /*socket.on('update_message',function(data){
      console.log('update_message');
      RenewData.renew(data);
      this.props.setList(data)
    }.bind(this));*/
    //let data = RenewData.data;  
    var dataOld;
    var self = this;
    // this.setState({data:RenewData.renew([])});
    /*    $.get('/getFirstMessage',function(data){
          console.log(data);
    console.log(Math.ceil(data.total / self.state.itemsPerPage));
            self.setState({data:RenewData.renew(data.data),totalPage:Math.ceil(data.total / self.state.itemsPerPage)});
          });*/
    _Socket2.default.on('update_message', function (data) {
      self.setState({
        data: _RenewData2.default.renew(data.data),
        totalPage: Math.ceil(data.total / self.state.itemsPerPage),
        activePage: data.activePage
      });
      console.log(_this2.state);
    });

    _Socket2.default.emit('read_message', {
      itemsPerPage: self.state.itemsPerPage,
      activePage: self.state.activePage
    });

    /*    this.setState({data:function(){
    
          socket.on('update_message',function(data){
          console.log('update_message');
          RenewData.renew(data);
          dataOld = data;
          this.setList(data);
          self.setState({data:data});
        }.bind(this));*/

    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  setList: function setList(list) {
    this.setState({ data: list });
  },
  updateMessage: function updateMessage() {},
  render: function render() {
    var messages = this.state.data.map(function (data) {
      return React.createElement(MessageItem, { key: data.id, data: data, setList: this.setList });
    }.bind(this));
    return React.createElement(
      'div',
      { className: 'message-list' },
      React.createElement(
        'div',
        { className: 'row' },
        messages
      ),
      React.createElement(_reactBootstrap.Pagination, {
        prev: true,
        next: true,
        first: true,
        last: true,
        ellipsis: true,
        boundaryLinks: true,
        items: this.state.totalPage,
        maxButtons: 5,
        activePage: this.state.activePage,
        onSelect: this.handleSelect }),
      React.createElement('a', { className: 'edit btn glyphicon glyphicon-pencil', href: '/message/write' })
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