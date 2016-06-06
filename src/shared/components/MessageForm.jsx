import data from '../../../message.json'
// import data , then update when change by hot-loader
import RenewData from './RenewData.js';
const url_message="/api/message.json";

const MessageForm = React.createClass({
 contextTypes: {
    router: React.PropTypes.object,
  },
  messageSubmit: function(comment) {
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();

    $.ajax({
      url: url_message,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        //this.setState({data: data});
        RenewData.renew(data);
        //this.context.router.push('/message');
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentWillMount:function() {
    this.setState({data:data})
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
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
    console.log (author,text)
    if (!text || !author) {
      return;
    }
    this.messageSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    console.log(this)
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
