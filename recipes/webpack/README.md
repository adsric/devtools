# Webpack → npm runner

A recipe to use webpack module bundler to bundle and minify JavaScript files.

The following `run-s` will run commands in series, while `run-p` runs them in parallel.

| cmd | recipe | description |
|:---:|:---|:---|
| `clean` | `rimraf dist/{*.js,**/*.js}` | Delete compiled files |
| `webpack:dev` | `webpack --env development --mode development --watch` | Bundle JavaScript with Webpack and watch for file changes |
| `webpack:build` | `webpack --env production --mode production` | Bundle and Uglify JavaScript with Webpack |
| `build:js` | `run-s webpack:build` | Alias to run  `webpack:build` |
| `build` | `run-s build:*` | Run all `build` commands |
| `dev` | `run-s webpack:dev` |  Alias to run `webpack:dev` |
