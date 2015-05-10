/**
 * SCAFFOLDR
 *
 * Tasks
 *
 * 1. lint:js       # linting of all JS (excl plugin and vendor).
 * 2. js            # Concatenate & minify all JavaScript to `all.js`.
 * 3. images        # Optimize PNG, JPEG, GIF and SVG images.
 * 4. css           # Generate & prefix CSS using nextcss, minify to `all.css`.
 * 5. server        # BrowserSync server and watch all src files.
 *
 * Commands
 *
 * 1. clean         # Delete the output files.
 * 2. serve         # Build all assets and launch BrowserSync server.
 * 3. build         # Build all assets.
 */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var runSequence = require('run-sequence');

gulp.task('lint:js', function () {
  return gulp.src([

      'assets/js/*.js',
      '!assets/js/jquery*.js',              // Don't lint plugins
      '!assets/js/*.min.js'                 // Don't lint minified JS

  ]).pipe(reload({stream: true, once: true}))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

gulp.task('js', function () {
  return gulp.src([

    //'bower_components/jquery/dist/jquery.js',
    'assets/js/*.js',
    '!/assets/js/*.min.js'                  // Dont't process minifed JS

  ]).pipe(plugins.concat('all.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('assets/js/dist'))
    .pipe(plugins.size({title: 'js'}));
});

gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('assets/images'))
    .pipe(plugins.size({title: 'images'}));
});

gulp.task('css', function () {

  var PREFIX_BROWSERS = [
    'last 2 versions',
    'ie 9',
    'Firefox ESR',
    'Opera 12.1'
  ];

  return gulp.src('assets/css/index.css')
    .pipe(plugins.cssnext([
      {browsers: PREFIX_BROWSERS},
      {compress: false},
      {path: 'assets/css'}
    ]))
    .pipe(gulp.dest('assets/css/dist'))
    .pipe(plugins.rename('all.css'))
    .pipe(plugins.csso())
    .pipe(gulp.dest('assets/css/dist'))
    .pipe(plugins.size({title: 'css'}));
});

gulp.task('server', function() {

  var src = '**/*.{html,php}';

  browserSync.init(src, {
    // proxy: "",                           // BrowserSync for a php server
    server: ['./'],
    notify: false,
    browser: 'google chrome canary'
  });

  // Watch Files for changes & do page reload
  gulp.watch('assets/css/*.css'    ['css', reload]);
  gulp.watch('assets/js/*.js',     ['lint:js', 'js', reload]);
  gulp.watch('assets/images/**/*', ['images', reload]);
});

// -----------------------------------------------------------------------------
// | Main commands                                                             |
// -----------------------------------------------------------------------------

// Clean
gulp.task('clean', function (done) {
    require('del')(['assets/css/dist', 'assets/js/dist'], done);
});

// Build & Serve
gulp.task('serve', function (done) {
    runSequence(['lint:js', 'css', 'js', 'images'], 'server', done);
});

// Build
gulp.task('build', function (done) {
    runSequence('clean', ['lint:js', 'css', 'js', 'images'], done);
});

gulp.task('default', ['build']);
