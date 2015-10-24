var gulp      = require('gulp'),
    config    = require('../config'),
    cache     = require('gulp-cache'),
    imagemin  = require('gulp-imagemin'),
    rename    = require('gulp-rename'),
    size      = require('gulp-size'),
    svgmin    = require('gulp-svgmin'),
    svgstore  = require('gulp-svgstore'),
    svg2png   = require('gulp-svg2png');

function icons() {
  return gulp.src(config.paths.icons.all)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest(config.paths.icons.dest))
    .pipe(size({ gzip: true, showFiles: false, title:'icons' }));
}

function icons_fallbacks() {
  return gulp.src(config.paths.icons.all)
    .pipe(svg2png())
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(rename({ prefix: 'sprite.svg.icon-' }))
    .pipe(gulp.dest(config.paths.icons.dest));
}

function icons_watcher() {
  gulp.watch(config.paths.icons.all, function() {
    icons();
    icons_fallbacks();
  });
}

gulp.task('icons', icons);
gulp.task('icons-fallbacks', icons_fallbacks);
gulp.task('icons_watcher', icons_watcher);
