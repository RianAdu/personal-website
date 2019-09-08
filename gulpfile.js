/****
Gulp file for automation
****/

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	gulpif = require('gulp-if'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	jsonminify = require('gulp-jsonminify'),
	babel = require('gulp-babel'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	sassGlob = require('gulp-sass-glob');

// declarating enviroment and component sources
var enviroment,
	jsPlugins,
	jsScripts,
	es6Script,
	sassSources,
	htmlSources,
	outputDir;


//distinguishing between development and production enviroment
//to change to production enter (NODE_ENV=production gulp) in terminal
enviroment = process.env.NODE_ENV || 'development';

if (enviroment === 'development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/';
}

//setting the files
sassSources = ['components/sass/app.scss'];
htmlSources = ['builds/development/*.html'];
jsPlugins = [
	'components/scripts/plugins/picturefill.min.js',
	'components/scripts/plugins/lazysizes.min.js',
	'components/scripts/plugins/mustache.min.js'
];
jsScripts = [
	'components/scripts/vendor/jquery.js',
	'components/scripts/vendor/jquery.validate.js',
	'components/scripts/vendor/webfontloader.js',
	'components/scripts/bootstrap/button.js',
	'components/scripts/bootstrap/collapse.js',
	'components/scripts/bootstrap/dropdown.js',
	'components/scripts/bootstrap/scrollspy.js',
	'components/scripts/bootstrap/transition.js',
	'components/scripts/inc/projects.js',
	'components/scripts/inc/project-template.js',
	'components/scripts/es5/app.js'
];

es6Script = ['components/scripts/es6/app.js'];


gulp.task('markup', function() {
	gulp.src('builds/development/*.html')
		.pipe(gulpif(enviroment === 'production', htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true
		})))
		.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir)));
}); //END OF markup task


gulp.task('styles', function() {
	gulp.src(sassSources)
		.pipe(gulpif(enviroment === 'development', sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulpif(enviroment === 'development', sourcemaps.write()))
		.pipe(gulpif(enviroment === 'production', cleanCSS()))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(browserSync.stream());
}); //END OF styles task

gulp.task('compile-es5', function() {
	gulp.src(es6Script)
		.pipe(babel())
		.pipe(gulp.dest('components/scripts/es5/'));
}); // END of compile-es5

//compile-es6 has to be done before scripts runs that's why it's added as an dependency
gulp.task('scripts', ['compile-es5'], function() {
	gulp.src(jsScripts)
		.pipe(concat('app.js'))
		.pipe(gulpif(enviroment === 'production', uglify()))
		.pipe(gulp.dest(outputDir + '/js'));
}); //END OF script task


gulp.task('plugins', function() {
	gulp.src(jsPlugins)
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest(outputDir + '/js'));
}); //END OF plugins task


//server & watch task
gulp.task('server', ['styles'], function() {
	browserSync.init({
		server: outputDir,
		browser: "google chrome"
	});

	gulp.watch(htmlSources, ['markup']).on('change', browserSync.reload);
	gulp.watch([jsScripts, es6Script], ['scripts']).on('change', browserSync.reload);
	gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['styles']);
}); // END OF server & watch task


// Copy assets to production
gulp.task('move', function() {

	//images
	gulp.src('builds/development/img/**/*.*')
		.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir + 'img')));

	//fonts
	gulp.src('builds/development/fonts/**/*.*')
		.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir + 'fonts')));

}); //END OF move task

gulp.task('default', ['markup', 'plugins', 'scripts', 'styles', 'server', 'move']);