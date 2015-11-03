var gulp        = require('gulp'),
    config      = require('../config'),
    browserSync = require('browser-sync').create();

function server() {
  browserSync.init({
    browser: 'google chrome canary',
    logPrefix: 'Server',
    files: config.paths.server.files,
    server: config.paths.server.files
  });
}

gulp.task('server', server);
