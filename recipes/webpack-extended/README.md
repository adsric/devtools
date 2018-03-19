# Webpack extended → npm run

A recipe to use webpack module bundler to bundle and optimize JavaScript files,
with this recipe there is multiple index points with multiple bundles as a result.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

Documentation on [webpack](https://webpack.js.org/concepts/) and [webpack-cli](https://webpack.js.org/api/cli/).

| cmd | recipe | description |
|:---:|:---|:---|
| `clean` | `rimraf dist/{*.js,**/*.js}` | Delete compiled files |
| `webpack:dev` | `webpack index=./src/javascript/index.js index2=./src/javascript/index2.js --devtool cheap-module-inline-source-map --mode development --module-bind js=babel-loader --output-path='./dist' --output-filename='[name].bundle.js' --watch` | Bundle JavaScript with Webpack and watch for file changes |
| `webpack:build` | `webpack index=./src/javascript/index.js index2=./src/javascript/index2.js --devtool source-map --mode production --module-bind js=babel-loader --output-path='./dist' --output-filename='[name].bundle.[hash].js'` | Bundle and Optimize JavaScript with Webpack |
| `build:js` | `run-s webpack:build` | Alias to run `webpack:build` |
| `build` | `run-s build:*` | Run all `build` commands |
| `dev` | `run-s webpack:dev` |  Alias to run `webpack:dev` |
