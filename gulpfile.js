//gulp require plug-ins
var gulp		= require('gulp'),
	gutil		= require('gulp-util'),
	browserify	= require('gulp-browserify'),
	compass		= require('gulp-compass'),
	concat		= require('gulp-concat'),
	connect		= require('gulp-connect'),
	gulpif		= require('gulp-if'),
	minifyHTML	= require('gulp-minify-html'),
	minifyCSS	= require('gulp-minify-css'),
	uglify		= require('gulp-uglify');

// declarating enviroment and component sources
var enviroment,
	jsSources,
	sassSources,
	htmlSources,
	sassComments,
	outputDir;

//distinguishing between development and production enviroment
enviroment	= process.env.NODE_ENV || 'development';

if(enviroment === 'development'){
	outputDir = 'builds/development/';
	sassComments = true;
}
else {
	outputDir = 'builds/production/';
	sassComments = false;
}

//setting the files 
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsSources	= [ 
	'components/scripts/rian.js'
];


gulp.task('scripts', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.on('error', gutil.log)
		.pipe(gulpif(enviroment === 'production', uglify()))
		.pipe(gulp.dest(outputDir + '/js'))
		.pipe(connect.reload());
}); //END OF script task


gulp.task('styles', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			css:outputDir + 'css',
			style: 'expanded',
			comments: sassComments,
			require: ['susy', 'breakpoint','font-awesome-sass']
		})
		.on('error', gutil.log))
		.pipe(gulpif(enviroment === 'production', minifyCSS()))
		.pipe(connect.reload());
}); //END OF style task


gulp.task('markup', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(enviroment == 'production', minifyHTML()))
		.pipe(gulpif(enviroment == 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
}); //END OF markup task


gulp.task('watch', function(){
	gulp.watch('builds/development/*.html', ['markup']);
	gulp.watch(jsSources, ['scripts']);
	gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['styles']);
}); //END OF watch task


// Copy images and font-awesome files to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'images')));

   gulp.src('builds/development/fonts/**/*.*')
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'fonts')));

  gulp.src('builds/development/inc/*.*')
  .pipe(gulpif(enviroment === 'production', gulp.dest(outputDir +'inc')));

}); //END OF move task


gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
}); //END of connect task

gulp.task('default', ['markup', 'scripts', 'styles', 'connect', 'move', 'watch']);