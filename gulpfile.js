
GLOBAL.config = {
  src: {
    root: 'site',
    icons: 'icons',
    images: 'images',
    styles: 'css',
    scripts: 'js'
  },
  build: {
    root: 'build',
    icons: 'build/icons',
    images: 'build/images',
    styles: 'build/css',
    scripts: 'build/js'
  },
  filename: {
    styles: 'main.min.css',
    scripts: 'main.min.js'
  }
};

// Include Gulp & tools
var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

requireDir('./gulp-tasks');

var commonBuildTasks = [
  'styles',
  'scripts',
  'icons',
  'images'
];

gulp.task('build', [], function(cb) {
  runSequence(
    commonBuildTasks,
  cb);
});

gulp.task('serve', [], function(cb) {
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

