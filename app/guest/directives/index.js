'use strict()';
require('angular');
//console.log('here');
var app = angular.module('app');
app.directive('projects', require('./projects-directive.js'));//direcitve
app.directive('project', require('./project-directive.js'));//direcitve
//app.directive('nav', require('./nav-directive.js'));//direcitve
//app.directive('navitem', require('./navitem-directive.js'));//direcitve
app.directive('directive1', require('./directive1.js'));//direcitve
//app.directive('nav1', require('./nav1.js'));//direcitve
//app.directive('navitem1', require('./navitem1.js'));//direcitve
app.directive('nav2', require('./nav2.js'));//direcitve
app.directive('navitem2', require('./navitem2.js'));//direcitve
app.directive('mobilemenu', require('./mobile-menu.js'));//direcitve
app.directive('pphide', require('./ng-hide-example.js'));//direcitve
app.directive('footer', require('./footer.js'));//direcitve

