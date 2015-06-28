/** assembly */

/**
 * Tasks
 * 1. js:libs     : Concatenate & minify all vendor Javascript, to `lib.js`.
 * 2. js:main     : Concatenate & minify all Javascript, to `main.min.js`.
 * 3. images      : Optimize PNG, JPEG, GIF and SVG images.
 * 4. css         : Translates and prefix's CSS to `main.min.css`.
 * 5. server      : BrowserSync server and watch all src files.
 *
 * Commands
 * 1. clean       : Delete the output files.
 * 2. serve       : Build all assets and launch BrowserSync server.
 * 3. build       : Build all assets.
 */

var path        = require('path');
var gulp        = require('gulp');
var cssnext     = require('gulp-cssnext');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// The output directory for all the built files.
const DEST = './build';

// Errorhandler
function streamError (err) {
  $.util.beep();
  $.util.log(err instanceof $.util.PluginError ? err.toString() : err.stack);
}

gulp.task('js:lib', function () {
  return gulp.src([
      //'bower_components/jquery/dist/jquery.js',
      './a/j/lib/*.js'
  ]).pipe($.concat('lib.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(DEST, 'a/j')))
    .pipe($.size({gzip: true, showFiles: true, title:'minified lib js'}));
});

gulp.task('js:main', function () {
  return gulp.src([
      './a/j/*.js',
      '!./a/j/main.min.js',
  ]).pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(DEST, 'a/j')))
    .pipe($.size({gzip: true, showFiles: true, title:'minified main js'}));
});

gulp.task('images', function () {
  return gulp.src(['./a/i/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(DEST, 'a/i')))
    .pipe($.size({gzip: true, showFiles: true, title:'images'}));
});

gulp.task('copy', function () {
  return gulp.src([
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest(DEST))
    .pipe($.size({title: 'copy'}));
});

gulp.task('fonts', function () {
  return gulp.src(['./a/f/**'])
    .pipe(gulp.dest(path.join(DEST, 'a/f')))
    .pipe($.size({showFiles: true, title: 'fonts'}));
});

gulp.task('css', function () {
  return gulp.src([
      './a/c/index.css',
      '!./a/c/main.css',
      '!./a/c/main.min.css'
  ]).pipe($.plumber({errorHandler: streamError}))
    .pipe(cssnext({
      browsers: '> 1%, last 2 versions, Safari > 5, ie > 9, Firefox ESR',
      url: false
    }))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(DEST, 'a/c')))
    .pipe($.size({gzip: true, showFiles: true, title:'minified css'}));
});

gulp.task('server', function () {

  var src = '**/*.{html,php}';

  browserSync.init(src, {
    browser: 'google chrome canary',
    logConnections: true,
    notify: false,
    // proxy: "",                           // BrowserSync for a php server
    server: [DEST]
  });

  // Watch Files for changes & do page reload
  gulp.watch(['./a/c/**/*.css'], ['css', reload]);
  gulp.watch(['./a/j/lib/*.js'], ['js:lib', reload]);
  gulp.watch(['./a/j/*.js'], ['js:main', reload]);
  gulp.watch(['./a/i/**/*'], ['images', reload]);
});

// -----------------------------------------------------------------------------
// | Main commands                                                             |
// -----------------------------------------------------------------------------

// Clean
gulp.task('clean', function (done) {
  require('del')([
    DEST,
    './a/j/lib.js',
    './a/j/main.min.js',
    './a/c/main.css',
    './a/c/main.min.css'
  ], done);
});

// Build & Serve
gulp.task('serve', function (done) {
  runSequence(
    'css',
    ['js:lib', 'js:main', 'images', 'copy', 'fonts'],
    'server',
  done);
});

// Build
gulp.task('build', function (done) {
  runSequence(
    'css',
    ['js:lib', 'js:main', 'images', 'copy', 'fonts'],
  done);
});

gulp.task('default', ['build']);
