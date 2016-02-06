(function(){
    "use strict()";
    describe('Directive1 Test',function(){
	    var tmpl, scope;
	    beforeEach(module('app'));
	    beforeEach(inject(function(_$compile_,_$rootScope_){
		    $compile = _$compile_;
		    $rootScope = _$rootScope_;
		    scope = $rootScope.$new({});
	    }));//beforeEach
	    function createElement(){
		    element = '<directive1>' +
		    //'<project></project>'+
		    '</directive1>' ;
		    //element = '<projects projects="ayuroma"></projects>';
		    //scope.projects= [];
		    element=$compile(element)(scope);
		    scope.$digest();
	    }
	    it('should create  div',function(){
	
		createElement();
		expect(element.find('div').length).toEqual(1);
		//expect(scope.projects.length).toEqual(0);
		//console.log(element.html());
		//expect(element.find('img').length).toEqual(1);
	    });//it
	    it('should set scope vars in controller',function(){
	    	createElement();
		//expect(scope.var1).toEqual('val1');
		var isolateScope  = element.isolateScope();
		expect(isolateScope.var1).toEqual('val1 changed from link fn');
		//expect(scope.projects.length).toEqual(0);
		//console.log(element.html());
	    });//it
	    it('should click the button',function(){
	    	createElement();
		element.find('button').triggerHandler('click');
		var isolateScope  = element.isolateScope();
		expect(isolateScope.var1).toEqual('Pankaj Kumar Lodhi');
	
	    
	    
	    
	    });//it

    });//describe main
}());
