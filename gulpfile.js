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

var fs          = require('fs');
var path        = require('path');
var spawn       = require('child_process').spawn;

var gulp        = require('gulp');
var cssnext     = require('gulp-cssnext');
var Grunticon   = require('grunticon-lib');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// The source directory for all the pre-built files.
var SRC = '.';

// The output directory for all the built files.
var DEST = './build';

// Errorhandler
function streamError (err) {
  $.util.beep();
  $.util.log(err instanceof $.util.PluginError ? err.toString() : err.stack);
}

gulp.task('js:lib', function () {
  return gulp.src([
    //'bower_components/jquery/dist/jquery.js',
  ]).pipe($.concat('lib.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(DEST, 'a/j')))
    .pipe($.size({gzip: true, showFiles: true, title:'lib scripts'}));
});

gulp.task('js:main', function () {
  return gulp.src([
    SRC + '/a/j/*.js',
    '!' + SRC + '/a/j/main.min.js',
  ]).pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(DEST, 'a/j')))
    .pipe($.size({gzip: true, showFiles: true, title:'site scripts'}));
});

gulp.task('images', function () {
  return gulp.src([SRC + '/a/i/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(DEST, 'a/i')))
    .pipe($.size({gzip: true, showFiles: false, title:'images'}));
});

gulp.task('icons', function () {
  var deferred = q.defer();
  var iconDir  = SRC + '/a/icons/';
  var options  = { enhanceSVG: true };

  var files = fs.readdirSync(iconDir).map(function (fileName) {
    return path.join(iconDir, fileName);
  });

  var grunticon = new Grunticon(files, DEST + '/a/icons', options);

  grunticon.process(function () {
    deferred.resolve();
  });

  return deferred.promise;
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
  return gulp.src([SRC + '/a/f/**/*'])
    .pipe(gulp.dest(path.join(DEST, 'a/f')))
    .pipe($.size({showFiles: true, title: 'fonts'}));
});

gulp.task('css', function () {
  return gulp.src([
      SRC + '/a/c/index.css',
      '!' + SRC + '/a/c/main.css',
      '!' + SRC + '/a/c/main.min.css'
  ]).pipe($.plumber({errorHandler: streamError}))
    .pipe(cssnext({
      browsers: '> 1%, last 2 versions, Safari > 5, ie > 9, Firefox ESR',
      url: false
    }))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(DEST, 'a/c')))
    .pipe($.size({gzip: true, showFiles: true, title:'styles'}));
});

gulp.task('serve', ['build'], function (done) {

  var src = '**/*.{html,php}';

  browserSync.init(src, {
    browser: 'google chrome canary',
    logConnections: true,
    notify: false,
    // proxy: "", // BrowserSync for a php server
    server: [DEST]
  });

  // Watch Files for changes & do page reload
  gulp.watch([SRC + '/a/c/**/*.css'], ['css', reload]);
  gulp.watch([SRC + '/a/j/*.js'], ['js:main', reload]);
  gulp.watch([SRC + '/a/i/**/*'], ['images', reload]);
  gulp.watch([SRC + '/a/icons/*'], ['icons', reload]);
});

// -----------------------------------------------------------------------------
// | Setup tasks                                                               |
// -----------------------------------------------------------------------------

// Install/update bower components
gulp.task('bower', function (cb) {
  var proc = spawn('./node_modules/bower/bin/bower', ['install'], {cwd: SRC + '/', stdio: 'inherit'});
  proc.on('close', cb);
});

// Set up
gulp.task('setup', function (cb) {
  runSequence(['bower'], cb);
});

// Clean
gulp.task('clean', function (done) {
  require('del')([
    SRC + '/a/j/lib.js',
    SRC + '/a/j/main.min.js',
    SRC + '/a/c/main.css',
    SRC + '/a/c/main.min.css',
    DEST
  ], done);
});

// -----------------------------------------------------------------------------
// | Build tasks                                                               |
// -----------------------------------------------------------------------------

// Build
gulp.task('build', function (done) {
  runSequence(
    'css',
    ['js:lib', 'js:main', 'images', 'icons', 'copy', 'fonts'],
  done);
});

gulp.task('default', ['build']);
