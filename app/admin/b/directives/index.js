'use strict()';
require('angular');
//console.log('here');
var app = angular.module('app-admin-b');
//NOTE: you can not name if 'nav' cz there is one 'nav' element in bootstrap css also.
//+ so pnav
app.directive('pnav', require('./nav'));//direcitve
app.directive('navitem', require('./navitem'));//direcitve

