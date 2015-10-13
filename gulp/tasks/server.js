var gulp        = require('gulp'),
    config      = require('../config'),
    browserSync = require('browser-sync').create();

function server() {
  browserSync.init({
    browser: 'google chrome canary',
    logPrefix: 'Server',
    files: config.paths.project.dest,
    server: config.paths.project.dest
  });
}

gulp.task('server', server);
