'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('../../../message.json');

var _message2 = _interopRequireDefault(_message);

var _RenewData = require('./RenewData.js');

var _RenewData2 = _interopRequireDefault(_RenewData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url_message = "/api/message.json";
// import data , then update when change by hot-loader


var MessageForm = React.createClass({
  displayName: 'MessageForm',

  contextTypes: {
    router: React.PropTypes.object
  },
  messageSubmit: function messageSubmit(comment) {
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();

    $.ajax({
      url: url_message,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        //this.setState({data: data});
        _RenewData2.default.renew(data);
        //this.context.router.push('/message');
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({ data: comments });
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentWillMount: function componentWillMount() {
    this.setState({ data: _message2.default });
    //this.loadMessage();
    //setInterval(this.loadMessage,2000);
  },
  getInitialState: function getInitialState() {
    return { author: '', text: '' };
  },
  handleAuthorChange: function handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    console.log(author, text);
    if (!text || !author) {
      return;
    }
    this.messageSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  },
  render: function render() {
    console.log(this);
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-md-6' },
        React.createElement(
          'form',
          { className: 'messageForm', onSubmit: this.handleSubmit },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', {
              type: 'text',
              className: 'form-control',
              placeholder: 'Your name',
              value: this.state.author,
              onChange: this.handleAuthorChange,
              required: true
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('textarea', {
              type: 'text',
              className: 'form-control',
              placeholder: 'Say something...',
              value: this.state.text,
              onChange: this.handleTextChange,
              rows: '5',
              required: true
            })
          ),
          React.createElement('input', { type: 'submit', value: 'Post !', className: 'btn btn-default' })
        )
      )
    );
  }
});

exports.default = MessageForm;