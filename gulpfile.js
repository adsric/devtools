/** dploy */

/**
 * Tasks
 * 1. js:libs     : Concatenate & minify all vendor Javascript to `libs.js`.
 * 2. js:main     : Concatenate & minify all Javascript to `scripts.js`.
 * 3. images      : Optimize PNG, JPEG, GIF and SVG images.
 * 4. scss        : Generate & prefix CSS from SASS, minify to `main.css`.
 * 5. server      : BrowserSync server and watch all src files.
 *
 * Commands
 * 1. clean       : Delete the output files.
 * 2. serve       : Build all assets and launch BrowserSync server.
 * 3. build       : Build all assets.
 */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var runSequence = require('run-sequence');

gulp.task('js:libs', function () {
  return gulp.src([
    //'bower_components/jquery/dist/jquery.js',
    'assets/js/libs/*.js'
  ]).pipe(plugins.concat('libs.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(plugins.size({gzip: true, showFiles: true, title:'minified libs js'}));
});

gulp.task('js:main', function () {
  return gulp.src([
    'assets/js/*.js',
    '!assets/js/scripts.js',
  ]).pipe(plugins.concat('scripts.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(plugins.size({gzip: true, showFiles: true, title:'minified app js'}));
});

gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('assets/images'))
    .pipe(plugins.size({gzip: true, showFiles: true, title:'images'}));
});

gulp.task('scss', function () {

  var PREFIX_BROWSERS = [
    '> 1%',
    'last 2 versions',
    'Safari > 5',
    'ie 9',
    'Firefox ESR',
    'Opera 12.1'
  ];

  return gulp.src('assets/scss/*.scss')
    .pipe(plugins.changed('.tmp/styles', {extension: '.css'}))
    .pipe(plugins.sass({
      precision: 10,
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer(PREFIX_BROWSERS))
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(gulp.dest('assets/css'))
    .pipe(plugins.size({gzip: true, showFiles: true, title:'minified css'}));
});

gulp.task('server', function() {

  var src = '**/*.{html,php}';

  browserSync.init(src, {
    browser: 'google chrome canary',
    logConnections: true,
    notify: false,
    // proxy: "",                           // BrowserSync for a php server
    server: ['./']
  });

  // Watch Files for changes & do page reload
  gulp.watch('assets/scss/*.scss',  ['scss', reload]);
  gulp.watch('assets/js/libs/*.js', ['js:libs', reload]);
  gulp.watch('assets/js/app/*.js',  ['js:main', reload]);
  gulp.watch('assets/images/**/*',  ['images', reload]);
});

// -----------------------------------------------------------------------------
// | Main commands                                                             |
// -----------------------------------------------------------------------------

// Clean
gulp.task('clean', function (done) {
  require('del')([
    'assets/css/main.min.css',
    'assets/css/main.css',
    'assets/js/libs.js',
    'assets/js/scripts.js'
  ], done);
});

// Build & Serve
gulp.task('serve', function (done) {
  runSequence(
    'scss',
    ['js:libs', 'js:main', 'images'],
    'server',
  done);
});

// Build
gulp.task('build', function (done) {
  runSequence(
    'scss',
    ['js:libs', 'js:main', 'images'],
  done);
});

gulp.task('default', ['build']);
