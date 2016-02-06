(function(){
    "use strict()";
    describe('Projects Directive Test',function(){
	    var tmpl, scope;
	    beforeEach(module('app'));
	    beforeEach(inject(function(_$compile_,_$rootScope_){
		    $compile = _$compile_;
		    $rootScope = _$rootScope_;
		    scope = $rootScope.$new({});
	    }));//beforeEach
	    function createElement(){
		    element = '<projects projects="[\'ayuroma\',\'techmedia\']">' +
		    //'<project></project>'+
		    '</projects>' ;
		    //element = '<projects projects="ayuroma"></projects>';
		    scope.projects= [];
		    element=$compile(element)(scope);
		    scope.$digest();
	    }
	    it('should create projects div',function(){
		    pending();
	
		createElement();
		expect(element.find('div').length).toEqual(5);
		expect(scope.projects.length).toEqual(0);
		//var isolateScope  = element.isolateScope();
		//console.log(element.html());
		//expect(element.find('img').length).toEqual(1);
	    });//it

    });//describe main
}());
