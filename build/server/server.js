"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static(_path2.default.join(__dirname, '../../views/')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (request, response) {
  response.sendFile(_path2.default.resolve(__dirname, '../../views/', 'index.html'));
});

var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//vendor
var vendor = (0, _express2.default)();
vendor.use(_express2.default.static(_path2.default.join(__dirname, '../../vendor/')));
var server_vender = vendor.listen(8000, "127.0.0.1", function () {

  var host = server_vender.address().address;
  var port = server_vender.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});