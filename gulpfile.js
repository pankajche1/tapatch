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
/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
	console.log('clean() from pankaj');
    del([
        'public/js'
    ], cb);
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
return gulp.src("./app/admin/admin-a/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/admin/admin-a/templates/"));

});//template
gulp.task('template-admin-b',function(){
	var concat = require('gulp-concat');
return gulp.src("./app/admin/admin-b/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/admin/admin-b/templates/"));

});//template



gulp.task('browserify-guest', function() {
	// Grabs the app.js file
	return browserify('./app/guest/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source('main-guest.js'))
	//.pipe(uglify())
	// saves it the public/js/ directory
	//.pipe(cachebust.resources()) // you need to set the htaccess file to ignore some thing in file
	.pipe(gulp.dest('./public/js/'));
});
gulp.task('browserify-member', function() {
	// Grabs the app.js file
	return browserify('./app/member/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source('main-member.js'))
	//.pipe(uglify())
	// saves it the public/js/ directory
	//.pipe(cachebust.resources())
	.pipe(gulp.dest('./public/js/'));
});
gulp.task('browserify-admin-a', function() {
	// Grabs the app.js file
	return browserify('./app/admin/admin-a/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source('main-admin-a.js'))
	//.pipe(uglify())
	// saves it the public/js/ directory
	//.pipe(cachebust.resources())
	.pipe(gulp.dest('./public/js/'));
});
gulp.task('browserify-admin-b', function() {
	// Grabs the app.js file
	return browserify('./app/admin/admin-b/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source('main-admin-b.js'))
	//.pipe(uglify())
	// saves it the public/js/ directory
	//.pipe(cachebust.resources())
	.pipe(gulp.dest('./public/js/'));
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
	gulp.task('less', function() {  
		  gulp.src('./styles/less/module2/main.less')
		  .pipe(less())
		  //.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		//.pipe(cachebust.resources())
		  .pipe(gulp.dest('./public/css/'));
	});
	gulp.task('cssmin',function(){
		gulp.src('./styles/less/module2/main.less')
		.pipe(less())
		.pipe(minifyCSS())
		//.pipe(header(banner, {pkg: pkg}))
		.pipe(rename('main.min.css'))
		//.pipe(cachebust.resources())
		.pipe(gulp.dest( './public/css/' ));
	
	
	});
//build datestamp for cache busting
var getStamp = function() {
	var myDate = new Date();

	var myYear = myDate.getFullYear().toString();
	var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
	var myDay = ('0' + myDate.getDate()).slice(-2);
	var mySeconds = myDate.getSeconds().toString();

	var myFullDate = myYear + myMonth + myDay + mySeconds;

	return myFullDate;
};
	gulp.task('cachebust-guest', function() {
		return gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main-guest.js\?([0-9]*)/g, 'main-guest.js?' + getStamp()))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
	});
	gulp.task('cachebust-member', function() {
		return gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main-member.js\?([0-9]*)/g, 'main-member.js?' + getStamp()))
		.pipe(gulp.dest('./public/py/handlers/templates/'));
	});
	gulp.task('cachebust-css', function() {
		return gulp.src('./public/py/handlers/templates/**/*.html')
		.pipe(replace(/main.min.css\?([0-9]*)/g, 'main.min.css?' + getStamp()));
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

