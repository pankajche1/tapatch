'use-strict()';
module.exports=['$scope','$http', function($scope, $http){
		$scope.projects = [ 'ayuroma', 'mediatech'];// projects list
		// download the projects:
		$scope.fetchProjects = function(){
			//$http.get('/projects').success(function(data) {
				//$scope.projects = data;
			//});
		};
 

}];
