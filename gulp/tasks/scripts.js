var gulp    = require('gulp'),
    config  = require('../config'),
    concat  = require('gulp-concat'),
    size    = require('gulp-size'),
    uglify  = require('gulp-uglify');

function scripts() {
  return gulp.src([
    config.paths.js.all,
    config.paths.js.src
  ]).pipe(concat(config.names.js))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.js.dest))
    .pipe(size({ gzip: true, showFiles: true, title:'scripts' }));
}

function scripts_watcher() {
  gulp.watch(config.paths.js.all, function() {
    scripts();
  });
}

gulp.task('scripts', scripts);
gulp.task('scripts_watcher', scripts_watcher);
