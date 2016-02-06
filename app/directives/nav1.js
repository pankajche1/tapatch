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
		    console.log('in nav1 controller');
		    $scope.select = function(item){
			    console.log('in select()');
			    
			    angular.forEach(items, function(item){
				    item.selected = false;
			    });
			    item.selected = true;
			   
		    };
		    this.addItem = function(item){
			    if(!items.length) $scope.select(item);
			    console.log('got item:'+item.label);
			    item.select=function(id){
				    //console.log('i am clicked.'+id);
				    console.log('i am clicked.');
				    angular.forEach(items, function(item){
					    if(item.id==id)
					        item.selected = true;
					    else
					        item.selected = false;
				    });

			    };
			    items.push(item);
			    item.id=items.length;
		    };
	    },//controller
	    //repeat:false,

	    link: function ($scope, element, attrs) {
		    console.log('in nav link');
	    },
	    templateUrl:'/partials/nav1.html'
    };


}];
	
