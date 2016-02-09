var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function watch() {
  browserSync.init({
    logLevel: 'silent',
    logPrefix: 'BS',
    server: './',
    port: 8080,
    // Prevent browser sync from display in page notifications
    notify: false,
    open: false
  });

  // Styles / CSS
  gulp.watch([GLOBAL.config.watch.styles + '/**/*'],
    ['styles'], browserSync.reload);

  // Scripts
  gulp.watch([GLOBAL.config.watch.scripts + '/**/*'],
    ['scripts'], browserSync.reload);

  // Images
  gulp.watch([GLOBAL.config.watch.images + '/**/*'],
    ['images'], browserSync.reload);
}

gulp.task('watch', watch);
