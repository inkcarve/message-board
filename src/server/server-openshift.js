import express from "express";
import path from "path";
import fs from 'fs';
import bodyParser from "body-parser";
import io from "socket.io";
const app = express();
const router = express.Router();
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
// const vendor_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
import DB from "../db/mysql";
const db = new DB();

// db.getDBData((data)=>{console.log('-- connect success --')});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
    
router.get('/getFirstMessage', function(req, res) {
    console.log('--getFirstMessage--');
    let offset = req.body.page || '0';
    // db.getDBDataTotal()
    db.getDBData(offset,(data) => { res.json(data); });
});

router.get([/^[^\.]+$/], function(req, res) {
	console.log(req.orangealUrl);
	res.sendFile(path.resolve(__dirname, '', '../../views/index-two-port.html'));
});

// send all requests to index.html so browserHistory in React Router works
app.use('/', router);
// app.use(express.static(path.join(__dirname, '../../views/')));
app.use(express.static('views'));


var server = app.listen(server_port, server_ip_address, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

// socket.io
var serv_io = io.listen(server);

serv_io.sockets.on('connection', function(socket) {
    //build connection
    console.error('socket connect');
    socket.emit('socket', 'socket connect');

    socket.on('get_message', function(v) {
        //var connection = createDBLink();
        console.log('--get_message--');
        pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM message', function(err, rows) {
                console.log(err);
                //connection.release();
                connection.release();
                socket.emit('update_message', rows);
            });
        });
    });
    //add message
    socket.on('add_message', function(new_data) {
        //var connection = createDBLink();
        console.log('--add_message--');
        db.addDBdata(new_data,() => {socket.emit('add_success');})
    });
    //delete message
    socket.on('delete_message', (data) => {
    	console.log(data);
    	db.deleteDBdata(data,() => {
			// socket.emit()(data); 
			db.getDBData((data) => { socket.emit('update_message',data); });
		});
    		
    	});

    socket.on('read_message',(req) => {
        console.log('-- read_message --');
        console.log(req);
        db.getDBData(
            (data) => { socket.emit('update_message',data); }
            ,req
        );
    });
});