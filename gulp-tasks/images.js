var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');

function images() {
  return gulp.src(GLOBAL.config.src.images + '/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(GLOBAL.config.build.images))
    .pipe(size({ gzip: true, showFiles: false, title:'images' }));
}

gulp.task('images', images);
