var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var size = require('gulp-size');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');

function icons() {
  return gulp.src(GLOBAL.config.src.icons + '/*.{svg}')
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(GLOBAL.config.output.icons))
    .pipe(size({ gzip: true, showFiles: false, title:'icons' }));
}

gulp.task('icons', icons);
