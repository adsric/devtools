var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

function scripts() {
  return gulp.src(GLOBAL.config.src.scripts + '/**/*.js')
    .pipe(concat(GLOBAL.config.filename.scripts))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(GLOBAL.config.output.scripts))
    .pipe(size({ gzip: true, showFiles: true, title:'scripts' }));
}

gulp.task('scripts', scripts);
