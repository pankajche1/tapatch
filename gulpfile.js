var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');
var karma = require('gulp-karma');
var buffer = require('vinyl-buffer');
var ngAnnotate = require('browserify-ngannotate');
// requires browserify and vinyl-source-stream
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var ngHtml2Js = require("gulp-ng-html2js");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();
var less = require('gulp-less');
//var sass = require('gulp-sass');
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  
var header     = require('gulp-header'); 
var replace     = require('gulp-replace'); 
var notify     = require('gulp-notify'); 
//build datestamp for cache busting
var getStamp = function() {
	var myDate = new Date();

	var myYear = myDate.getFullYear().toString();
	var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
	var myDay = ('0' + myDate.getDate()).slice(-2);
	var minutes = ('0' + myDate.getMinutes()).slice(-2);
	var mySeconds = myDate.getSeconds().toString();

	var myFullDate = myYear + myMonth + myDay + minutes + mySeconds;

	return myFullDate;
};
/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
	//console.log('clean() from pankaj');
    del([
        'public/js'
    ], cb);
});
/**
 * clean only guest js 
 */
gulp.task('clean-guest', function () {
	//console.log('clean() from pankaj');
    del([
        'public/js/main-guest*.js'
    ]);
});
/*
 * clean only member js
 */
gulp.task('clean-member', function () {
	//console.log('clean() from pankaj');
    del([
        'public/js/main-member*.js'
    ]);
});
/**
 * build for production
 */
