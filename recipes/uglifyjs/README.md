# Uglify J️S → npm run

A recipe to combine listed JavaScript files into one JavaScript bundle and
then minify the concatenated JavaScript bundle.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `babel-js` | `babel src/javascript --out-dir src/javascript-es5` | Compile browser-compatible JavaScript from next generation syntax |
| `clean` | `rimraf ./dist` | Delete compiled dir |
| `hash` | `hashmark -l 20 -r 'dist/*.js' '{dir}/{name}.{hash}{ext}` | Append a md5 hash to compiled JavaScript files |
| `uglify-js` | `uglifyjs src/javascript-es5/input1.js src/javascript-es5/input2.js --source-map 'filename=bundle-es5.js.map' --compress --mangle --output dist/bundle-es5.js` | Takes a bunch of JavaScript files, parse the files in sequence and apply any compression options into a bundle file |
| `build:js` | `run-s babel-js uglify-js hash` | Alias to run `babel-js`, `uglify-js` and `hash` commands |
| `build` | `run-s clean build:*` | Alias to run `clean` and all `build` commands |
