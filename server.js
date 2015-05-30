'use strict';

var express 	 = require('express'),
		bodyParser = require('body-parser'),
		morgan 	   = require('morgan'),
    shortid    = require('shortid'),
    cors       = require('cors');

var logger  = require('./logger.js'),
		config  = require('./config.js');

var app    = express();
var server = require('http').createServer(app);
var io     = require('socket.io')(server);
var port   = config.server.port; 

// EXPRESS CONFIGRATIONS
app.use(cors());
app.use(morgan('dev'));

// Serve React/Flux Client
app.use('/', express.static(__dirname + '/client/'))
app.use('/static', express.static(__dirname + '/client/'));

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
  logger.data('WHOLE',req);
  io.emit(req.params.postbin, {
    headers: req.headers, 
    body: req.body, 
    from: req._remoteAddress,
    time: req._startTime,
    bytes: req.headers['content-length'],
    params: req.params,
    url: req.url
  });
  res.status(202).send('POST received!');
});

app.get('/:binid', function(req, res) {
  res.redirect('/');
});

// Initialize Server
server.listen(port, function(){
  var host = server.address().address;
  logger.info('app listening at http://%s:%s', host, port);
});
