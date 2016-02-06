(function(){
    "use strict()";
    fdescribe('mobile menu button directive test',function(){
	    //var $compile;
	    beforeEach(module('app'));
	    beforeEach(inject(function(_$compile_,_$rootScope_){
		    $compile = _$compile_;
		    $rootScope = _$rootScope_;
		    scope = $rootScope.$new({});
	    }));//beforeEach
	    function createElement(){
		    element = '<mobilemenu></mobilemenu>'; 

		    //scope.projects= [];
		    element=$compile(element)(scope);
		    scope.$digest();
	    }
	    it('should create proper mobile menu dom',function(){
		    createElement();
		    //console.log(element.html());
		    //expect(element.find('nav').length).toEqual(0);
	    });//it
	    it('should have button',function(){
		    createElement();
		    expect(element.find('button').length).toEqual(1);
		    //element.find('a').triggerHandler('click');
	    
	    });//it

    });//main
}());



