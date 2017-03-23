import express from "express";
import path from "path";
import fs from 'fs';
//import fstorm from 'fstorm';
//const writer = fstorm('../../message.json');
import bodyParser from "body-parser";
import io from "socket.io";
const message_JSON = path.join(__dirname, '../../message.json')
const app = express();
const router = express.Router();
const server_port = process.env.OPENSHIFT_NODEJS_PORT  || 8080;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP  || '127.0.0.1';
//const vendor_port = process.env.NODE_PORT || 8000;
import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "../../dev-webpack-oneport.config";
const complier = webpack(config);
let wr = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Additional middleware which will set headers that we need on each request.
router.use(function(req, res, next) {
	// 輸出記錄訊息至終端機
	console.log(req.method, req.url);
	// Set permissive CORS header - this allows this server to be used only as
	// an API server in conjunction with something like webpack-dev-server.
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Disable caching so we'll always get the latest comments.
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

router.get('/api/message.json', function(req, res) {
	fs.readFile(message_JSON, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
});

router.get('/*', function(req, res) {
	console.log(req.originalUrl);
	if ((req.originalUrl.search('api') == -1)&&(req.originalUrl.search('views') == -1)) {
		res.sendFile(path.resolve(__dirname, '../../views/', 'index.html'));
	} else {
		fs.readFile(message_JSON, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(JSON.parse(data));
		});
	}

})

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
app.use(express.static(path.join(__dirname, '../../vendor/')));
//app.use(express.static(path.join(__dirname, '../../views/')));
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

//add message
    socket.on('add_message', function(new_data) {
		if(!wr){
			wr = true;
	fs.readFileSync(message_JSON, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		let comments = JSON.parse(data);
		// NOTE: In a real implementation, we would likely rely on a database or
		// some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
		// treat Date.now() as unique-enough for our purposes.
		let newComment = {
			id: Date.now(),
			author: new_data.author,
			text: new_data.text,
		};
		comments.push(newComment);
		fs.writeFileSync(message_JSON, JSON.stringify(comments, null, 4), function(err) {
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
    }else{socket.emit('busy', 'busy');}
	});
    //delete message
	socket.on('delete_message', function(item) {
		if(!wr){
			wr = true;
		fs.readFileSync(message_JSON, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			let comments = JSON.parse(data);
		
			let id = parseInt(item.id);
			let newData = [];

			for(let i=0 ;i<comments.length;i++){
				if(id!==comments[i].id){
					newData.push(comments[i]);
				}
			};
			fs.writeFileSync(message_JSON, JSON.stringify(newData, null, 4), function(err) {
				if (err) {
					console.error(err);
					process.exit(1);
				}
				setTimeout(function(){wr = false;},1000);
				socket.broadcast.emit('update_message', newData);
				socket.emit('update_message', newData);
				//io.sockets.emit('update_message', newData);
			});
		});
		}else{
			socket.emit('busy', 'busy');
		}
	});
});