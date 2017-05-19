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

var _mysql = require("../db/mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
// const vendor_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

var db = new _mysql2.default();

db.getDBData(function (data) {
    console.log('-- connect success --');
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function (req, res, next) {
    console.log(req.method, req.url);
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/getFirstMessage', function (req, res) {
    console.log('--getFirstMessage--');
    db.getDBData(function (data) {
        res.json(data);
    });
});

router.get('/*', function (req, res) {
    console.log(req.originalUrl);
    if (req.originalUrl.search('api') == -1) {
        res.sendFile(_path2.default.resolve(__dirname, '../../views/', 'index-two-port.html'));
    } else {}
});

// send all requests to index.html so browserHistory in React Router works
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
        console.log('--get_message--');
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
        console.log('--add_message--');
        db.addDBdata(new_data, function () {
            socket.emit('add_success');
        });
        /*        pool.getConnection(function(err, connection) {
                    connection.query('INSERT INTO message(id,author,text,add_date,add_time) VALUES(?,?,?,NOW(),NOW())', [Date.now(), new_data.author, new_data.text], function(err, row) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        console.log(row);
                        connection.release();
                        socket.emit('add_success');
                    });
                });*/
    });
    //delete message
    socket.on('delete_message', function (data) {
        console.log(data);
        db.deleteDBdata(data, function () {
            // socket.emit()(data); 
            db.getDBData(function (data) {
                socket.emit('update_message', data);
            });
        });
    });

    socket.on('read_message', function () {
        db.getDBData(function (data) {
            socket.emit('update_message', data);
        });
    });
});

//vendor
/*const vendor = express();
vendor.use(express.static(path.join(__dirname, '../../vendor/')));
var server_vender = vendor.listen(vendor_port, server_ip_address, function() {

    var host = server_vender.address().address;
    var port = server_vender.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});*/