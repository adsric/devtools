var gulp = require('gulp');
var path = require('path');

function clean() {
  require('del')([
     GLOBAL.config.output.scripts,
     GLOBAL.config.output.styles,
     GLOBAL.config.output.icons,
     GLOBAL.config.output.images
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

gulp.task('clean', clean);
