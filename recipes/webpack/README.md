# Webpack → npm run

A recipe to use webpack module bundler to bundle and optimize JavaScript files.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

Documentation on [webpack](https://webpack.js.org/concepts/) and [webpack-cli](https://webpack.js.org/api/cli/).

| cmd | recipe | description |
|:---:|:---|:---|
| `clean` | `rimraf ./dist/*` | Delete compiled assets in dir |
| `build:js` | `webpack src/javascript/index.js --devtool source-map --mode production --module-bind js=babel-loader --output-path='./dist' --output-filename='bundle.[hash].js'` | Bundle and Optimize JavaScript with Webpack |
| `build` | `run-s clean build:*` | Alias to run `clean` and all `build` commands |
| `watch:js` | `webpack src/javascript/index.js --devtool cheap-module-inline-source-map --mode development --module-bind js=babel-loader --output-path='./dist' --output-filename='bundle.js' --watch` | Bundle JavaScript with Webpack and watch for file changes |
| `watch` | `run-p watch:*` | Run all `watch` commands |
| `dev` | `run-s clean watch` |  Alias to run `clean` and `watch` |
