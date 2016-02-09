'use-strict()';
module.exports=['$resource', function($resource){
    return $resource('data/countries.json',
	    {},
	    {
		    query:{method:'GET',
			    params:{},
			    isArray:true
    }});
}];
