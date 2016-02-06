'use-strict()';
module.exports=['$scope','$http', function($scope, $http){
		$scope.services = [ {'name':'website design'}, {'name':'desktop app design'}];// projects list
		// download the projects:
		$scope.fetchProjects = function(){
			/*
			$http.get('/services').success(function(data) {
				$scope.projects = data;
			});
			*/
		};
 

}];
