var express = require('express');
var logger = require('./logger.js');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Socket Connection
io.on('connection', function(socket){
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function(data){
    logger.info(data);
  })
});

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
  logger.info(req.body);
  io.emit('news', req.body);
  res.status(202).send('POST received!')
});