# npm it!

> Task runner recipes with npm

Interact with your cli and tools directly without unnecessary abstractions like Gulp and Grunt. Automate and enhance your work-flow with a collection of packages that automate asset building using `npm scripts`.

* [List of packages used](#list-of-packages-used)
* [Using in your project](#using-in-your-project)
* [List of available tasks](#list-of-available-tasks)

## List of packages used
[autoprefixer](https://github.com/postcss/autoprefixer), [babel](https://github.com/babel/babel), [babel-loader](https://github.com/babel/babel-loader), [browser-sync](https://github.com/Browsersync/browser-sync), [cssnano](https://github.com/ben-eb/cssnano), [hashmark](https://github.com/keithamus/hashmark), [npm-run-all](https://github.com/mysticatea/npm-run-all), [onchange](https://github.com/Qard/onchange), [postcss-cli](https://github.com/code42day/postcss-cli) [rimraf](https://github.com/isaacs/rimraf), [svg-sprite](https://github.com/jkphl/svg-sprite), [webpack](https://github.com/webpack/webpack).

## Using in your project
* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project (without a `package.json` file), start by running `npm init`. This will ask a few questions and use your responses to build a basic `package.json` file. Next, copy what you need of the `"devDependencies"` object into your `package.json`.
  * If this is an existing project, copy what you need of the` "devDependencies"` into your `package.json`.
* Now, copy any tasks you want from the `"scripts"` object into your `package.json` `"scripts"` object.
* Finally, use `npm run setup` to install all of the dependencies and folder structure into your project.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `dev`. It will start a new server, open up a browser and watch for any CSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!

## List of available tasks

Please note the following:

`run-s` (Run tasks in series)
`run-p` (Run tasks in parallel)

### `autoprefixer`
  `postcss -u autoprefixer -d dist src/css/*.css`

  Add vendor prefixes to your CSS automatically. (see Browserlist in package.json for browser support)

### `clean`
  `rimraf dist/{*.css,*.js,*.map}`

  Delete existing dist files.

### `cssnano`
  `postcss -u cssnano -d dist dist/*.css`

  Minify production ready CSS.

### `hash:css`
  `hashmark -l 12 'dist/*.css' 'dist/{name}.{hash}.css' --silent`

  Add a md5 hash to the production ready CSS file.

### `icons`
  `svg-sprite --symbol --symbol-dest=dist --symbol-sprite=sprite.svg --symbol-inline src/icons/*.svg`

  Takes a bunch of SVG files, optimizes them and bakes them into SVG sprites using the <symbol> element. Command line help can be changed at [docs](https://github.com/jkphl/svg-sprite/blob/master/docs/command-line.md).

### `webpack:dev`

  A production ready bundle of JavaScript.

### `webpack:build`

  Uglify (minify) a production ready bundle of JavaScript with sourcemaps.

### `serve`
  `browser-sync start --server --files 'dist/css/*.css, dist/js/*.js, **/*.html, !node_modules/**/*.html'`

  Start a new server and watch for CSS & JS file changes in the `dist` folder.

### `build:css`
  `run-s autoprefixer cssnano hash:css`

  Alias to run the `autoprefixer`, `cssnano` and `hash:css` tasks.

### `build:js`
  `run-s webpack:build`

  Alias to run the `webpack:build` tasks. Bundles `src/js/main.js` & minify the output.

### `build`
  `run-s build:*`

  Alias to run all of the `build` commands.

### `dev`
  `run-s autoprefixer webpack:dev watch`

  Alias to run `autoprefixer`, `webpack:dev` and `watch` tasks.

### `watch:css`
  `onchange \"src/css\" -- run-s build:css`

  Watches for any .css file in `src` to change, then runs the `dev:css` task.

### `watch:js`
  `onchange \"src/js\" -- run-s webpack:dev`

  Watches for any .js file in `src` to change, then runs the `dev:js` task.

### `watch:images`
  `onchange 'src/images/**/*' -- run-s build:images`

  Watches for any images in `src` to change, then runs the `build:images` task.

### `watch`
  `run-p serve watch:*`

  Run the following tasks simultaneously: `serve`, `watch:css` & `watch:js`. When a .css or .js file changes in `src`, the task will compile the changes to `dist`, and the server will be notified of the change. Any browser connected to the server will then inject the new file from `dist`

### `setup`
  `npm install && mkdir -p src/css && mkdir -p src/js && mkdir -p src/icons`

  Install all dependences and creates the `src` directory structure.
