import RenewData from './RenewData.js';
const url_message = "/api/message.json";
const url_delete = '/api/message/delete';
const MessageItem = React.createClass ({
   delete: function(data) {
    let comment = {};
    comment.id = data.id;
    console.log(comment);

    $.ajax({
      url: url_delete,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        console.log(data);
        if(data){
          this.props.setList(data);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

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
    console.log('componentWillMount')
  },
    setList:function(list){
    this.setState({data:list});
  },
  
  render: function() {
    console.log(this.props);
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