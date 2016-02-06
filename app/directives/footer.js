'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,
	    controller:function($scope, $element){
		    $scope.items=[{'label':'Home'},{'label':'Products'},{'label':'Contact Us'},

			    {'label':'Training'},];
		    $scope.toggle = function(){
			    $scope.isFormShow=!$scope.isFormShow;

		    };
	
	    },//controller
	    //repeat:false,

	    link: function ($scope, element, attrs) {

	    },
	    templateUrl:'/partials/footer.html'
    };


}];
	
