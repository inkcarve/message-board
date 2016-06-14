const MessageBox = React.createClass({
  render:function(){
    return (
      <div className="message_box">
      {this.props.children}
    </div>);
  }
});

export default MessageBox;