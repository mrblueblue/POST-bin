
var app = angular.module('PostBin', ['ngMaterial', 'ngRoute']);
var socket = io.connect('http://localhost:3000');

app.config(function($routeProvider){
  $routeProvider
    .when('/', {templateUrl: 'landing.html', controller: 'BinController'})
    .when('/:bin', {templateUrl: 'postbin.html', controller: 'PostController'})           
});

app.controller('BinController', function($scope, Bin){

})

app.service('Bin', function(){
  this.create = function(session){
    var bin = {};
    return bin;
  }

});

app.controller('PostController', function($scope, Post){
	$scope.data = [];

  socket.on('news', function(data){
  	$scope.$apply(function(){
  		var postRequest = Post.create(data);
      $scope.data.push(postRequest);
      console.log(postRequest);
    });

  	socket.emit('my other event', {message : 'Hello from Angular'});
  });
});

app.service('Post', function(){
  this.create = function(data){
    var post = {};
    post.headers = data.headers;
    post.body = data.body;
    post.timestamp = new Date();
    return post;
  }
});


app.run(function(){
	console.log("I am an AngularJS app that uses Sockets!!");
});