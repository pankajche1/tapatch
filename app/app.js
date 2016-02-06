require('angular');
require('angular-route');
require('../public/js/lib/angular-animate/angular-animate.min');

//var MainController = require('./controllers/main-controller');
require('./templates');
var app = angular.module('app', ['ngRoute','ngAnimate','Templates1'], 
	['$interpolateProvider',function($interpolateProvider){
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
}]);
//console.log('came here2');
//controllers:
require('./controllers');
require('./directives');
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


