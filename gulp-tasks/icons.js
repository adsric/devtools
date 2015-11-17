var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var size = require('gulp-size');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var svg2png = require('gulp-svg2png');

function icons() {
  return gulp.src(GLOBAL.config.src.icons + '/*.{svg}')
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(GLOBAL.config.build.icons))
    .pipe(size({ gzip: true, showFiles: false, title:'icons' }));
}

function icons_fallbacks() {
  return gulp.src(GLOBAL.config.src.icons + '/*.{svg}')
    .pipe(svg2png())
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(rename({ prefix: 'sprite.svg.icon-' }))
    .pipe(gulp.dest(GLOBAL.config.build.icons));
}

gulp.task('icons', icons);
gulp.task('icons-fallbacks', icons_fallbacks);
