'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = io.connect({ path: '/socket.io' });

socket.on('socket', function (data) {
  console.log(data);
});

exports.default = socket;