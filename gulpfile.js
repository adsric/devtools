/** assembly */

var fs          = require('fs');
var path        = require('path');
var spawn       = require('child_process').spawn;
var q           = require('q');

var gulp        = require('gulp');
var cssnext     = require('gulp-cssnext');
var Grunticon   = require('grunticon-lib');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// The source directory for all the pre-built files.
var SRC = './a';

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
    .pipe(gulp.dest(path.join(DEST, 'j')))
    .pipe($.size({gzip: true, showFiles: true, title:'lib scripts'}));
});

gulp.task('js:main', function () {
  return gulp.src([
    SRC + '/j/*.js',
    '!' + SRC + '/j/main.min.js',
  ]).pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(DEST, 'j')))
    .pipe($.size({gzip: true, showFiles: true, title:'site scripts'}));
});

gulp.task('images', function () {
  return gulp.src([SRC + '/i/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(DEST, 'i')))
    .pipe($.size({gzip: true, showFiles: false, title:'images'}));
});

gulp.task('icons', function () {
  var deferred = q.defer();
  var iconDir  = SRC + '/icons/';
  var options  = { enhanceSVG: true };

  var files = fs.readdirSync(iconDir).map(function (fileName) {
    return path.join(iconDir, fileName);
  });

  var grunticon = new Grunticon(files, DEST + 'icons', options);

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
  return gulp.src([SRC + '/f/**/*'])
    .pipe(gulp.dest(path.join(DEST, 'f')))
    .pipe($.size({showFiles: true, title: 'fonts'}));
});

gulp.task('css', function () {
  return gulp.src([
      SRC + '/c/index.css',
      '!' + SRC + '/c/main.css',
      '!' + SRC + '/c/main.min.css'
  ]).pipe($.plumber({errorHandler: streamError}))
    .pipe(cssnext({
      browsers: '> 1%, last 2 versions, Safari > 5, ie > 9, Firefox ESR',
      url: false
    }))
    .pipe($.rename('main.css'))
    .pipe(gulp.dest(path.join(DEST, 'c')))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(DEST, 'c')))
    .pipe($.size({gzip: true, showFiles: true, title:'styles'}))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function (done) {

  browserSync.init({
    browser: 'google chrome canary',
    notify: false,
    // proxy: '', // BrowserSync for a php server
    server: DEST
  });

  // Watch Files for changes & do page reload
  gulp.watch([SRC + '/c/**/*.css'], ['css'], reload);
  gulp.watch([SRC + '/j/*.js'], ['js:main'], reload);
  gulp.watch([SRC + '/i/**/*'], ['images'], reload);
  gulp.watch([SRC + '/icons/*'], ['icons'], reload);
});

// -----------------------------------------------------------------------------
// | Setup tasks                                                               |
// -----------------------------------------------------------------------------

// Install/Update bower components
gulp.task('bower', function (cb) {
  var proc = spawn('./node_modules/bower/bin/bower', ['install'], {cwd: './', stdio: 'inherit'});
  proc.on('close', cb);
});

// Set up
gulp.task('setup', function (cb) {
  runSequence(['bower'], cb);
});

// Clean up
gulp.task('clean', function (done) {
  require('del')([
    SRC + '/j/lib.js',
    SRC + '/j/main.min.js',
    SRC + '/c/main.css',
    SRC + '/c/main.min.css',
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
