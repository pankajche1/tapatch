'use-strict()';
module.exports=['$rootScope','$scope','$http', function($rootScope,$scope, $http){
    $rootScope.$emit('ProjectsViewActive', 'Pankaj');
    //$scope.projects = [ {'name':'ayuroma'}, {'name':'mediatech'}];// projects list
    $scope.projects = [];// projects list
    $scope.isLoading=false;
    /*
     $http.get('/projects').success(function(data) {
     //$scope.isLoading=false;
     //console.log('here');
     $scope.projects = data;
    });
    */
    // download the projects:
    $scope.fetchProjects = function(){
        $scope.isLoading=true;
	$http.get('/projects').success(function(data) {
	    $scope.isLoading=false;
	    $scope.projects = data;
	});
    };
    $scope.fetchProjects();
}];
