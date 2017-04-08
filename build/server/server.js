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

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message_JSON = _path2.default.join(__dirname, '../../message.json');
var app = (0, _express2.default)();
var router = _express2.default.Router();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var vendor_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

var mysqlConfig = {
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '123456',
	database: 'mtome'
};
var pool = _mysql2.default.createPool(mysqlConfig);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function (req, res, next) {
	// Ý”³öÓ›ä›ÓÏ¢ÖÁ½K¶Ë™C
	console.log(req.method, req.url);
	// Set permissive CORS header - this allows this server to be used only as
	// an API server in conjunction with something like webpack-dev-server.
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Disable caching so we'll always get the latest comments.
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

router.get('/getFirstMessage', function (req, res) {
	var data;
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * FROM message', function (err, rows) {
			console.log(err);
			data = rows;
			res.json(data);
			connection.release();
		});
	});

	/*fs.readFile(message_JSON, function(err, data) {
 	if (err) {
 		console.error(err);
 		process.exit(1);
 	}
 	res.json(JSON.parse(data));
 });*/
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
		res.sendFile(_path2.default.resolve(__dirname, '../../views/', 'index-two-port.html'));
	} else {
		/*fs.readFile(message_JSON, function(err, data) {
  	if (err) {
  		console.error(err);
  		process.exit(1);
  	}
  	res.json(JSON.parse(data));
  });*/
	}
});

// send all requests to index.html so browserHistory in React Router works
/*
router.get('/', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../../views/', 'index.html'))
})
router.get('/about', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../../views/', 'index.html'))
})
router.get('/message', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../../views/', 'index.html'))
})
*/
app.use('/', router);

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

	socket.on('get_message', function (v) {
		//var connection = createDBLink();
		pool.getConnection(function (err, connection) {
			connection.query('SELECT * FROM message', function (err, rows) {
				console.log(err);
				//connection.release();
				connection.release();
				socket.emit('update_message', rows);
			});
		});
	});
	//add message
	socket.on('add_message', function (new_data) {
		//var connection = createDBLink();
		pool.getConnection(function (err, connection) {
			connection.query('INSERT INTO message(id,author,text,add_date,add_time) VALUES(?,?,?,NOW(),NOW())', [Date.now(), new_data.author, new_data.text], function (err, row) {
				if (err) {
					return connection.rollback(function () {
						throw err;
					});
				}
				console.log(row);
				connection.release();
				/*          socket.broadcast.emit('add_success', row);
    			socket.emit('update_message', comments);
    			//io.sockets.emit('update_message', comments);
    			socket.emit('return_add', '200');
    			connection.release();*/
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
			_fs2.default.writeFileSync(message_JSON, JSON.stringify(newData, null, 4), function (err) {
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

//vendor
var vendor = (0, _express2.default)();
vendor.use(_express2.default.static(_path2.default.join(__dirname, '../../vendor/')));
var server_vender = vendor.listen(vendor_port, server_ip_address, function () {

	var host = server_vender.address().address;
	var port = server_vender.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});