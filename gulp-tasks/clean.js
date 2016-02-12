var gulp = require('gulp');
var path = require('path');

function clean() {
  require('del')([
     GLOBAL.config.build.scripts,
     GLOBAL.config.build.styles,
     GLOBAL.config.build.icons,
     GLOBAL.config.build.images
  ]).then(function(paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

gulp.task('clean', clean);
