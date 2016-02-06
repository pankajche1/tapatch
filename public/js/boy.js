(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partialsboy.html',
    '<h2> Single boy view</h2>\n' +
    '');
}]);
})();
