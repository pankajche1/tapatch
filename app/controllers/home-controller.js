'use-strict()';
module.exports=['$rootScope','$scope','$http', function($rootScope,$scope, $http){

		//$rootScope.$emit('ProjectsViewActive', 'Pankaj');
		//$scope.message="Home From Controller";
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
		
}];

