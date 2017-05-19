'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('../../../message.json');

var _message2 = _interopRequireDefault(_message);

var _RenewData = require('./RenewData.js');

var _RenewData2 = _interopRequireDefault(_RenewData);

var _Socket = require('./Socket.js');

var _Socket2 = _interopRequireDefault(_Socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url_message = "/api/message.json";


var MessageForm = React.createClass({
  displayName: 'MessageForm',

  contextTypes: {
    router: React.PropTypes.object
  },
  messageSubmit: function messageSubmit(comment) {
    comment.id = Date.now();
    _Socket2.default.emit('add_message', comment);
  },
  componentWillMount: function componentWillMount() {

    this.setState({ data: _message2.default });
    _Socket2.default.on('add_success', function (data) {
      this.context.router.push('/message');
    }.bind(this));
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
    if (!text || !author) {
      return;
    }
    this.messageSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  },
  render: function render() {
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