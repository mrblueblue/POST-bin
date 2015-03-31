
var app = angular.module('PostBin', ['ngMaterial']);
var socket = io.connect('http://localhost:3000');

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
	 .primaryPalette('indigo')
   .accentPalette('blue-grey');
});

app.controller('AppController', function($scope){
  socket.on('news', function(data){
  	console.log('connected to a websocket!');
  	console.log('here is the message: ', data);
  	$scope.$apply(function(){
  		$scope.data = JSON.stringify(data);
  	});
  	socket.emit('my other event', {message : 'Hello from Angular'});
  })
})

app.run(function(){
	console.log("I am an AngularJS app that uses Sockets!!")
})