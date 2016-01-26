var gulp = require('gulp');
var concat = require('gulp-concat');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

function scripts() {
  return gulp.src(GLOBAL.config.src.scripts + '/**/*.js')
    .pipe(concat(GLOBAL.config.filename.scripts))
    .pipe(uglify())
    .pipe(gulp.dest(GLOBAL.config.build.scripts))
    .pipe(size({ gzip: true, showFiles: true, title:'scripts' }));
}

gulp.task('scripts', scripts);
