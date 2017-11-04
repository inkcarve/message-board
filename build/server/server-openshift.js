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
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 6000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
// const vendor_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

var db = new _mysql2.default();

// db.getDBData((data)=>{console.log('-- connect success --')});


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
    var offset = req.body.page || '0';
    // db.getDBDataTotal()
    db.getDBData(offset, function (data) {
        res.json(data);
    });
});

router.get([/^[^\.]+$/], function (req, res) {
    console.log(req.orangealUrl);
    res.sendFile(_path2.default.resolve(__dirname, '', '../../views/index.html'));
});

// send all requests to index.html so browserHistory in React Router works
app.use('/', router);
// app.use(express.static(path.join(__dirname, '../../views/')));
app.use(_express2.default.static('views'));

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

    socket.on('read_message', function (req) {
        console.log('-- read_message --');
        console.log(req);
        db.getDBData(function (data) {
            socket.emit('update_message', data);
        }, req);
    });
});