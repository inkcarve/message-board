import socket from './Socket.js';
const MessageBox = React.createClass({
	componentWillMount:function() {
    socket.on('busy',function(data){
      alert(' Because there is no DB, waiting for readFile(.json).');
    }.bind(this));
  },
  render:function(){
    return (
      <div className="message_box">
      {this.props.children}
    </div>);
  }
});

export default MessageBox;