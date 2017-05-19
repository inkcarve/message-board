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

db.getDBData((data)=>{console.log('-- connect success --')});


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
    db.getDBData((data) => { res.json(data); });
});

router.get('/*', function(req, res) {
    console.log(req.originalUrl);
    if (req.originalUrl.search('api') == -1) {
        res.sendFile(path.resolve(__dirname, '../../views/', 'index-two-port.html'));
    } else {}

});

// send all requests to index.html so browserHistory in React Router works
app.use('/', router);

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
    socket.on('delete_message', (data) => {
    	console.log(data);
    	db.deleteDBdata(data,() => {
			// socket.emit()(data); 
			db.getDBData((data) => { socket.emit('update_message',data); });
		});
    		
    	});

    socket.on('read_message',() => {
    	db.getDBData((data) => { socket.emit('update_message',data); });
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
