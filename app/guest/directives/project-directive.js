'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    //title:"@"	
		    //title: 'pankaj'
		    project: '@'

	    },
	    link: function ($scope, element, attrs) {
		    console.log($scope.project);
		    

	    },
	    template:
	    '<div class="panel panel-primary">'+
	        '<div class="panel-heading">'+
		    '<strong>Project</strong>'+
		    '</div>'+
		    '<div class="panel-body">'+
		    '{{ project}}'+
		    '</div>'+
            '</div>' // div main


    };


}];
	
