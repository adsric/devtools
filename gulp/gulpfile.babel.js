'use-strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp';
import babel from 'gulp-babel';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import nano from 'gulp-cssnano';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

const reload = browserSync.reload;

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
	const cssprefixes = [
		'Android 2.3',
		'Android >= 4',
		'Chrome >= 35',
		'Firefox >= 31',
		// Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
		// NOT the Edge app version shown in Edge's "About" screen.
		// For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
		// See also https://github.com/Fyrd/caniuse/issues/1928
		'Edge >= 12',
		'Explorer >= 11',
		'iOS >= 7',
		'Opera >= 12',
		'Safari >= 7.1'
	];

	const processors = [
		require('postcss-import')(),
		autoprefixer({browsers: cssprefixes})
	];

	return gulp.src('styles/src/*')
	.pipe(postcss(processors)
		.on('error', function (error) {
			console.error(error.message);
			this.emit('end');
		})
	)
	.pipe(nano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('styles/dist'))
	.pipe(browserSync.stream({match: '**/*.css'}));
});

// Concatenate and minify all JavaScript
gulp.task('scripts', [
	'scripts:vendor',
	'scripts:main'
]);

// Concatenate and minify JavaScript
gulp.task('scripts:vendor', () => {
	return gulp.src([
		// Note: you need to explicitly list your scripts here in the right order
		//       to be correctly concatenated
		'scripts/vendor/*.js'
	])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('scripts/dist'));
});

// Optionally transpiles ES2015 code to ES5. to enable ES2015 support
// uncomment the line `.pipe(babel())`
gulp.task('scripts:main', () => {
	return gulp.src([
		// Note: you need to explicitly list your scripts here in the right order
		//       to be correctly concatenated
		'scripts/src/*.js'
	])
	.pipe(babel())
	.pipe(concat('bundle.js'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('scripts/dist'))
	.pipe(browserSync.stream());
});

// Build + Watch files for changes & reload.
gulp.task('dev', ['build'], () => {
	// Initialise BrowserSync
	console.log('Starting BrowserSync...');
	browserSync.init({
		// Don't show any notifications in the browser.
		notify: false,
		// Stop the browser from automatically opening
		open: false,
		// Serve files from the base directory
		server: {
			baseDir: './'
		},
		// Server port change
		port: 8000,
		// User-interface port change
		ui: {
			port: 8080
		}
	});
	gulp.watch(['scripts/src/**/*'], ['scripts', reload]);
	gulp.watch(['styles/src/**/*'], ['styles', reload]);
});

const buildTasks = [
	'scripts',
	'styles',
];

// Build production files, the default task.
gulp.task('build', buildTasks);

gulp.task('default', ['build']);
