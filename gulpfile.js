'use-strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');

var reload = browserSync.reload;

// Concatenate and minify JavaScript.
gulp.task('javascripts', function() {
    return gulp.src([
        // Note: you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        'javascripts/src/*.js'
    ])
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('javascripts/dist'))
    .pipe(size({ gzip: true, showFiles: true, title:'javascripts' }));
});

// Compile and automatically prefix stylesheets.
gulp.task('stylesheets', function() {
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
        autoprefixer({ browsers: cssprefixes }),
        require('postcss-reporter')({ clearMessages: true }),
    ];

    return gulp.src('stylesheets/src/*')
    .pipe(postcss(processors))
    .pipe(nano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('stylesheets/dist'))
    .pipe(size({ gzip: true, showFiles: true, title:'stylesheets' }));
});

// Generate SVG sprites
gulp.task('svg', function() {
    var svgConfig = {
        mode: {
            symbol: { // symbol mode to build the SVG
                dest: '', // destination folder
                sprite: 'sprite.svg', // sprite name
                example: true // build sample page
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
    .pipe(size({ gzip: true, showFiles: false, title:'svg' }));
});

// Optimize images.
gulp.task('images', function() {
    return gulp.src('images/src/**/*')
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('images/dist'))
    .pipe(size({ gzip: true, showFiles: false, title:'images' }));
});

// Watch files for changes & reload.
gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        logLevel: 'silent',
        logPrefix: 'BS',
        server: '/',
        port: 8000
    });

    gulp.watch(['javascripts/src/**/*'], ['javascripts']);
    gulp.watch(['stylesheets/src/**/*'], ['stylesheets']);
    gulp.watch(['svg/src/**/*'], ['svg']);
    gulp.watch(['image/src/**/*'], ['images']);
    gulp.watch(['/**/*'], reload);
});

var buildTasks = [
    'javascripts',
    'stylesheets',
    'svg',
    'images'
];

// Build production files, the default task.
gulp.task('build', [], function(cb) {
    runSequence(
        buildTasks,
    cb);
});

// Build production files, the default task.
gulp.task('build:watch', [], function(cb) {
    runSequence(
        buildTasks,
        'watch',
    cb);
});

gulp.task('default', ['build']);
