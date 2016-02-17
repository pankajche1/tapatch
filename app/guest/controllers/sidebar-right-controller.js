'use-strict()';
module.exports=['$rootScope','$scope','$http', function($rootScope,$scope, $http){
		//$scope.projects = [ {'name':'ayuroma'}, {'name':'mediatech'}];// projects list
		$scope.isDefaultView=true;
		$scope.isContactUsView=false;
    $rootScope.$on('ContactUsActive', function(event, data){
		$scope.isDefaultView=false;
		$scope.isContactUsView=true;
		$scope.isProjectsView=false;
    
	    $scope.address = {'name':'tapach','city':'Kanpur'};
    });
    $rootScope.$on('ProjectsViewActive', function(event, data){
		$scope.isDefaultView=false;
		$scope.isContactUsView=false;
		$scope.isProjectsView=true;
    
	    $scope.projectsAd = {'name':'tapach','slogan':'All work done is great!'};
    });



}];
