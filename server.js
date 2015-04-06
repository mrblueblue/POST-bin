'use strict';

var express 	 = require('express'),
		bodyParser = require('body-parser'),
		morgan 	   = require('morgan'),
    shortid    = require('shortid');

var logger  = require('./logger.js'),
		config  = require('./config.js');

var app    = express();
var server = require('http').createServer(app);
var io     = require('socket.io')(server);
var port   = config.server.port; 

// EXPRESS CONFIGRATIONS
app.use(morgan('dev'));

// Serve Angular Client
app.use(express.static(__dirname + '/client/'));

// Middleware
app.use(bodyParser.json());

// Routes

app.get('/binid', function(req, res){
  var binID = shortid.generate();
  logger.info(binID);
  res.status(201).send(binID);
});

app.post('/:postbin', function(req, res){
	logger.warn('warning');
  logger.data('params', req.params.postbin);
  logger.data("body", req.body);
  logger.trace('headers', req.headers);
  io.emit('post', {binid: req.params.postbin, headers: req.headers, body: req.body});
  res.status(202).send('POST received!');
});

// Initialize Server
server.listen(port, function(){
  var host = server.address().address;
  logger.info('app listening at http://%s:%s', host, port);
});