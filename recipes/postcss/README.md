# PostCSS → npm run

A recipe to compile, prefix and minify Stylesheets using PostCSS.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `clean` | `rimraf ./dist` | Delete compiled dir |
| `hash` | `hashmark -l 20 -r 'dist/*.css' '{dir}/{name}.{hash}{ext}` | Append a md5 hash to compiled Stylesheet files |
| `compile-css` | `postcss src/css/*.css --use postcss-import --use autoprefixer --dir dist` | Concat and add vendor prefixes to CSS files |
| `minify-css` | `postcss dist/*.css --use cssnano --replace` | Minify CSS files |
| `build:css` | `run-s compile-css minify-css hash` | Combines `compile-css`, `minify-css` and `hash` |
| `build` | `run-s clean build:*` | Alias to run `clean` and all `build` commands |
| `watch:css` | `postcss src/css/*.css --use postcss-import --use autoprefixer --dir dist --watch` | Concat, add vendor prefixes to CSS files and watches for any .css file changes. |
| `watch` | `run-p watch:*` | Runs all `watch` commands |
| `dev` | `run-s clean watch` |  Alias to run `clean` and `watch` |
