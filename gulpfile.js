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

var rootDIR  = './site';
var assetDIR = '/assets'
var distDIR  = './dist';

// Errorhandler
function streamError (err) {
  $.util.beep();
  $.util.log(err instanceof $.util.PluginError ? err.toString() : err.stack);
}

gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/desandro-classie/classie.js',
    './js/main.js',
  ]).pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(path.join(rootDIR, assetDIR, 'js')))
    .pipe($.size({gzip: true, showFiles: true, title:'scripts'}));
});

gulp.task('images', function () {
  return gulp.src([rootDIR + assetDIR + '/img/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(path.join(rootDIR, assetDIR, 'img')))
    .pipe($.size({gzip: true, showFiles: false, title:'images'}));
});

gulp.task('icons', function () {
  var deferred = q.defer();
  var iconDIR  = './icons/';
  var options  = { enhanceSVG: true };

  var files = fs.readdirSync(iconDIR).map(function (fileName) {
    return path.join(iconDIR, fileName);
  });

  var grunticon = new Grunticon(files, rootDIR + assetDIR + '/icons', options);

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

gulp.task('styles', function () {
  return gulp.src(['./css/index.css'])
    .pipe($.plumber({errorHandler: streamError}))
    .pipe(cssnext({
      browsers: 'Android 2.3', 'Android >= 4', 'Chrome >= 35', 'Firefox >= 31', 'Explorer >= 9', 'iOS >= 7', 'Opera >= 12', 'Safari >= 7.1',
      features: {rem: false},
      url: false
    }))
    .pipe($.rename('main.css'))
    .pipe(gulp.dest(path.join(rootDIR, assetDIR, 'css')))
    .pipe($.size({showFiles: true, title:'styles'}))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(rootDIR, assetDIR, 'css')))
    .pipe($.size({gzip: true, showFiles: true, title:'styles'}))
    .pipe(browserSync.stream());
});

gulp.task('uncss', function() {
  return gulp.src([rootDIR + assetDIR + '/css/main.css'])
    .pipe($.uncss({
      html: [
        distDIR + '/*.html',
        distDIR + '/**/*.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [
        /.js/,
        /svg/
      ]
    }))
    .pipe($.rename('main.min.css'))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(path.join(rootDIR, assetDIR, 'css')))
    .pipe($.size({gzip: true, showFiles: true, title:'styles'}));
});

gulp.task('serve', ['build:serve'], function (done) {

  browserSync.init({
    browser: 'google chrome canary',
    notify: false,
    // proxy: '', // BrowserSync for a php server
    server: distDIR
  });

  // Watch Files for changes & do page reload
  gulp.watch([
    './_config.yml',
    rootDIR + '/_includes/*.html',
    rootDIR + '/_layouts/*.html',
    rootDIR + '/_posts/*',
    rootDIR + '/*.{html,md}',
    rootDIR + '/assets/**/*'
  ], ['jekyll:rebuild']);

  gulp.watch(['css/*.css'], ['styles'], reload);
  gulp.watch(['js/*.js'], ['scripts'], reload);
});

gulp.task('serve:dist', ['build'], function (done) {

  browserSync.init({
    notify: false,
    server: distDIR
  });
});

// -----------------------------------------------------------------------------
// | Setup tasks                                                               |
// -----------------------------------------------------------------------------

// Clean up
gulp.task('clean', function () {
  require('del')([
    rootDIR + assetDIR + '/js/main.min.js',
    rootDIR + assetDIR + '/css/main.css',
    rootDIR + assetDIR + '/css/main.min.css',
    rootDIR + assetDIR + '/icons/',
    distDIR
  ], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

// -----------------------------------------------------------------------------
// | Build tasks                                                               |
// -----------------------------------------------------------------------------

gulp.task('jekyll:build', function (done) {
  return spawn('jekyll', ['build', '--config=./_config.yml'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function () {
  browserSync.reload();
});

gulp.task('build', function (done) {
  runSequence(
    'styles',
    ['scripts', 'images', 'icons', 'copy'],
    'jekyll:build',
  done);
});

gulp.task('build:serve', function (done) {
  runSequence(
    'styles',
    ['scripts', 'icons', 'copy'],
    'jekyll:build',
  done);
});

gulp.task('default', ['build']);
