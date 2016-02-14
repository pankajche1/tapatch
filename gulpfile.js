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
var sass = require('gulp-sass');
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  
var header     = require('gulp-header'); 
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
gulp.task('template',function(){
	//console.log('here');
	var concat = require('gulp-concat');
return gulp.src("./app/templates/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
	.pipe(ngHtml2Js({
		moduleName: "Templates1",
		prefix: "/partials/"
	}))
	.pipe(concat('alltemplate.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./app/templates/"));


});//template
gulp.task('browserify', function() {
	// Grabs the app.js file
	return browserify('./app/app.js')
	// bundles it and creates a file called main.js
	.bundle()
	.pipe(source('main.js'))
	//.pipe(uglify())
	// saves it the public/js/ directory
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


gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify']);
	gulp.watch('./app/templates/**/*.html', ['template']);
	gulp.watch('./less/**/*.less', ['less']);
});
/* Task to compile less */
	gulp.task('less', function() {  
		  gulp.src('./less/module2/main.less')
		  .pipe(less())
		  //.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		  .pipe(gulp.dest('./public/css/'));
	});
	gulp.task('cssmin',function(){
		gulp.src('./less/module2/main.less')
		.pipe(less())
		.pipe(minifyCSS())
		//.pipe(header(banner, {pkg: pkg}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest( './public/css/' ));
	
	
	});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('scss', ['clean'], function() {
    return gulp.src('./styles/scss/module2/main.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(cachebust.resources())
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css/'));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-css', ['clean'], function() {
    return gulp.src('./styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});


