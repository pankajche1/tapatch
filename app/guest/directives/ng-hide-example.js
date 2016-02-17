'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    items: '='

	    },
	    transclude: true,
	    controller:function($scope, $element){
		    var items = $scope.items = [];
		    //console.log('in nav2 controller');
		    $scope.toggle = function(item){
			    console.log('in ng-hide example toggle()');
			    if($scope.isShow===false)
				    $scope.isShow=true;
			    else
				    $scope.isShow=false;
			    
			
			   
		    };
		    
	    },//controller
	    //repeat:false,

	    link: function ($scope, element, attrs) {
		    $scope.isShow=true;
	 

		
		       },
	    template:''+
'<button class="" ng-click="toggle()"'+
	'ng-class=\'{"is-active":menuDisplay===false}\'	>'+
	  '<span>toggle menu</span>'+
 ' </button>'+

 '<div ng-hide="isShow" class="check-element animate-hide">'+
 '<ul>'+
 '<li>Item1</li><li>Item2</li><li>Item3</li><li>Item4</li></ul></div><h2>Me</h2>'
    };


}];
	
