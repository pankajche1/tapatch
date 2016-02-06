'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    require: "^nav2",
	    scope: {
		    label: '@',
		    page: '@'

	    },
	    link: function ($scope, element, attrs, navController) {
		    console.log('in navitem2 link, label:',$scope.label);
		    navController.addItem($scope);
	    },
	    template: '<div></div>' // div main
    };
}];
	
