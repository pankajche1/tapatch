require('angular');
require('angular-route');
require('../../public/js/lib/angular-animate/angular-animate.min');
require('angular-resource');

//var MainController = require('./controllers/main-controller');
require('./templates');
var app = angular.module('app', ['ngRoute','ngResource','ngAnimate','Templates1'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
//console.log('came here2');
//controllers:
require('./services');
require('./controllers');
require('./directives');
console.log('in app-guest');
//app.controller('MainController', ['$scope', MainController]);
app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/welcome',{
				templateUrl:'/partials/welcome.html',controller:'WelcomeController'});
		$routeProvider.when('/home',{
				templateUrl:'/partials/home.html',controller:'HomeController'});
		$routeProvider.when('/projects',{
				templateUrl:'/partials/projects.html',controller:'ProjectsController'});
		$routeProvider.when('/services',{
			templateUrl:'/partials/services.html',controller:'ServicesController'});
		$routeProvider.when('/contact-us',{
			templateUrl:'/partials/contact-us.html',controller:'ContactUsController'});
		$routeProvider.otherwise({redirectTo:'/welcome'});
}]);//config 
