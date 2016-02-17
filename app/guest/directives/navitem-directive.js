'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    require: "^nav",
	    scope: {
		    label: '@',
		    page: '@'

	    },
	    controller:function($scope, $element){
		    console.log('in navitem controller ');

	    },
	    link: function ($scope, element, attrs, navController) {
		    console.log('in navitem link, label:',$scope.label);
		    navController.addItem($scope);
	    },
	    template:
	    //'<li><a href="#" ng-click="select(id)" ng-class={selected:selected}>{{ label }}</a></li>' // div main
	    '<div></div>' // div main


    };


}];
	
