var express = require('express');
var logger = require('./logger.js');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Initialize Server
server.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  logger.info('app listening at http://%s:%s', host, port);
});

// Serve Angular Client
app.use(express.static(__dirname + '/client/'));

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/postbin', function(req, res){
  logger.info("headers", req.headers);
  io.emit('news', {headers: req.headers, body: req.body});
  res.status(202).send('POST received!')
});