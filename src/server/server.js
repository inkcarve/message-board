import express from "express";
import path from "path";
import fs from 'fs';
import bodyParser from "body-parser";
const message_JSON = path.join(__dirname, '../../message.json')
const app = express();
const router = express.Router();

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

router.post('/api/message.json', function(req, res) {
	fs.readFile(message_JSON, function(err, data) {
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
			text: req.body.text,
		};
		comments.push(newComment);
		fs.writeFile(message_JSON, JSON.stringify(comments, null, 4), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(comments);
		});
	});
});

router.get('/*', function(req, res) {
	console.log(req.originalUrl);
	if (req.originalUrl.search('api') == -1) {
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

var server = app.listen(3000, "127.0.0.1", function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});


//vendor
const vendor = express();
vendor.use(express.static(path.join(__dirname, '../../vendor/')));
var server_vender = vendor.listen(8000, "127.0.0.1", function() {

	var host = server_vender.address().address;
	var port = server_vender.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});