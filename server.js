var express = require('express');
var logger = require('./logger.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function(data){
    logger.info(data);
  })
});

server.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  logger.info('app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/client/'));