# Webpack → npm runner

A recipe to use webpack module bundler to bundle and minify JavaScript files.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `browser-sync` |  `browser-sync start --server --files '**/*.js, !node_modules/**/*' --port 7777 --proxy 'localhost' --browser 'FirefoxDeveloperEdition'` | Browser sync file changes on edit to the browser |
| `clean` | `rimraf dist/{*.js,**/*.js}` | Delete compiled files |
| `watch:js` | `onchange \"src/js\" -- run-s webpack:dev` | Watches for any .js file changes, then runs `webpack:dev` |
| `watch` | `run-p browser-sync watch:*` | Runs `browser-sync` and `watch:js` |
| `webpack:dev` | `NODE_ENV=development webpack` | Bundle JavaScript with Webpack |
| `webpack:build` | `NODE_ENV=production webpack` | Bundle and Uglify JavaScript with Webpack |
| `build:js` | `run-s webpack:build` | Alias to run  `webpack:build` |
| `build` | `run-s build:*` | Run all `build` commands |
| `dev` | `run-s webpack:dev watch` |  Alias to run `webpack:dev` and `watch` |
