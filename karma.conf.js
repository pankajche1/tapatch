module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
                //logLevel: 'config.LOG_DEBUG',
		frameworks: ['jasmine'],
		files: [
            //'public/js/main-member.js',
            'public/js/main-admin-b.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'tests/unit/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};
