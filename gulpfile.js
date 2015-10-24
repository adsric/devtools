var gulp          = require('gulp'),
    requireDir    = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

// -----------------------------------------------------------------------------
// | Commands                                                                  |
// -----------------------------------------------------------------------------

gulp.task('build', [
  'styles',
  'scripts',
  'images',
  'icons',
  'icons-fallbacks'
]);

gulp.task('watch', [
  'styles_watcher',
  'scripts_watcher',
  'icons_watcher'
]);

gulp.task('serve', [
  'build',
  'watch',
  'server'
]);

