'use-strict()';
// the service is Countries:
module.exports=['$rootScope','$scope','$http', 'Countries','ContactUs', function($rootScope,$scope, $http, Countries, ContactUs){
		//$scope.projects = [ {'name':'ayuroma'}, {'name':'mediatech'}];// projects list
		var country =  {};
		$rootScope.$emit('ContactUsActive', 'Pankaj');
		// the following {} is not making any effect
		$scope.isCountriesLoading=false;
		$scope.user={};
		var master={};
		$scope.reset=function(form){
			$scope.user={'name':'','email':'','state':'','city':'','message':''};
			$scope.user.country=country;
			if(form){
				form.$setPristine();
				form.$setUntouched();

			}

		};//reset
		$scope.submit=function(){
			//$scope.user=user;
			//ContactUs.query();
			master=angular.copy($scope.user);
			sendMessage();

		};//send
		function sendMessage(){
			var req = {
				method: 'POST',
				url: '/contact-us',
				headers: {
					'Content-Type': undefined
				},
				data:  master
			};

			$http(req).then(function(){ console.log('success');}, function(){console.log('error');});


		}
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
