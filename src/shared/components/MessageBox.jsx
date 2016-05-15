var data = [
  {id:1,author: "Pete Hunt", text: "This is one comment"},
  {id:2,author: "Jordan Walke", text: "This is another comment "}
];

class MessageItem extends React.Component{
render(){
  return (
    <div className = "row">
        <div className = "col-md-3">
          <h4>{this.props.data.author}</h4>
        </div>
        <div className="col-md-9">
          <p>{this.props.data.text}</p>
        </div>
      </div>
  );
}
};

class MessageList extends React.Component{
  componentWillMount(){
  this.setState({data:data});
};
render(){
  const messages = this.state.data.map(function(data){
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
};

export default class MessageBox extends React.Component {
  render(){
  //this.loadMessage();
  
  return (
    <div className="message_box">
      <MessageList/>
    </div>
  );
  }
}
