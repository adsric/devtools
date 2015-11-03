var gulp      = require('gulp'),
    config    = require('../config'),
    cache     = require('gulp-cache'),
    imagemin  = require('gulp-imagemin'),
    size      = require('gulp-size');

function images() {
  return gulp.src(config.paths.img.all)
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.paths.img.dest))
    .pipe(size({ gzip: true, showFiles: false, title:'images' }));
}

gulp.task('images', images);
