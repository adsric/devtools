module.exports = {
  paths: {
    project: {
      src: './src',
      dest: './dist'
    },
    css: {
      all: './css/**/*.css',
      src: './css/main.css',
      dest: './dist/css'
    },
    js: {
      all: './js/**/*.js',
      src: './js/main.js',
      dest: './dist/js'
    },
    img: {
      all: './img/**/*',
      dest: './dist/img'
    },
    icons: {
      all: './icons/*.svg',
      dest: './dist/icons'
    },
    server: {
      files: './dist'
    }
  },
  names: {
    css: 'main.min.css',
    js: 'main.min.js'
  }
};
