(function(){
    "use strict()";
    describe('navbar directive test',function(){
	    //var $compile;
	    beforeEach(module('app'));
	    beforeEach(inject(function(_$compile_,_$rootScope_){
		    $compile = _$compile_;
		    $rootScope = _$rootScope_;
		    scope = $rootScope.$new({});
	    }));//beforeEach
	    function createElement(){
		    element = '<nav>' +
			    '<navitem label="services1"></navitem>'+
			    '<navitem label="about us"></navitem>'+
		    '</nav>' ;
		    //scope.projects= [];
		    element=$compile(element)(scope);
		    scope.$digest();
	    }
	    it('should create proper nav dom',function(){
		    //createElement();
		    //console.log(element.html());
		    //expect(element.find('nav').length).toEqual(0);
	    });//it
	    it('should call the desired fn when anchor is clicked',function(){
		    //createElement();
		    //expect(element.find('button').length).toEqual(1);
		    //element.find('a').triggerHandler('click');
	    
	    });//it

    });//main
}());



