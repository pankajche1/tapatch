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
				/*
				angular.forEach(countries, function(value, key) {
					  this.push(key + ': ' + value);
				});
				*/
				for(i=0;i<$scope.countries.length;i++){
					if($scope.countries[i].code=='IN'){
						$scope.country=$scope.countries[i];
						break;
					}

				}//for
			
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
