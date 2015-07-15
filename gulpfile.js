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

var rootDIR  = './';
var assetDIR = '/a'
var distDIR  = './';

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
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'j')))
    .pipe($.size({gzip: true, showFiles: true, title:'library scripts'}));
});

gulp.task('js:main', function () {
  return gulp.src([
      rootDIR + assetDIR + '/j/main.js',
  ]).pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'j')))
    .pipe($.size({gzip: true, showFiles: true, title:'scripts'}));
});

gulp.task('images', function () {
  return gulp.src([rootDIR + assetDIR + '/i/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'i')))
    .pipe($.size({gzip: true, showFiles: false, title:'images'}));
});

gulp.task('icons', function () {
  var deferred = q.defer();
  var iconDIR  = rootDIR + assetDIR + '/icons/';
  var options  = { enhanceSVG: true };

  var files = fs.readdirSync(iconDIR).map(function (fileName) {
    return path.join(iconDIR, fileName);
  });

  var grunticon = new Grunticon(files, distDIR + assetDIR + '/icons', options);

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
  }).pipe(gulp.dest(distDIR))
    .pipe($.size({title: 'copy'}));
});

gulp.task('fonts', function () {
  return gulp.src([rootDIR + assetDIR + '/f/**/*'])
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'f')))
    .pipe($.size({showFiles: true, title: 'fonts'}));
});

gulp.task('css', function () {
  return gulp.src([rootDIR + assetDIR + '/c/index.css'])
    .pipe($.plumber({errorHandler: streamError}))
    .pipe(cssnext({
      browsers: '> 1%, last 2 versions, Safari > 5, ie > 9, Firefox ESR',
      url: false
    }))
    .pipe($.rename('main.css'))
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'c')))
    .pipe($.size({showFiles: true, title:'styles'}))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(distDIR, assetDIR, 'c')))
    .pipe($.size({gzip: true, showFiles: true, title:'styles'}))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function (done) {

  browserSync.init({
    browser: 'google chrome canary',
    notify: false,
    // proxy: '', // BrowserSync for a php server
    server: distDIR
  });
  
  gulp.watch([rootDIR + assetDIR + '/c/**/*.css'], ['css'], reload);
  gulp.watch([rootDIR + assetDIR + '/j/*.js'], ['js:main'], reload);
  gulp.watch([rootDIR + assetDIR + '/i/**/*'], ['images'], reload);
  gulp.watch([rootDIR + assetDIR + '/icons/*'], ['icons'], reload);
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
gulp.task('clean', function () {
  require('del')([
    rootDIR + assetDIR + '/j/lib.js',
    rootDIR + assetDIR + '/j/main.min.js',
    rootDIR + assetDIR + '/c/main.css',
    rootDIR + assetDIR + '/c/main.min.css',
    distDIR
  ], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
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
