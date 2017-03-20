'use-strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var size = require('gulp-size');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');

var reload = browserSync.reload;

// Lint, Concatenate and minify all Javascript
gulp.task('javascripts', [
    'lint:javascripts',
    'javascripts:vendor',
    'javascripts:main'
]);

// Lint JavaScript
gulp.task('lint:javascripts', function() {
    return gulp.src([
        'javascripts/src/*.js',
        '!node_modules/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Concatenate and minify JavaScript
gulp.task('javascripts:vendor', function() {
    return gulp.src([
        // Note: you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        'javascripts/vendor/*.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('javascripts/min'))
    .pipe(size({gzip: true, showFiles: true, title:'javascripts (vendor)'}));
});

// Optionally transpiles ES2015 code to ES5. to enable ES2015 support
// uncomment the line `.pipe(babel())`
gulp.task('javascripts:main', function() {
    return gulp.src([
        // Note: you need to explicitly list your scripts here in the right order
        //       to be correctly concatenated
        'javascripts/src/*.js'
    ])
    //.pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('javascripts/min'))
    .pipe(size({gzip: true, showFiles: true, title:'javascripts (main)'}));
});

// Compile and automatically prefix stylesheets
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
        autoprefixer({browsers: cssprefixes})
    ];

    return gulp.src('stylesheets/src/*')
    .pipe(postcss(processors))
    .pipe(nano())
    .pipe(gulp.dest('stylesheets/min'))
    .pipe(size({gzip: true, showFiles: true, title:'stylesheets'}));
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
    .pipe(gulp.dest('svg/min'))
    .pipe(size({gzip: true, showFiles: false, title:'svg'}));
});

// Optimize images.
gulp.task('images', function() {
    return gulp.src('images/src/**/*')
    .pipe(imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('images/min'))
    .pipe(size({gzip: true, showFiles: false, title:'images'}));
});

// Watch files for changes & reload.
gulp.task('watch', ['build'], function() {
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
        },
        // watch the files.
        files: ['./stylesheets/min/*.css', './javascripts/min/*.js', './images/min/**/*']
    });

    gulp.watch(['./**/*.html'], reload);
    gulp.watch(['javascripts/src/**/*'], ['javascripts', reload]);
    gulp.watch(['stylesheets/src/**/*'], ['stylesheets', reload]);
    gulp.watch(['svg/src/**/*'], ['svg', reload]);
    gulp.watch(['image/src/**/*'], ['images', reload]);
});

var buildTasks = [
    'javascripts',
    'stylesheets',
    'svg',
    'images'
];

// Build production files, the default task.
gulp.task('build', buildTasks);

// Build production files and watch for changes.
gulp.task('build:watch', ['watch']);

gulp.task('default', ['build']);
