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

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message_JSON = _path2.default.join(__dirname, '../../message.json');
var app = (0, _express2.default)();
var router = _express2.default.Router();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//const vendor_port = process.env.NODE_PORT || 8000;

var complier = (0, _webpack2.default)(_devWebpackOneport2.default);

var connection = _mysql2.default.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456'
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function (req, res, next) {
	// ݔ��ӛ��ӍϢ���K�˙C
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

router.post('/api/message/delete', function (req, res) {
	_fs2.default.readFile(message_JSON, function (err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var comments = JSON.parse(data);

		var id = parseInt(req.body.id);
		var newData = [];

		for (var i = 0; i < comments.length; i++) {
			if (id !== comments[i].id) {
				newData.push(comments[i]);
			}
		};
		_fs2.default.writeFile(message_JSON, JSON.stringify(newData, null, 4), function (err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(newData);
		});
	});
});

router.post('/api/message.json', function (req, res) {
	_fs2.default.readFile(message_JSON, function (err, data) {
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
			author: req.body.author,
			text: req.body.text
		};
		comments.push(newComment);
		_fs2.default.writeFile(message_JSON, JSON.stringify(comments, null, 4), function (err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(comments);
		});
	});
});

router.get('/*', function (req, res) {
	console.log(req.originalUrl);
	if (req.originalUrl.search('api') == -1) {
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

app.use(require('webpack-dev-middleware')(complier, {
	publicPath: _devWebpackOneport2.default.output.publicPath,
	stats: { colors: true },
	hot: true,
	noInfo: true,
	historyApiFallback: true
}));

app.use(require("webpack-hot-middleware")(complier, {
	log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use('/', router);
app.use(_express2.default.static(_path2.default.join(__dirname, '../../vendor/')));
//app.use(express.static(path.join(__dirname, '../view/')));
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
		_fs2.default.readFile(message_JSON, function (err, data) {
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
			_fs2.default.writeFile(message_JSON, JSON.stringify(comments, null, 4), function (err) {
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
	});
	//delete message
	socket.on('delete_message', function (item) {
		_fs2.default.readFile(message_JSON, function (err, data) {
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
			_fs2.default.writeFile(message_JSON, JSON.stringify(newData, null, 4), function (err) {
				if (err) {
					console.error(err);
					process.exit(1);
				}
				socket.broadcast.emit('update_message', newData);
				socket.emit('update_message', newData);
				//io.sockets.emit('update_message', newData);
			});
		});
	});
});