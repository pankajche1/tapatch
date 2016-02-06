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
			    console.log('in toggle()');
			    if($scope.menuDisplay===false)
				    $scope.menuDisplay=true;
			    else
				    $scope.menuDisplay=false;
		    };
		    
	    },//controller
	    //repeat:false,

	    link: function ($scope, element, attrs) {
		    function isVisible(elem){
			    return elem && elem.style.display!='none' && elem.offsetWidth && elem.offsetHeight;
		    }
		    $scope.menuDisplay=false;
		    var btn = element.find('button');
		    
		    if(isVisible(btn[0])){
			    $scope.menuDisplay=false;
			    return false;
		    }else{
			    $scope.menuDisplay=true;
			    return false;
		    }
		    

		   //var display = btn[0].style.display;
		   //var cls = btn[0].className;
		    //console.log('in mobile menu link className='+cls);
		    //console.log('offsetWidth='+btn[0].offsetWidth);
		    //console.log('display='+display);
		    //
		       },
	    templateUrl:'/partials/mobile-menu.html'
    };


}];
	
