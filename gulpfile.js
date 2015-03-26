/**
 * SCAFFOLDING
 *
 * Tasks
 * |
 * |– lint:js
 * |    |- gulpfile         # linting of gulpfile
 * |    |- all JS           # linting of all JS (excluding 3rd party and vendor)
 * |
 * |– js
 * |    |- concatenate      # Concatenates all JS to `main.js`
 * |    |– uglifyJS         # Minifying of `main.js` output `main.min.js`
 * |
 * |– images
 * |    |– minify           # Minifying of PNG, JPEG, GIF and SVG images
 * |
 * |– styles
 * |    |– compile          # Generate CSS from SCSS to `main.css`
 * |    |- prefix           # Prefix generated CSS
 * |    |– concatenate      # All CSS to `all.css`
 * |    |- minify           # Minifying of stylesheet
 * |
 * |– styles:fallback
 * |    |– compile          # Generate IE CSS from `main.css`
 * |    |- minify           # Minifying of `ie.css`
 * |
 * |– jekyll
 * |    |– build            # Building of Jekyll
 * |    |- rebuild          # Re-building of Jekyll with a page reload
 * |
 * |– server
 * |    |- browsersync      # Local server powered by BrowserSync
 * |    |– watch            # Watch for changes on all source files
 * |
 * |– clean                 # Delete the output directory and files
 * |- serve                 # Execute build and local server
 * |– build (default)       # Execute all build tasks
 * |
 */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var cp          = require('child_process');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var runSequence = require('run-sequence');

// Directories
var dirs = {
    source: 'src',
    output: 'dist'
};

gulp.task('lint:js', function () {
    return gulp.src([

        // Lint all JS
        dirs.source + '/assets/js/*.js',

        // Exclude the following files
        '!' + dirs.source + '/assets/js/jquery*.js',
        '!' + dirs.source + '/assets/js/*.min.js'

    ]).pipe(reload({stream: true, once: true}))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

gulp.task('js', function () {
    return gulp.src([

        //'bower_components/jquery/dist/jquery.js',
        dirs.source + '/assets/js/*.js',

        // Exclude the following files
        '!' + dirs.source + '/assets/js/*.min.js'

    ]).pipe(plugins.concat('all.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(dirs.output + '/assets/js/dist'))
      .pipe(plugins.size({title: 'js'}));
});

gulp.task('images', function () {
    return gulp.src(dirs.source + '/assets/images/**/*')
        .pipe(plugins.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(dirs.output + '/assets/images'))
        .pipe(plugins.size({title: 'images'}));
});

gulp.task('styles', function () {

    var PREFIX_BROWSERS = [
        'last 2 versions',
        'ie 9',
        'Firefox ESR',
        'Opera 12.1'
    ];

    return gulp.src([

            dirs.source + '/assets/scss/*.scss',
            dirs.source + '/assets/css/*.css'

    ]).pipe(plugins.changed('scss', {extension: '.scss'}))
      .pipe(plugins.sass({
          precision: 10,
          onError: console.error.bind(console, 'Sass error:')
    }))
      .pipe(plugins.autoprefixer({browsers: PREFIX_BROWSERS}))
      .pipe(gulp.dest('.tmp'))
      .pipe(plugins.changed('css', {extension: '.css'}))
      .pipe(plugins.concat('all.css'))
      .pipe(plugins.csso())
      .pipe(gulp.dest(dirs.output + '/assets/css/dist'))
      .pipe(plugins.size({title: 'styles'}));
});

gulp.task('styles:fallback', function () {
    return gulp.src('.tmp/styles.css')
        .pipe(plugins.mqRemove({width: '64em', type: 'screen'}))
        .pipe(plugins.rename({basename: 'ie'}))
        .pipe(plugins.csso())
        .pipe(gulp.dest(dirs.output + '/assets/css/dist'))
        .pipe(plugins.size({title: 'ie styles'}));
});

gulp.task('jekyll:build', function (done) {
    return cp.spawn('jekyll', ['build', '--config=src/_config.yml'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function () {
    browserSync.reload();
});

gulp.task('server', function() {
    browserSync({
        notify: false,
        logPrefix: 'SERVER',
        browser: 'google chrome canary',
        server: [dirs.output]
    });

    // Watch Files for changes & do page reload
    gulp.watch([
        dirs.source + '/_config.yml',
        dirs.source + '/_includes/*.html',
        dirs.source + '/_layouts/*.html',
        dirs.source + '/_posts/*',
        dirs.source + '/*.{html,md}'
    ],                                              ['jekyll:rebuild']);
    gulp.watch([
        dirs.source + '/assets/scss/*.scss',
        dirs.source + '/assets/css/*.css',
    ],                                              ['styles', reload]);
    gulp.watch(dirs.source + '/assets/js/*.js',     ['lint:js', 'js', reload]);
    gulp.watch(dirs.source + '/assets/images/**/*', ['images', reload]);
});

// -----------------------------------------------------------------------------
// | Main commands                                                             |
// -----------------------------------------------------------------------------

// Clean Output Directory
gulp.task('clean', function (done) {
    require('del')([
        dirs.output,
        '.tmp'
    ], done);
});

// Launch local server
gulp.task('serve', function (done) {
    runSequence(
        'jekyll:build',
        ['lint:js', 'styles', 'js', 'images'],
        'server',
    done);
});

// Build Files
gulp.task('build', function (done) {
    runSequence(
        'clean', 'jekyll:build',
        ['lint:js', 'styles', 'js', 'images'],
    done);
});

gulp.task('default', ['build']);
