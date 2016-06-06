import data from '../../../message.json'
// import data , then update when change by hot-loader
//import RenewData from './RenewData.js';
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
        //this.setState({data: data});
        console.log(data);
        if(data){

          //this.setState({data:data});
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
//let data = RenewData.renew();
const MessageList = React.createClass({
 
  componentWillMount:function() {
    this.setState({data:data})
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({data:data})
  //this.setState({
    //likesIncreasing: nextProps.likeCount > this.props.likeCount
  //});
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
    //this.loadMessage();

    return (
      <div className="message_box">
      <MessageList url="/api/message.json"/>
    </div>
    );
  }
}
*/