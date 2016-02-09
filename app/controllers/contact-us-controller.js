'use-strict()';
// the service is Countries:
module.exports=['$rootScope','$scope','Countries', function($rootScope,$scope, Countries){
		//$scope.projects = [ {'name':'ayuroma'}, {'name':'mediatech'}];// projects list
			$rootScope.$emit('ContactUsActive', 'Pankaj');
			// the following {} is not making any effect
			$scope.isCountriesLoading=false;
			function fetchCountries(){
				$scope.isCountriesLoading=true;
				$scope.countries=Countries.query({},function(){
				//console.log('success');
				$scope.isCountriesLoading=false;
			
				},
				function(){
				$scope.isCountriesLoading=false;
					//console.log('error');
				});


			}
			fetchCountries();

		/*	
		$scope.countries=Countries.get({},function(){
		
		
		});//get()
		*/
	

}];
