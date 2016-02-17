(function(){
    "use strict()";
    fdescribe('navbar directive test',function(){
	    //var $compile;
	    beforeEach(module('app-member'));
	    beforeEach(inject(function(_$compile_,_$rootScope_){
		    $compile = _$compile_;
		    $rootScope = _$rootScope_;
		    scope = $rootScope.$new({});
	    }));//beforeEach
	    function createElement(){
		    
		    element = '<pnav>' +
			    '<navitem label="services1"></navitem>'+
			    '<navitem label="about us"></navitem>'+
		    '</pnav>' ;
		    

		    //scope.projects= [];
		    element=$compile(element)(scope);
		    scope.$digest();
	    }
	    it('should create proper nav dom',function(){
		    createElement();
		    console.log('here');
		    console.log(element.html());
		    //expect(element.find('nav').length).toEqual(0);
	    });//it
	    it('should call the desired fn when anchor is clicked',function(){
		    //createElement();
		    //expect(element.find('button').length).toEqual(1);
		    //element.find('a').triggerHandler('click');
	    
	    });//it

    });//main
}());



