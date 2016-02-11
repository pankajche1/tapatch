'use-strict()';
// the service is Countries:
module.exports=['$rootScope','$scope','Countries', function($rootScope,$scope, Countries){
		//$scope.projects = [ {'name':'ayuroma'}, {'name':'mediatech'}];// projects list
		var country =  {};
		$rootScope.$emit('ContactUsActive', 'Pankaj');
		// the following {} is not making any effect
		$scope.isCountriesLoading=false;
		$scope.user={};
		$scope.reset=function(){
			$scope.user={'name':'','email':'','state':'','city':'','message':''};
			$scope.user.country=country;

		};//reset
		$scope.send=function(user){
			//$scope.user=user;

		};//send

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
						country=$scope.countries[i];
						$scope.user.country=$scope.countries[i];
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
