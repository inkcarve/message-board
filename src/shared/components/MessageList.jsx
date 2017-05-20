import RenewData from './RenewData.js';
import { Router, Route, Link, isActive, Redirect, browserHistory, IndexRoute ,DefaultRoute, RouteHandler} from 'react-router';
import socket from './Socket.js';
import $ from 'jquery';
import {Pagination} from 'react-bootstrap';
// import Pagination from './Pagination.jsx';
const url_message = "/api/message.json";
const url_delete = '/api/message/delete';
//const socket = io.connect();
const MessageItem = React.createClass ({
   delete: function(data) {
    socket.emit('delete_message',data);
    socket.emit('read_message',(data) => {
      self.setState({
        data:RenewData.renew(data.data),
        totalPage:Math.ceil(data.total / self.state.itemsPerPage)
      });
    });
  },
  
  render() {
    return ( 
      <div className="col-md-4 col-sm-6">
        <div className="post-block">
          <h4>{this.props.data.author}:</h4>
          <p>{this.props.data.text}</p>
          <button className="btn btn-default" onClick={() => {this.delete(this.props.data)}}>Delete !</button>
          </div>
      </div>
    );
  }
});

const MessageList = React.createClass({

  getInitialState() {
    return {
      activePage: 1,
      totalPage:0,
      itemsPerPage:6,
      data:RenewData.renew()
    };
  },

  handleSelect(eventKey) {
    console.log(eventKey);
    socket.emit('read_message',{
      itemsPerPage:this.state.itemsPerPage,
      activePage:eventKey
    });
/*    this.setState({
      activePage: eventKey
    });*/
  },

  //super(props);
  state:{
    activePage: 1,
    totalPage:0,
    itemsPerPage:6,
    data:RenewData.renew()
  },

  componentWillMount:function() {
    /*socket.on('update_message',function(data){
      console.log('update_message');
      RenewData.renew(data);
      this.props.setList(data)
    }.bind(this));*/
    //let data = RenewData.data;  
    var dataOld;
    var self =this;
    // this.setState({data:RenewData.renew([])});
/*    $.get('/getFirstMessage',function(data){
      console.log(data);
console.log(Math.ceil(data.total / self.state.itemsPerPage));
        self.setState({data:RenewData.renew(data.data),totalPage:Math.ceil(data.total / self.state.itemsPerPage)});
      });*/
socket.on('update_message',(data) => {
  self.setState({
    data:RenewData.renew(data.data),
    totalPage:Math.ceil(data.total / self.state.itemsPerPage),
    activePage:data.activePage
  });
  console.log(this.state);
});

    socket.emit('read_message',{
      itemsPerPage:self.state.itemsPerPage,
      activePage:self.state.activePage
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
    setList:function(list){
    this.setState({data:list});
  },
    updateMessage:function(){

    },
  render: function() {
    const messages = this.state.data.map(function(data) {
      return (
        <MessageItem key={data.id} data={data} setList={this.setList}>
      </MessageItem>
      );
    }.bind(this))
    return (
      <div className="message-list">
        <div className = "row" >
        {messages}
        </div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={this.state.totalPage}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
        <a className='edit btn glyphicon glyphicon-pencil' href="/message/write"></a>
      </div>

    );
  }
});

export
default MessageList;

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