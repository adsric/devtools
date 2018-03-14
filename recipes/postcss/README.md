# PostCSS → npm run

A recipe to prefix and minify Stylesheet files using PostCSS.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `browser-sync` | `browser-sync start --server --files '**/*.css, **/*.js, !node_modules/**/*' --port 7777 --proxy 'localhost' --browser 'FirefoxDeveloperEdition'` | Browser sync file changes on edit to the browser |
| `clean` | `rimraf dist/{*.css,**/*.css}` | Delete compiled files |
| `hash` | `hashmark -l 12 -r 'dist/**/*.{css}' '{dir}/{name}.{hash}{ext}` | Append a md5 hash to compiled files |
| `minify:css` | `postcss -u cssnano -d dist -b .tmp .tmp/*.css .tmp/**/*.css && rimraf .tmp` | Minify CSS files |
| `prefix:css` | `postcss -u autoprefixer -d .tmp -b src/css src/css/*.css src/css/**/*.css` | Add vendor prefixes to CSS files |
| `watch:css` | `onchange \"src/css\" -- run-s build:css` | Watches for any .css file changes, then runs `build:css` |
| `watch` | `run-p browser-sync watch:*` | Runs `browser-sync` and `watch:css` |
| `build:css` | `run-s prefix:css minify:css` | Combines `prefix:css` and `minify:css` |
| `build` | `run-s build:*` | Run all `build` commands |
| `dev` | `run-s build:css watch` |  Alias to run `build:css` and `watch` |
