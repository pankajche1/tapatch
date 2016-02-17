'use strict()';
require('angular');
//console.log('here');
var app = angular.module('app');
app.controller('ProjectsController', require('./projects-controllers.js'));//controller
app.controller('BoysController', require('./boys-controller.js'));//controller
app.controller('BoyController', require('./boy-controller.js'));//controller
app.controller('ServicesController', require('./services-controller.js'));//controller
app.controller('ContactUsController', require('./contact-us-controller.js'));//controller
app.controller('SidebarRightController', require('./sidebar-right-controller'));//controller
app.controller('WelcomeController', require('./welcome-controller'));//controller
app.controller('HomeController', require('./home-controller'));//controller


