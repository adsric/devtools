# npm tasks ✔️

> npm cli scripts as a task runner

Use cli packages directly without unnecessary abstractions like Gulp and Grunt.

* A task runner using npm scripts
* Provides common recipes for automation
* Runs commands locally

## Documentation

* [How to setup](#setup)
* [Packages](#packages)
* [Tasks](#tasks)

## Setup

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project (without a `package.json` file), start by running `npm init`. This will ask a few questions and use your responses to build a basic `package.json` file. Next, copy what you need of the `"devDependencies"` object into your `package.json`.
  * If this is an existing project, copy what you need of the` "devDependencies"` into your `package.json`.
* Now, copy any tasks you want from the `"scripts"` object into your `package.json` `"scripts"` object.
* Finally, use `npm run setup` to install all of the dependencies and folder structure into your project.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `dev`. It will start a new server, open up a browser and watch for any CSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!

## Packages

The list of the packages used for the tasks available.

* [autoprefixer](https://github.com/postcss/autoprefixer)
* [babel](https://github.com/babel/babel)
* [babel-cli](https://github.com/babel/babel/tree/master/packages/babel-cli)
* [babel-loader](https://github.com/babel/babel-loader)
* [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
* [browser-sync](https://github.com/Browsersync/browser-sync)
* [cssnano](https://github.com/ben-eb/cssnano)
* [hashmark](https://github.com/keithamus/hashmark)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)
* [onchange](https://github.com/Qard/onchange)
* [postcss-cli](https://github.com/code42day/postcss-cli)
* [rimraf](https://github.com/isaacs/rimraf)
* [svg-sprite](https://github.com/jkphl/svg-sprite)
* [uglify-js](https://github.com/mishoo/UglifyJS2)
* [webpack](https://github.com/webpack/webpack)

## Tasks

(Note: `run-s` will run tasks in series, while `run-p` runs them in parallel)

The list of tasks available.

### Task - `autoprefixer`
  `postcss -u autoprefixer -d dist src/css/*.css`

  Add vendor prefixes to your CSS automatically. (see Browserlist in package.json for browser support)

### Task - `babel-js`
  `babel src/js --out-dir .tmp`

  Use next generation JavaScript, today. Allowing you to use new syntax, right now without waiting for browser support. (note Compiles down to supported version).

### Task - `clean`
  `rimraf dist/{*.css,*.js,*.map}`

  Delete existing dist files.

### Task - `cssnano`
  `postcss -u cssnano -d dist dist/*.css`

  Minify production ready CSS.

### Task - `hash`
  `hashmark -l 12 -r 'dist/*.{js,css}' 'dist/{name}.{hash}{ext}' --silent`

  Add a md5 hash to the production ready files. (note Remove js extension if using webpack)

### Task - `icons`
  `svg-sprite --symbol --symbol-dest=dist --symbol-sprite=sprite.svg --symbol-inline src/icons/*.svg`

### Task - `uglify-js`
  `uglifyjs .tmp/file1.js .tmp/file2.js -c -m -o dist/bundle.js && rimraf .tmp/*.js`

  UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit. Takes a bunch of JavaScript files, parse input files in sequence and apply any compression options into a single bundle file.

### Task - `webpack:dev`

  A production ready bundle of JavaScript.

### Task - `webpack:build`

  Uglify (minify) a production ready bundle of JavaScript with sourcemaps.

### Task - `serve`
  `browser-sync start --server --files 'dist/css/*.css, dist/js/*.js, **/*.html, !node_modules/**/*.html'`

  Start a new server and watch for CSS & JS file changes in the `dist` folder.

### Task - `build:css`
  `run-s autoprefixer cssnano hash:css`

  Alias to run the `autoprefixer`, `cssnano` and `hash` tasks.

### Task - `build:js`
  `run-s webpack:build`

  Alias to run the `webpack:build` tasks. Bundles `src/js/main.js` & minify the output. (note Not using webpack then add babel-js uglify-js to this command instead)

### Task - `build`
  `run-s build:*`

  Alias to run all of the `build` commands.

### Task - `dev`
  `run-s autoprefixer webpack:dev watch`

  Alias to run `autoprefixer`, `webpack:dev` and `watch` tasks.

### Task - `watch:css`
  `onchange \"src/css\" -- run-s build:css`

  Watches for any .css file in `src` to change, then runs the `dev:css` task.

### Task - `watch:js`
  `onchange \"src/js\" -- run-s webpack:dev`

  Watches for any .js file in `src` to change, then runs the `dev:js` task. (note Not using webpack then add build:js to this command instead)

### Task - `watch:images`
  `onchange 'src/images/**/*' -- run-s build:images`

  Watches for any images in `src` to change, then runs the `build:images` task.

### Task - `watch`
  `run-p serve watch:*`

  Run the following tasks simultaneously: `serve`, `watch:css` & `watch:js`. When a .css or .js file changes in `src`, the task will compile the changes to `dist`, and the server will be notified of the change. Any browser connected to the server will then inject the new file from `dist`

### Task - `setup`
  `npm install && mkdir -p src/css && mkdir -p src/js`

  Install all dependences and creates the `src` directory structure.
