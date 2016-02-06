
GLOBAL.config = {
  filename: {
    scripts: 'main.js',
    styles: 'main.css'
  },
  src: {
    icons: 'icons',
    images: 'images',
    scripts: 'js',
    styles: 'index.css',
  },
  output: {
    icons: 'build/icons',
    images: 'build/images',
    scripts: 'build/js',
    styles: 'build/css'
  },
  watch: {
    icons: 'icons,'
    images: 'images',
    scripts: 'js',
    styles: 'css'
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

gulp.task('watch', [], function(cb) {
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

