var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var size = require('gulp-size');

// SVG Config
var config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: '', // destination folder
      sprite: 'icons.svg', //sprite name
      example: true // Build sample page
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};

function icons() {
  return gulp.src(GLOBAL.config.src.icons + '/*.{svg}')
    .pipe(svgSprite(config))
    .pipe(gulp.dest(GLOBAL.config.build.icons))
    .pipe(size({ gzip: true, showFiles: false, title:'icons' }));
}

gulp.task('icons', icons);
