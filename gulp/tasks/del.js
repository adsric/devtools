var gulp    = require('gulp'),
    config  = require('../config'),
    path    = require('path');

function del() {
  require('del')([
      config.paths.project.dest
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

gulp.task('clean', del);
