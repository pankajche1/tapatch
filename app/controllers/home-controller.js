'use-strict()';
module.exports=['$rootScope','$scope','$http', function($rootScope,$scope, $http){

		$scope.info=[];
		//$rootScope.$emit('ProjectsViewActive', 'Pankaj');
		//$scope.message="Home From Controller";
		/*
		$scope.info={'projects':
			[
				{
						'title':'Contact Us Page Development',
						'info':'The page is being developed',
						'writer':'Pankaj'
				},
			{
						'title':'Welcome Page Content Development',
						'info':'The page is being developed',
						'writer':'Sandeep Mumbai'
				}
				
		]};
		*/
		$scope.isLoading=false;

		// download the current topics:
		$scope.fetchTopics = function(){
			$scope.isLoading=true;
			
			$http.get('/current-topics').success(function(data) {
				$scope.isLoading=false;
				$scope.info = data;
			});
			
		};
		$scope.fetchTopics();
 


		
}];

