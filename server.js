var express = require('express');
var logger = require('./logger.js')
var app = express();

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  logger.info('app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/client/'));