'use strict';

var express 	 = require('express'),
		bodyParser = require('body-parser'),
		morgan 	 = require('morgan');

var logger = require('./logger.js'),
		config = require('./config.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = config.server.port; 

// EXPRESS CONFIGRATIONS
app.use(morgan('dev'));

// Serve Angular Client
app.use(express.static(__dirname + '/client/'));

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/postbin', function(req, res){
	logger.warn('warning');
  logger.data("body", req.body);
  logger.trace('headers', req.headers);
  io.emit('news', {headers: req.headers, body: req.body});
  res.status(202).send('POST received!');
});

// Initialize Server
server.listen(port, function(){
  var host = server.address().address;
  logger.info('app listening at http://%s:%s', host, port);
});