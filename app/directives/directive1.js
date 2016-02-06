'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '=',
		    var1: '@'

	    },
	    transclude: true,
	    controller:function($scope, $element){
		    console.log('in directive1 controller');
		    $scope.var1="val1";
		    $scope.var2="val2";

	    },//controller

	    link: function ($scope, element, attrs) {
		    $scope.var1="val1 changed from link fn";
		    $scope.var2="val2 changed from link fn";
		    $scope.fn1=function(val){
		    
			    console.log('directive1 link fn1()'+val);
			    $scope.var1="Pankaj Kumar Lodhi";
		    
		    };
		    console.log('in directive1 link');
		    //console.log($scope.project);
	    },
	    template:
	    '<div>'+
		    '<button ng-click="fn1(var1)">button1</button'+
            '</div>' // div main


    };


}];
	
