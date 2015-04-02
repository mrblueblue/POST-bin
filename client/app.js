
var app = angular.module('PostBin', ['ngMaterial', 'ngRoute']);
var socket = io.connect('http://localhost:3000');

app.config(function($routeProvider){
  $routeProvider
    .when('/', {templateUrl: 'landing.html', controller: 'BinController'})
    .when('/:binid', {templateUrl: 'postbin.html', controller: 'PostController'})           
});

app.controller('BinController', function($rootScope, $scope, $location, Bin){

  var setChannel = function(id){
    $rootScope.channel = id;
  }

  $scope.goToBin = function(){
    Bin.getId(function(id){
      setChannel(id);
      $location.path('/' + id);
    });
  };
})

app.controller('PostController', function($routeParams, $scope, Post){

  $scope.data = [];
  
  $scope.channel = $scope.channel || $routeParams.binid

  socket.on($scope.channel, function(data){
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

app.service('Bin', function($http){
  this.getId = function(callback){
    $http.get('/binid')
      .success(function(data){
        callback(data);
      })
      .error(function(data){
        console.log('error', data);
      });
  };
});

app.run(function(){
	console.log("I am an AngularJS app that uses Sockets!!");
});