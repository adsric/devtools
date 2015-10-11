var gulp        = require('gulp'),
    config      = require('../config'),
    browserSync = require('browser-sync').create();

function server() {
  browserSync.init({
    server: config.paths.project.dest,
    files: config.paths.project.dest
  });
}

gulp.task('server', server);
