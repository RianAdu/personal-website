/**** 
Gulp file for automation
****/

var gulp			= require('gulp'),
	concat			= require('gulp-concat'),
	gulpif			= require('gulp-if'),
	cleanCSS		= require('gulp-clean-css'),
	uglify			= require('gulp-uglify'),
	htmlmin			= require('gulp-htmlmin'),
	jsonminify	= require('gulp-jsonminify'),
	sass 				= require('gulp-sass'),
	sourcemaps 	= require('gulp-sourcemaps'),
	autoprefix	= require('gulp-autoprefixer'),
	browserSync	= require('browser-sync').create(),
	sassGlob 		= require('gulp-sass-glob');

// declarating enviroment and component sources
var enviroment,
	jsSources,
	sassSources,
	htmlSources,
	outputDir;

//distinguishing between development and production enviroment
//to change to production enter (NODE_ENV=production gulp) in terminal
enviroment	= process.env.NODE_ENV || 'development';

if(enviroment === 'development'){
	outputDir = 'builds/development/';
}
else {
	outputDir = 'builds/production/';
}

//setting the files 
sassSources = ['components/sass/app.scss'];
htmlSources = [outputDir + '*.html'];
jsSources		= [
	'components/scripts/vendor/jquery.js',
	'components/scripts/bootstrap/*.js',
	'components/scripts/bootstrap_inc/tooltip.js',
	'components/scripts/bootstrap_inc/popover.js',
	'components/scripts/vendor/picturefill.js',
	'components/scripts/vendor/mustache.js',
	'components/scripts/app.js',
];


gulp.task('markup', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(enviroment === 'production', htmlmin({collapseWhitespace: true})))
		.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir)));
}); //END OF markup task


gulp.task('styles', function(){
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


gulp.task('scripts', function(){
	gulp.src(jsSources)
		.pipe(concat('app.js'))
		.pipe(gulpif(enviroment === 'production', uglify()))
		.pipe(gulp.dest(outputDir + '/js'));
}); //END OF script task


//server & watch task
gulp.task('server', ['styles'], function(){
	browserSync.init({
		server: outputDir,
		browser: "google chrome"
	});

	gulp.watch(htmlSources, ['markup']).on('change', browserSync.reload);
	gulp.watch(jsSources, ['scripts']).on('change', browserSync.reload);
	gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['styles']);
}); // END OF server & watch task


// Copy assets to production
gulp.task('move', function() {
	
	//images
 	gulp.src('builds/development/img/**/*.*')
	.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'images')));

	//fonts
  gulp.src('builds/development/fonts/**/*.*')
	.pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'fonts')));

	//javascript
	gulp.src('builds/development/inc/*.js')
	.pipe(gulpif(enviroment === 'production', uglify()))
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'inc')));

	//json files
  gulp.src('builds/development/inc/*.json')
  .pipe(gulpif(enviroment === 'production', jsonminify()))
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'inc')));

	//templates
  gulp.src('builds/development/templates/*.*')
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'templates')));

}); //END OF move task

gulp.task('default', ['markup', 'scripts', 'styles', 'server', 'move']);

