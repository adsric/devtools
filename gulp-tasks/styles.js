var gulp = require('gulp');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var size = require('gulp-size');
var autoprefixer = require('autoprefixer');

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
  require('postcss-reporter')(),
  autoprefixer({ browsers: cssprefixes }),
];

function styles() {
  return gulp.src(GLOBAL.config.src.styles + '/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(GLOBAL.config.build.styles))
    .pipe(nano())
    .pipe(rename(GLOBAL.config.filename.styles))
    .pipe(gulp.dest(GLOBAL.config.build.styles))
    .pipe(size({ gzip: true, showFiles: true, title:'styles' }));
}

gulp.task('styles', styles);
