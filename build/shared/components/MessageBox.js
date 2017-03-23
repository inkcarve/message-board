'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Socket = require('./Socket.js');

var _Socket2 = _interopRequireDefault(_Socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageBox = React.createClass({
  displayName: 'MessageBox',

  componentWillMount: function componentWillMount() {
    _Socket2.default.on('busy', function (data) {
      alert(' Because there is no DB, waiting for readFile(.json).');
    }.bind(this));
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'message_box' },
      this.props.children
    );
  }
});

exports.default = MessageBox;