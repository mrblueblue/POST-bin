
var app = angular.module('PostBin', ['ngMaterial', 'ngRoute']);
var socket = io.connect('http://localhost:3000');

app.controller('BinController', function($scope, Bin, Post){

  var bins = [];


  // var bins = [{id: '/243b80', content: [{timestamp: new Date(), body: "hello"}]}];

  $scope.bins = bins;
  $scope.selectedIndex;

  $scope.addBin = function () {
    Bin.getId(function(id){
      var bin = {};
      bin.id = '/' + id;
      bin.contents = [];
      bins.push(bin);
    })
  };

  socket.on('post', function(data){
    console.log('post')
    console.log(data)
   $scope.$apply(function(){
     var postRequest = Post.create(data);
      var id = '/' + data.binid
      bins.forEach(function(bin){
        if (bin.id.toUpperCase() === id ){
          bin.contents.push(postRequest)
          console.log(bins)
        }
      })
    });
 })
})

app.controller('PostController', function($scope, Post){

  // console.log($scope.channel)

  // console.log($scope.bins.bin)
  // $scope.data = [];
  // $scope.channel = $scope.channel || $routeParams.binid
  // $scope.shortLink = 'http://localhost:3000' + $location.url();

 

  // 	socket.emit('my other event', {message : 'Hello from Angular'});
  // });
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