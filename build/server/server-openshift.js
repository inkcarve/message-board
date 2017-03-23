"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _webpackDevServer = require("webpack-dev-server");

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _devWebpackOneport = require("../../dev-webpack-oneport.config");

var _devWebpackOneport2 = _interopRequireDefault(_devWebpackOneport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import fstorm from 'fstorm';
//const writer = fstorm('../../message.json');

var message_JSON = _path2.default.join(__dirname, '../../message.json');
var app = (0, _express2.default)();
var router = _express2.default.Router();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//const vendor_port = process.env.NODE_PORT || 8000;

var complier = (0, _webpack2.default)(_devWebpackOneport2.default);
var wr = false;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function (req, res, next) {
	// 輸出記錄訊息至終端機
	console.log(req.method, req.url);
	// Set permissive CORS header - this allows this server to be used only as
	// an API server in conjunction with something like webpack-dev-server.
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Disable caching so we'll always get the latest comments.
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

router.get('/api/message.json', function (req, res) {
	_fs2.default.readFile(message_JSON, function (err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
});

router.get('/*', function (req, res) {
	console.log(req.originalUrl);
	if (req.originalUrl.search('api') == -1 && req.originalUrl.search('views') == -1) {
		res.sendFile(_path2.default.resolve(__dirname, '../../views/', 'index.html'));
	} else {
		_fs2.default.readFile(message_JSON, function (err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(JSON.parse(data));
		});
	}
});

/*
app.use(require('webpack-dev-middleware')(complier, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
  hot: true,
  noInfo: true,
  historyApiFallback: true
}));
*/
/*
 app.use(require("webpack-hot-middleware")(complier, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
*/

app.use('/', router);
app.use(_express2.default.static(_path2.default.join(__dirname, '../../vendor/')));
//app.use(express.static(path.join(__dirname, '../../views/')));
var server = app.listen(server_port, server_ip_address, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

// socket.io
var serv_io = _socket2.default.listen(server);

serv_io.sockets.on('connection', function (socket) {
	//build connection
	console.error('socket connect');
	socket.emit('socket', 'socket connect');

	//add message
	socket.on('add_message', function (new_data) {
		if (!wr) {
			wr = true;
			_fs2.default.readFileSync(message_JSON, function (err, data) {
				if (err) {
					console.error(err);
					process.exit(1);
				}
				var comments = JSON.parse(data);
				// NOTE: In a real implementation, we would likely rely on a database or
				// some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
				// treat Date.now() as unique-enough for our purposes.
				var newComment = {
					id: Date.now(),
					author: new_data.author,
					text: new_data.text
				};
				comments.push(newComment);
				_fs2.default.writeFileSync(message_JSON, JSON.stringify(comments, null, 4), function (err) {
					if (err) {
						console.error(err);
						process.exit(1);
					}
					socket.broadcast.emit('update_message', comments);
					socket.emit('update_message', comments);
					//io.sockets.emit('update_message', comments);
					socket.emit('return_add', '200');
				});
			});
		} else {
			socket.emit('busy', 'busy');
		}
	});
	//delete message
	socket.on('delete_message', function (item) {
		if (!wr) {
			wr = true;
			_fs2.default.readFileSync(message_JSON, function (err, data) {
				if (err) {
					console.error(err);
					process.exit(1);
				}
				var comments = JSON.parse(data);

				var id = parseInt(item.id);
				var newData = [];

				for (var i = 0; i < comments.length; i++) {
					if (id !== comments[i].id) {
						newData.push(comments[i]);
					}
				};
				_fs2.default.writeFileSync(message_JSON, JSON.stringify(newData, null, 4), function (err) {
					if (err) {
						console.error(err);
						process.exit(1);
					}
					setTimeout(function () {
						wr = false;
					}, 1000);
					socket.broadcast.emit('update_message', newData);
					socket.emit('update_message', newData);
					//io.sockets.emit('update_message', newData);
				});
			});
		} else {
				socket.emit('busy', 'busy');
			}
	});
});