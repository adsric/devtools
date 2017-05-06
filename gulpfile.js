'use-strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');

var reload = browserSync.reload;

// Optimize images.
gulp.task('images', function() {
    return gulp.src('images/src/**/*')
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('images/dist'))
    .pipe(browserSync.stream());
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
    var cssprefixes = [
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

    var processors = [
        require('postcss-import')(),
        autoprefixer({browsers: cssprefixes})
    ];

    return gulp.src('styles/src/*')
    .pipe(postcss(processors)
        .on('error', function(error) {
              console.error(error.message);
              this.emit('end');
        })
    )
    .pipe(nano())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('styles/dist'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Concatenate and minify all JavaScript
gulp.task('scripts', [
    'scripts:vendor',
    'scripts:main'
]);

// Concatenate and minify JavaScript
gulp.task('scripts:vendor', function() {
    return gulp.src([
        // Note: you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        'scripts/vendor/*.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('scripts/dist'))
});

// Optionally transpiles ES2015 code to ES5. to enable ES2015 support
// uncomment the line `.pipe(babel())`
gulp.task('scripts:main', function() {
    return gulp.src([
        // Note: you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        'scripts/src/*.js'
    ])
    //.pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('scripts/dist'))
    .pipe(browserSync.stream());
});

// Generate SVG sprites
gulp.task('svg', function() {
    var svgConfig = {
        mode: {
            symbol: { // symbol mode to build the SVG
                dest: '', // destination folder
                example: false, // build sample page
                inline: true, // inline preparing
                sprite: 'sprite.svg' // sprite name
            }
        },
        svg: {
            xmlDeclaration: false, // strip out the XML attribute
            doctypeDeclaration: false // don't include the !DOCTYPE declaration
        }
    };

    return gulp.src('svg/src/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('svg/dist'))
    .pipe(browserSync.stream());
});

// Build + Watch files for changes & reload.
gulp.task('watch', ['build'], function() {
    // Initialise BrowserSync
    console.log('Starting BrowserSync...');
    browserSync.init({
        // Don't show any notifications in the browser.
        notify: false,
        // Stop the browser from automatically opening
        open: false,
        // Serve files from the base directory
        server: {
            baseDir: "./"
        },
        // Server port change
        port: 8000,
        // user-interface port change
        ui: {
            port: 8080
        }
    });
    gulp.watch(['scripts/src/**/*'], ['scripts', reload]);
    gulp.watch(['styles/src/**/*'], ['styles', reload]);
    gulp.watch(['svg/src/**/*'], ['svg', reload]);
    gulp.watch(['images/src/**/*'], ['images', reload]);
});

var buildTasks = [
    'scripts',
    'styles',
    'svg',
    'images'
];

// Build production files, the default task.
gulp.task('build', buildTasks);

gulp.task('default', ['build']);
