
GLOBAL.config = {
  src: {
    icons: 'src/icons',
    images: 'src/images',
    styles: 'src/stylesheets',
    scripts: 'src/javascripts',
  },
  build: {
    root: '_build',
    icons: '_build/icons',
    images: '_build/images',
    styles: '_build/styles',
    scripts: '_build/scripts',
  }
};

// Include Gulp & tools
var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

requireDir('./gulp-tasks');

var commonBuildTasks = [
  'scripts',
  'styles',
  'icons',
  'images'
];

gulp.task('build', [], function(cb) {
  runSequence(
    commonBuildTasks,
  cb);
});

gulp.task('build:watch', [], function(cb) {
  runSequence(
    commonBuildTasks,
    'watch',
  cb);
});

gulp.task('default', [], function(cb) {
  runSequence(
    ['build'],
  cb);
});

