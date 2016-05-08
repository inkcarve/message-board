import express from "express";
import path from "path";
const app = express();
app.use(express.static(path.join(__dirname, '../../views/')));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../../views/', 'index.html'))
})


var server = app.listen(3000,"127.0.0.1", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


//vendor
const vendor = express();
vendor.use(express.static(path.join(__dirname, '../../vendor/')));
var server_vender = vendor.listen(8000,"127.0.0.1", function () {

  var host = server_vender.address().address;
  var port = server_vender.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

