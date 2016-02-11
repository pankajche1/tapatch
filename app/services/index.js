'use strict()';
require('angular');
//console.log('here');
var app = angular.module('app');
app.factory('Countries', require('./countries-service.js'));//Service
app.factory('ContactUs', require('./contact-us-service'));//Service

