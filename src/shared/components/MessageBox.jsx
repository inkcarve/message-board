const MessageBox = React.createClass({
  render:function(){
    console.log(this);
    return (
      <div className="message_box">
      {this.props.children}
    </div>);
  }
});

export default MessageBox;