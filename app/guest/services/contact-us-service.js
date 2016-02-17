'use-strict()';
module.exports=['$resource', function($resource){
    return $resource('/contact-us',
	    {},
	    {
		    query:{method:'POST',
			    params:{},
			    isArray:true
    }});
}];
