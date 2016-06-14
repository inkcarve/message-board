import data from '../../../message.json'
import RenewData from './RenewData.js';
const url_message="/api/message.json";
import socket from './Socket.js';

const MessageForm = React.createClass({
 contextTypes: {
    router: React.PropTypes.object,
  },
  messageSubmit: function(comment) {
    comment.id = Date.now();
    socket.emit('add_message',comment);
  },
  componentWillMount:function() {
    this.setState({data:data})
    socket.on('update_message',function(data){
      RenewData.renew(data);
    });
    socket.on('return_add',function(data){
      this.context.router.push('/message');
    }.bind(this));
  },
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.messageSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <div className="row">
      <div className="col-md-6">
      <form className="messageForm" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          className="form-control"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
          rows="5"
          required
        ></textarea>
      </div>
        <input type="submit" value="Post !" className="btn btn-default"/>
      </form>
      </div>
      </div>
      
    );
  }
});

export default MessageForm;
