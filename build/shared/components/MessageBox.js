"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MessageBox = React.createClass({
  displayName: "MessageBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "message_box" },
      this.props.children
    );
  }
});

exports.default = MessageBox;