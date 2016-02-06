(function(module) {
try {
  module = angular.module('MyAwesomePartials');
} catch (e) {
  module = angular.module('MyAwesomePartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partialsboys.html',
    'boy view\n' +
    '');
}]);
})();
