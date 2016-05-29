import data from '../../../message.json'
// import data , then update when change by hot-loader

const url_message = "/api/message.json";

class MessageItem extends React.Component {
  render() {
    return ( < div className = "row" >
      < div className = "col-md-3" >
      <h4>{this.props.data.author}</h4> < /div>
        <div className="col-md-9">
          <p>{this.props.data.text}</p >
      < /div>
      </div >
    );
  }
};

const MessageList = React.createClass({
  componentWillMount:function() {
    this.setState({data:data})
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  render: function() {
    console.log(this.props.data);
    const messages = this.state.data.map(function(data) {
      return (
        <MessageItem key={data.id} data={data}>
      </MessageItem>
      );
    })
    return (
      <div className="message_list">
      {messages}
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