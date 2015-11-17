var gulp = require('gulp');
var path = require('path');

function clean() {
  require('del')([
     GLOBAL.config.build.root,
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

gulp.task('clean', clean);
