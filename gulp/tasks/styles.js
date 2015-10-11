var gulp          = require('gulp'),
    config        = require('../config'),
    minifycss     = require('gulp-minify-css'),
    postcss       = require('gulp-postcss'),
    rename        = require('gulp-rename'),
    size          = require('gulp-size'),
    autoprefixer  = require('autoprefixer');

var cssprefixes = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

var processors = [
  require('postcss-import')(),
  require('postcss-cssnext')(),
  require('postcss-reporter')(),
  autoprefixer({ browsers: cssprefixes }),
];

function styles() {
  return gulp.src(config.paths.css.src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.paths.css.dest))
    .pipe(minifycss())
    .pipe(rename(config.names.css))
    .pipe(gulp.dest(config.paths.css.dest))
    .pipe(size({ gzip: true, showFiles: true, title:'styles' }));
}

function styles_watcher() {
  gulp.watch(config.paths.css.all, function() {
    styles();
  });
}

gulp.task('styles', styles);
gulp.task('styles_watcher', styles_watcher);
