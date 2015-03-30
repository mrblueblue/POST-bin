
var app = angular.module('PostBin', ['ngMaterial']);

app.config(function($mdThemingProvider) {
 	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('blue-grey');
});

app.controller('AppController', function($scope){
	$scope.data = "Hello World";
})

