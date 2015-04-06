
var app = angular.module('PostBin', ['ngMaterial', 'ngRoute']);
var socket = io.connect('http://localhost:3000');

app.controller('BinController', function($rootScope, $scope, $location, Bin){
  var tabs = [
        { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
      ],
      selected = null,
      previous = null;
  $scope.tabs = tabs;
  $scope.selectedIndex = 2;

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

app.controller('PostController', function($routeParams, $location, $scope, Post){
  $scope.data = [];
  $scope.channel = $scope.channel || $routeParams.binid
  $scope.shortLink = 'http://localhost:3000' + $location.url();

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