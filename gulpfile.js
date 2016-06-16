'use-strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var nano = require('gulp-cssnano');
var path = require('path');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var stylelint = require('stylelint');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');

var reload = browserSync.reload;

var paths = {
  root: '',

  scripts: {
    src: '',
    output: ''
  },
  static: {
    src: '',
    output: ''
  },
  styles: {
    src: '',
    output: ''
  },
  icons: {
    src: '',
    output: ''
  },
  images: {
    src: '',
    output: ''
  },
};

// Concatenate and minify JavaScript.
gulp.task('scripts', function() {
  return gulp.src([
      // Note: you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      paths.scripts.src + '/vendor/*.js',
      paths.scripts.src + '/*.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(size({ gzip: true, showFiles: true, title:'scripts' }));
});

// Copy all static files.
gulp.task('copy', function() {
  return gulp.src(paths.static.src + '/**/*', {
    dot: true
  }).pipe(gulp.dest(paths.static.output))
    .pipe(size({ title: 'copy' }));
});

// Lint stylesheets.
gulp.task('styles-linter', function () {
  var processors = [
    stylelint(),
    require('postcss-reporter')({ clearMessages: true }),
  ];

  return gulp.src(paths.styles.src + '/**/*.css')
    .pipe(postcss(processors));
});

// Compile and automatically prefix stylesheets.
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
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-custom-selectors')(),
    require('postcss-calc')(),
    autoprefixer({ browsers: cssprefixes }),
    require('postcss-reporter')({ clearMessages: true }),
  ];

  return gulp.src(paths.styles.src + '/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.styles.output))
    .pipe(nano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.output))
    .pipe(size({ gzip: true, showFiles: true, title:'styles' }));
});

// Generate SVG sprites
gulp.task('icons', function() {
  var svgConfig = {
    mode: {
      symbol: { // symbol mode to build the SVG
        dest: '', // destination folder
        sprite: 'icons.svg', // sprite name
        example: true // build sample page
      }
    },
    svg: {
      xmlDeclaration: false, // strip out the XML attribute
      doctypeDeclaration: false // don't include the !DOCTYPE declaration
    }
  };

  return gulp.src(paths.icons.src + '/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(paths.icons.output))
    .pipe(size({ gzip: true, showFiles: false, title:'icons' }));
});

// Optimize images.
gulp.task('images', function() {
  return gulp.src(paths.images.src + '/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.images.output))
    .pipe(size({ gzip: true, showFiles: false, title:'images' }));
});

// Watch files for changes & reload.
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    logLevel: 'silent',
    logPrefix: 'BS',
    server: paths.root,
    port: 8000
  });

  gulp.watch([paths.scripts.src + '/**/*'], ['scripts'], reload);
  gulp.watch([paths.styles.src + '/**/*'], ['styles'], reload);
  gulp.watch([paths.icons.src + '/**/*.svg'], ['icons'], reload);
  gulp.watch([paths.images.src + '/**/*'], ['images'], reload);
});

var buildTasks = [
  'scripts',
  'styles-linter',
  'styles',
  'icons',
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

// Clean output directories.
gulp.task('clean', function() {
  require('del')([
     paths.scripts.output,
     paths.styles.output,
     paths.icons.output,
     paths.images.output
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

gulp.task('default', ['build']);