// cache busting
//browserify makes this file: 'main-guest.js'
gulp.task('build-guest-prod',[],function(){
	var filename = 'main-guest'+getStamp()+'.js';
	//delete any such file like main-guest.js type:
	del([ 'public/js/main-guest*.js' ]);
	// browserify the file for guest module:
	browserify('./app/guest/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source(filename))
	.pipe(gulp.dest('./public/js/'));
	// cache bust on the html page script tag:
	//gulp.src('./public/py/handlers/templates/**/*.html')
	//.pipe(replace(/main-guest([0-9]*).js/g, filename))
	//.pipe(gulp.dest('./public/py/handlers/templates/'));
	gulp.src('./public/py/handlers/templates/guest/index.html')
	//.pipe(replace(/main-guest.js\?([0-9]*)/g, filename))
	.pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/guest'));
});
// prod mode and dev mode
// in prod mode you don't do cache busting cz in local browser u can do ctrl+f5 to load no cache.,
// but in dev mode you can use file?bust kind of thing to avoid ctrl+f5 things
//1 dev mode main.guest.js?bust thing.
//these kind of scenes can be there: 1: build-guest-prod -> browserify-guest-dev -> build-guest-dev
//at any time we can have these 1: main-guest.js?1234 or
//if it is main-guest.js?12345 and can run three commands:1: build-guest-prod OK work
//2: build-guest-dev OK work 
//3: browserify-guest-dev ok work
//Now next: any time you can have this: main-guest12345.js
//then you can run 1: build-guest-prod ok works
//or u can run 2:build-guest-dev
//if it is main-guest12345.js? and can run three commands:1: build-guest-prod OK work
//2: build-guest-dev ok
//3: browserify-guest-dev
gulp.task('build-guest-dev',function(){
	// you can these formats pre existing:
	// main-guest234521.js or main-guest.js?22334 
	var fileName = 'main-guest.js?'+getStamp();
	// here you have to change the script tag in html page: 
	gulp.src('./public/py/handlers/templates/guest/index.html')
	.pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, fileName))
	.pipe(gulp.dest('./public/py/handlers/templates/guest'));
});
// member module
gulp.task('build-member-prod',[],function(){
	var filename = 'main-member'+getStamp()+'.js';
	//delete any such file like main-guest.js type:
	del([ 'public/js/main-member*.js' ]);
	// browserify the file for guest module:
	browserify('./app/member/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source(filename))
	.pipe(gulp.dest('./public/js/'));
	// cache bust on the html page script tag:
	gulp.src('./public/py/handlers/templates/member/index.html')
	.pipe(replace(/main-member([0-9]*).js(\?*[0-9]*)/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/member'));
});
gulp.task('build-member-dev',function(){
	var fileName = 'main-member.js?'+getStamp();
	// here you have to change the script tag in html page: 
	gulp.src('./public/py/handlers/templates/member/index.html')
	.pipe(replace(/main-member([0-9]*).js(\?*[0-9]*)/g, fileName))
	.pipe(gulp.dest('./public/py/handlers/templates/member'));
});
// admin b module:
gulp.task('build-admin-a-prod',[],function(){
	var filename = 'main-admin-a'+getStamp()+'.js';
	//delete any such file like main-guest.js type:
	del([ 'public/js/main-admin-a*.js' ]);
	// browserify the file for guest module:
	browserify('./app/admin/a/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source(filename))
	.pipe(gulp.dest('./public/js/'));
	// cache bust on the html page script tag:
	gulp.src('./public/py/handlers/templates/admin/a/index.html')
	.pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
});
gulp.task('build-admin-a-dev',function(){
	var fileName = 'main-admin-a.js?'+getStamp();
	// here you have to change the script tag in html page: 
	gulp.src('./public/py/handlers/templates/admin/a/index.html')
	.pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, fileName))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
});
// admin b module:
gulp.task('build-admin-b-prod',[],function(){
	var filename = 'main-admin-b'+getStamp()+'.js';
	//delete any such file like main-guest.js type:
	del([ 'public/js/main-admin-b*.js' ]);
	// browserify the file for guest module:
	browserify('./app/admin/b/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source(filename))
	.pipe(gulp.dest('./public/js/'));
	// cache bust on the html page script tag:
	gulp.src('./public/py/handlers/templates/admin/b/index.html')
	.pipe(replace(/main-admin-b([0-9]*).js(\?*[0-9]*)/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/b'));
});
gulp.task('build-admin-b-dev',function(){
	var fileName = 'main-admin-b.js?'+getStamp();
	// here you have to change the script tag in html page: 
	gulp.src('./public/py/handlers/templates/admin/b/index.html')
	.pipe(replace(/main-admin-b([0-9]*).js(\?*[0-9]*)/g, fileName))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/b'));
});


gulp.task('connect', function () {
	connect.server({
			root: 'public',
			port: 4000
	});
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs karma tests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('test', ['build-js'], function() {
    var testFiles = [
        './tests/unit/*.js'
    ];

    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log('karma tests failed: ' + err);
            throw err;
        });
});
/** templates **/
gulp.task('template-guest',function(){
	var concat = require('gulp-concat');
return gulp.src("./app/guest/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/guest/templates/"));


});//template
gulp.task('template-member',function(){
	var concat = require('gulp-concat');
return gulp.src("./app/member/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	//.pipe(uglify())
	.pipe(gulp.dest("./app/member/templates/"));

});//template
gulp.task('template-admin-a',function(){
	var concat = require('gulp-concat');
return gulp.src("./app/admin/a/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/admin/a/templates/"));

});//template
gulp.task('template-admin-b',function(){
	var concat = require('gulp-concat');
return gulp.src("./app/admin/b/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/admin/b/templates/"));

});//template
/**
* this is in dev mode
*/
gulp.task('browserify-guest-dev', function() {
	// Grabs the app.js file
	browserify('./app/guest/app.js')
	.bundle()
	.pipe(source('main-guest.js'))
	.pipe(gulp.dest('./public/js/'));
	//change the html for cache bust in local server:
	gulp.src('./public/py/handlers/templates/guest/index.html')
	.pipe(replace(/main-guest([0-9]*).js(\?*[0-9]*)/g, 'main-guest.js?' + getStamp()))
	.pipe(gulp.dest('./public/py/handlers/templates/guest'));
});

gulp.task('browserify-member-dev', function() {
	browserify('./app/member/app.js')
	.bundle()
	.pipe(source('main-member.js'))
	.pipe(gulp.dest('./public/js/'));
	gulp.src('./public/py/handlers/templates/member/index.html')
	.pipe(replace(/main-member([0-9]*).js(\?*[0-9]*)/g, 'main-member.js?' + getStamp()))
	.pipe(gulp.dest('./public/py/handlers/templates/member'));

});
gulp.task('browserify-admin-a-dev', function() {
	browserify('./app/admin/a/app.js')
	.bundle()
	.pipe(source('main-admin-a.js'))
	.pipe(gulp.dest('./public/js/'));
	gulp.src('./public/py/handlers/templates/admin/a/index.html')
	.pipe(replace(/main-admin-a([0-9]*).js(\?*[0-9]*)/g, 'main-admin-a.js?' + getStamp()))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/a'));
});
gulp.task('browserify-admin-b-dev', function() {
	browserify('./app/admin/b/app.js')
	.bundle()
	.pipe(source('main-admin-b.js'))
	.pipe(gulp.dest('./public/js/'));
	gulp.src('./public/py/handlers/templates/admin/b/index.html')
	.pipe(replace(/main-admin-b([0-9]*).js(\?*[0-9]*)/g, 'main-admin-b.js?' + getStamp()))
	.pipe(gulp.dest('./public/py/handlers/templates/admin/b'));

});


/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', ['clean'], function() {
	console.log('in build js');
    var b = browserify({
        entries: './app/app.js',
        debug: true,
        paths: ['./app/controllers', './app/services', './app/directives'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .on('error', gutil.log)
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
});

/**
*
* a common watch for all
*/
gulp.task('watch', function() {
	//guest module:
	gulp.watch('app/guest/**/*.js', ['browserify-guest-dev']);
	gulp.watch('./app/guest/templates/**/*.html', ['template-guest']);
	//member module:
	gulp.watch('app/member/**/*.js', ['browserify-member-dev']);
	gulp.watch('./app/member/templates/**/*.html', ['template-member']);
	//admin-a module:
	gulp.watch('app/admin/a/**/*.js', ['browserify-admin-a-dev']);
	gulp.watch('./app/admin/a/templates/**/*.html', ['template-admin-a']);
	//admin-b module:
	gulp.watch('app/admin/b/**/*.js', ['browserify-admin-b-dev']);
	gulp.watch('./app/admin/b/templates/**/*.html', ['template-admin-b']);
	//less css
	gulp.watch('./styles/less/**/*.less', ['less']);
});

gulp.task('watch-guest', function() {
	gulp.watch('app/guest/**/*.js', ['browserify-guest']);
	gulp.watch('./app/guest/templates/**/*.html', ['template-guest']);
	gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-member', function() {
	gulp.watch('app/member/**/*.js', ['browserify-member'/*,'cachebust-member'*/]);
	gulp.watch('./app/member/templates/**/*.html', ['template-member']);
	gulp.watch('./styles/less/**/*.less', ['less', 'cachebust-css']);
});
gulp.task('watch-admin-a', function() {
	gulp.watch('app/admin/admin-a/**/*.js', ['browserify-admin-a']);
	gulp.watch('./app/admin/admin-a/templates/**/*.html', ['template-admin-a']);
	gulp.watch('./styles/less/**/*.less', ['less']);
});
gulp.task('watch-admin-b', function() {
	gulp.watch('app/admin/admin-b/**/*.js', ['browserify-admin-b']);
	gulp.watch('./app/admin/admin-b/templates/**/*.html', ['template-admin-b']);
	gulp.watch('./styles/less/**/*.less', ['less']);
});



/* Task to compile less */
	//gulp.task('less', ['less-compile']);  
	gulp.task('less', function() {  

		var filename = 'main.min-'+getStamp()+'.css';
		del(['./public/css/main.min-*.css']);
		  gulp.src('./styles/less/module2/main.less')
		  .pipe(less())
		  .pipe(minifyCSS())
		  .pipe(rename(filename))
		  .pipe(gulp.dest('./public/css/'));
		gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main.min-([0-9]*).css/g, filename))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
	
	});
	gulp.task('cssmin',function(){
		var filename = 'main.min-'+getStamp()+'.css';
		del(['./public/css/main.min-*.css']);
		  gulp.src('./styles/less/module2/main.less')
		  .pipe(less())
		  .pipe(minifyCSS())
		  .pipe(rename(filename))
		  .pipe(gulp.dest('./public/css/'));
		gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main.min-([0-9]*).css/g, filename))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
	
	
	});

