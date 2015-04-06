
var app = angular.module('PostBin', ['ngMaterial', 'ngRoute']);
var socket = io.connect('http://localhost:3000');

app.controller('BinController', function($scope, Bin, Post){

  var bins = {};

  var addPostRequestToBin = function(data){
    $scope.$apply(function(){
      var postRequest = Post.create(data);
      var id = data.binid
      if (bins.hasOwnProperty(id)){
        bins[id].requests.push(postRequest)
      }
    });
  };

  socket.on('post', addPostRequestToBin);

  $scope.bins = bins;

  $scope.addBin = function(){
    Bin.create(function(id){
      bins[id] = {requests:[]};
    })
  };

  $scope.removeBin = function(){

  } 

})

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
  this.create = function(callback){
    $http.get('/binid')
      .success(function(data){
        callback(data);
      })
  };
});
