"use strict";

var _webpackDevServer = require("webpack-dev-server");

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require("../../webpack.config");

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080; // Webpack dev server
// Ran in parallel with the Express server

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = new _webpackDevServer2.default((0, _webpack2.default)(_webpack4.default), {
  // webpack-dev-server options
  publicPath: _webpack4.default.output.publicPath,
  stats: { colors: true },
  hot: true,
  noInfo: true,
  historyApiFallback: true
});
server.listen(server_port, server_ip_address, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at ' + server_ip_address + ':' + server_port);
});