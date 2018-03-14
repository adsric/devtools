# Uglify J️S → npm run

A recipe to combine listed JavaScript files into one JavaScript bundle and
then minify the concatenated JavaScript bundle.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `babeljs` | `babel src/js --out-dir .tmp` | Compile browser-compatible JavaScript from next generation syntax |
| `browser-sync` |  `browser-sync start --server --files '**/*.js, !node_modules/**/*' --port 7777 --proxy 'localhost' --browser 'FirefoxDeveloperEdition'` | Browser sync file changes on edit to the browser |
| `clean` | `rimraf dist/{*.js,**/*.js}` | Delete compiled files |
| `hash` | `hashmark -l 12 -r 'dist/**/*.{js}' '{dir}/{name}.{hash}{ext}` | Append a md5 hash to compiled files |
| `uglifyjs` | `uglifyjs .tmp/file1.js .tmp/file2.js --source-map bundle.js.map --compress --mangle --output dist/bundle.js && rimraf .tmp` | Takes a bunch of JavaScript files, parse the files in sequence and apply any compression options into a bundle file |
| `watch:js` | `onchange \"src/javascript\" -- run-s build:js` | Watches for any .js file changes, then runs `build:js` |
| `watch` | `run-p browser-sync watch:*` | Runs `browser-sync`, `watch:js` |
| `build:js` | `run-s babeljs uglifyjs` | Runs `babeljs` and `uglifyjs` |
| `build` | `run-s build:*` | Run all `build` commands |
| `dev` | `run-s build:js watch` |  Alias to run `build:js` and `watch` |
