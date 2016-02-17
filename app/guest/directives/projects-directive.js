'use-strict()';
module.exports= [function(){
    return{
	    restrict: 'E',
	    scope: {
		    //title:"@"	
		    //title: 'pankaj'
		    projects: '='

	    },
	    link: function ($scope, element, attrs) {
		    var projects = $scope.projects;
		    //var i=0;
		    //console.log('here1');
		    for(i=0;i<projects.length;i++){
		    //console.log('here');
			    //console.log(projects[i]);

		    }
		    //console.log('here3');

	    },
	    template:
	    '<div>'+
		    //'<ul>'+
		    '<div ng-repeat="project in projects">'+
		    '<project project="{{ project }}"></project>'+
		    '</div>' +
		    //'</ul>'+
            '</div>' // div main


    };


}];
	
