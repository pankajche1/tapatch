require('angular');
require('angular-route');
require('../../public/js/lib/angular-animate/angular-animate.min');
require('angular-resource');

//var MainController = require('./controllers/main-controller');
require('./templates');
var app = angular.module('app-member', ['ngRoute','ngResource','ngAnimate','Templates1'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
//console.log('came here2');
//controllers:
require('./services');
require('./controllers');
require('./directives');
//console.log('in app-member');
app.config(['$routeProvider',function($routeProvider){

		$routeProvider.when('/home',{
				templateUrl:'/partials/home.html',controller:'HomeController'});

		$routeProvider.otherwise({redirectTo:'/home'});
}]);//config 
