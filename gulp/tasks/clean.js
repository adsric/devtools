var gulp    = require('gulp'),
    config  = require('../config'),
    cache   = require('gulp-cache'),
    path    = require('path');

function clear(done) {
  return cache.clearAll(done);
}

function del() {
  require('del')([
      config.paths.project.dest
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

gulp.task('clear', clear);
gulp.task('clean', del);
