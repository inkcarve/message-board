import RenewData from './RenewData.js';
import socket from './Socket.js';
const url_message = "/api/message.json";
const url_delete = '/api/message/delete';
//const socket = io.connect();
const MessageItem = React.createClass ({
   delete: function(data) {
    socket.emit('delete_message',data);
    socket.on('update_message',function(data){
      console.log('update_message');
      RenewData.renew(data);
      this.props.setList(data)
    }.bind(this));
  },
  
  render() {
    return ( 
      <div className="col-md-4 col-sm-6">
      <div className="post-block">
          <h4>{this.props.data.author}:</h4>
          <p>{this.props.data.text}</p >
          <button className="btn btn-default" onClick={() => {this.delete(this.props.data)}}>Delete !</button>
          </div>
      </div >
    );
  }
});

const MessageList = React.createClass({
  componentWillMount:function() {
    let data = RenewData.data;
    this.setState({data:data})
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
      <div className="message_list">
      <div className = "row" >
      {messages}
      </div>
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