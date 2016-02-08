
GLOBAL.config = {
  filename: {
    scripts: 'bundle.js',
    styles: 'styles.css'
  },
  src: {
    icons: 'src/icons',
    images: 'src/images',
    scripts: 'src/js',
    styles: 'index.css',
  },
  output: {
    icons: '_build/icons',
    images: '_build/images',
    scripts: '_build/js',
    styles: '_build/css'
  },
  watch: {
    icons: 'src/icons,'
    images: 'src/images',
    scripts: 'src/js',
    styles: 'src/css'
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

