'use strict()';
require('angular');
//console.log('here');
var app = angular.module('app-member');

app.controller('HomeController', require('./home'));//controller
app.controller('SidebarRightController', require('./sidebar-right'));//controller


