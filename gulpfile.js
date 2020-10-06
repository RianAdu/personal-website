/****
Gulp file for automation
****/

  const { src, dest, task, parallel, series, watch } = require('gulp');
	const concat = require('gulp-concat');
	const gulpif = require('gulp-if');
	const cleanCSS = require('gulp-clean-css');
	const uglify = require('gulp-uglify');
	const htmlmin = require('gulp-htmlmin');
	const babel = require('gulp-babel');
	const sass = require('gulp-sass');
	const sourcemaps = require('gulp-sourcemaps');
	const autoprefix = require('gulp-autoprefixer');
	const browserSync = require('browser-sync').create();
	const sassGlob = require('gulp-sass-glob');

//distinguishing between development and production enviroment
//to change to production enter (NODE_ENV=production gulp) in terminal
const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  var outputDir = 'builds/development/';
} else {
	var outputDir = 'builds/production/';
}

//setting the files
const sassSources = ['components/sass/app.scss'];
const htmlSources = ['builds/development/*.html'];
const es6Scripts = [
	'components/scripts/app/app.js',
	'components/scripts/inc/project-template.js',
	'components/scripts/inc/projects.js'
];

const jsPlugins = [
	'components/scripts/plugins/picturefill.min.js',
	'components/scripts/plugins/lazysizes.min.js',
	'components/scripts/plugins/mustache.min.js'
];
const jsScripts = [
	'components/scripts/vendor/jquery.js',
	'components/scripts/vendor/jquery.validate.js',
	'components/scripts/vendor/webfontloader.js',
	'components/scripts/bootstrap/button.js',
	'components/scripts/bootstrap/collapse.js',
	'components/scripts/bootstrap/dropdown.js',
	'components/scripts/bootstrap/scrollspy.js',
	'components/scripts/bootstrap/modal.js',
	'components/scripts/bootstrap/transition.js',
	'components/scripts/babel_output/project-template.js',
	'components/scripts/babel_output/projects.js',
	'components/scripts/babel_output/app.js'
];


function markup() {
  return src('builds/development/*.html')
    .pipe(gulpif(nodeEnv === 'production', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    })))
    .pipe(gulpif(nodeEnv === 'production', dest(outputDir)));
}; //END OF markup task


function styles() {
	return src(sassSources)
		.pipe(gulpif(nodeEnv === 'development', sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulpif(nodeEnv === 'development', sourcemaps.write()))
		.pipe(gulpif(nodeEnv === 'production', cleanCSS()))
		.pipe(dest(outputDir + 'css'))
		.pipe(browserSync.stream());
}; //END OF styles task

function babelCompile() {
	return src(es6Scripts)
		.pipe(babel())
		.pipe(dest('components/scripts/babel_output/'));
}; // END of babelCompile

function scripts() {
	return src(jsScripts)
		.pipe(concat('app.js'))
		.pipe(gulpif(nodeEnv === 'production', uglify()))
		.pipe(dest(outputDir + '/js'));
}; //END OF script task


function plugins() {
	return src(jsPlugins)
		.pipe(concat('plugins.js'))
		.pipe(dest(outputDir + '/js'));
}; //END OF plugins task


function reload() {
  return browserSync.reload();
}

//server & watch task
function server() {
	browserSync.init({
		server: outputDir,
		browser: "google chrome"
	});

}; // END OF server & watch task

  function watchHTML() {
  watch(htmlSources, series(markup, reload));
}

function watchJS() {
  watch([es6Scripts], series(babelCompile, scripts, reload));
}

function watchSass(){
  watch(['components/sass/*.scss', 'components/sass/*/*.scss'], series(styles, reload));  
}

// Copy assets to production
exports.watch = series(watchHTML, watchJS, watchSass);
exports.default = series(markup, plugins, series(babelCompile, scripts), styles, server, watch);

/* task('staging', ['markup', 'plugins', 'scripts', 'styles', 'server', 'move']);

gulp.task('build', ['markup', 'plugins', 'scripts', 'styles', 'move']);
 */

function move() {

	//images
	return src('builds/development/img/**/*.*')
		.pipe(gulpif(nodeEnv === 'production', dest(outputDir + 'img')));

	//fonts
	return src('builds/development/fonts/**/*.*')
		.pipe(gulpif(nodeEnv === 'production', dest(outputDir + 'fonts')));

	//robot.txt
	return src('components/server/robots.txt')
		.pipe(gulpif(nodeEnv === 'production', dest(outputDir)));

}; //END OF move task