gulp.task('cachebust-guest-prod', function() {
	var filename = 'main-guest.'+getStamp()+'.js';
	//take the main file from the public/js/main-guest.js
	// rename it:
	gulp.src('./public/js/main-guest.js')
	.pipe(rename(filename))
	.pipe(gulp.dest('./public/js/'));
	//now put the file name on html page
	return gulp.src('./public/py/handlers/templates/**/*.html')
	.pipe(replace(/main-guest\.([0-9]*).js/g, filename))
	.pipe(gulp.dest('./public/py/handlers/templates/'));
});
	gulp.task('cachebust-member', function() {
		return gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main-member.js\?([0-9]*)/g, 'main-member.js?' + getStamp()))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
	});
	gulp.task('cachebust-css', function() {
		//console.log('here in Cachebust');
		//var filename = 'main.min-'+getStamp()+'.css';
		stamp= getStamp();
		//console.log(stamp);
		return gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main.min.css\?([0-9]*)/g, 'main.min.css?' + stamp))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
		//.pipe(replace(/main.min-([0-9]*).css/g, filename));
		//.pipe(notify({ message: 'CSS/JS Cachebust task complete' }));
	});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////
/*
gulp.task('scss', ['clean'], function() {
    return gulp.src('./styles/scss/module2/main.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(cachebust.resources())
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css/'));
});

*/

